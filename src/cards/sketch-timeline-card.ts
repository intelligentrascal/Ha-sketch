import { html, css, nothing, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { sharedStyles } from '../shared/styles';
import { renderSketchOverlay } from '../shared/sketch-svg';
import { applyAppearance, stateIcon } from '../shared/utils';
import type { HomeAssistant, TimelineCardConfig } from '../shared/types';
import '../editors/sketch-timeline-card-editor';

interface TimelineEvent {
  time: Date;
  entity_id: string;
  state: string;
  name: string;
  icon: string;
}

@customElement('sketch-timeline-card')
export class SketchTimelineCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: TimelineCardConfig;
  @state() private _events: TimelineEvent[] = [];
  private _fetchTimer?: ReturnType<typeof setInterval>;

  static styles = [
    sharedStyles,
    css`
      ha-card {
        overflow: hidden;
      }
      .timeline-content {
        position: relative;
        z-index: 1;
        padding: clamp(12px, 3vw, 20px);
      }
      .timeline-title {
        font-family: var(--sketch-font);
        font-size: 1.1em;
        font-weight: 600;
        color: var(--sketch-ink);
        margin-bottom: 12px;
      }
      .timeline-list {
        position: relative;
        padding-left: 24px;
      }
      .timeline-line {
        position: absolute;
        left: 7px;
        top: 4px;
        bottom: 4px;
        width: 2px;
        background: var(--sketch-ink-light);
        border-radius: 1px;
      }
      .timeline-entry {
        position: relative;
        padding: 4px 0 12px 0;
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }
      .timeline-dot {
        position: absolute;
        left: -21px;
        top: 6px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--sketch-primary);
        border: 2px solid var(--sketch-card-bg, var(--ha-card-background, #faf7f0));
        flex-shrink: 0;
        z-index: 1;
      }
      .timeline-icon {
        --mdc-icon-size: 16px;
        color: var(--sketch-ink-muted);
        flex-shrink: 0;
        margin-top: 1px;
      }
      .timeline-text {
        flex: 1;
        min-width: 0;
      }
      .timeline-desc {
        font-family: var(--sketch-font);
        font-size: 0.95em;
        color: var(--sketch-ink);
        line-height: 1.3;
      }
      .timeline-time {
        font-family: var(--sketch-font);
        font-size: 0.75em;
        color: var(--sketch-ink-muted);
        font-style: italic;
        margin-top: 2px;
      }
      .timeline-empty {
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
        font-style: italic;
        text-align: center;
        padding: 16px;
      }
    `,
  ];

  setConfig(config: TimelineCardConfig): void {
    this._config = { ...config };
  }

  static getConfigElement() {
    return document.createElement('sketch-timeline-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const entities = Object.keys(hass.states)
      .filter((e) => e.startsWith('binary_sensor.') || e.startsWith('light.') || e.startsWith('switch.'))
      .slice(0, 3);
    return { entities, hours_to_show: 4, max_entries: 10, name: 'Activity' };
  }

  getCardSize() {
    return 4;
  }

  getLayoutOptions() {
    return { grid_columns: 4, grid_rows: 4 };
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchEvents();
    this._fetchTimer = setInterval(() => this._fetchEvents(), 60000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._fetchTimer) clearInterval(this._fetchTimer);
  }

  updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    if (changedProps.has('_config')) {
      applyAppearance(this, this._config);
      this._fetchEvents();
    }
    if (changedProps.has('hass') && this.hass) {
      this.classList.toggle('dark-mode', this.hass.themes?.darkMode ?? false);
    }
  }

  private async _fetchEvents() {
    if (!this.hass) return;
    const hours = this._config.hours_to_show || 4;
    const maxEntries = this._config.max_entries || 10;
    const end = new Date();
    const start = new Date(end.getTime() - hours * 3600000);
    const entities = this._config.entities || [];

    try {
      const wsMsg: any = {
        type: 'logbook/get_events',
        start_time: start.toISOString(),
        end_time: end.toISOString(),
      };
      // Only filter by entity_ids if entities are specified
      if (entities.length) {
        wsMsg.entity_ids = entities;
      }

      const result = await this.hass.callWS(wsMsg);

      if (Array.isArray(result)) {
        this._events = result
          .filter((e: any) => e.entity_id && (entities.length === 0 || entities.includes(e.entity_id)))
          .map((e: any) => ({
            time: new Date(e.when),
            entity_id: e.entity_id,
            state: e.state || '',
            name: e.name || e.entity_id,
            icon: this._getIconForEntity(e.entity_id),
          }))
          .sort((a, b) => b.time.getTime() - a.time.getTime())
          .slice(0, maxEntries);
      }
    } catch (_e) {
      // Logbook API might not be available
      this._events = [];
    }
    this.requestUpdate();
  }

  private _getIconForEntity(entityId: string): string {
    const entity = this.hass?.states[entityId];
    if (entity?.attributes?.icon) return entity.attributes.icon;
    if (entity) return stateIcon(entity);
    const domain = entityId.split('.')[0];
    const domainIcons: Record<string, string> = {
      binary_sensor: 'mdi:checkbox-blank-circle-outline',
      light: 'mdi:lightbulb',
      switch: 'mdi:toggle-switch',
      lock: 'mdi:lock',
      cover: 'mdi:window-closed',
      sensor: 'mdi:eye',
    };
    return domainIcons[domain] || 'mdi:circle-small';
  }

  private _formatTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    return `${diffHr}h ${diffMin % 60}m ago`;
  }

  private _renderSketchBg() {
    let seed = 0;
    const id = this._config?.entities?.[0] || 'timeline';
    for (let i = 0; i < id.length; i++) {
      seed = ((seed << 5) - seed + id.charCodeAt(i)) | 0;
    }
    seed = Math.abs(seed);
    return html`${unsafeHTML(renderSketchOverlay(400, 300, {
      showBorder: this._config?.show_border !== false,
      showTexture: this._config?.show_texture !== false,
      variant: (this._config as any)?.variant || 'notebook',
      cornerRadius: (this._config as any)?.corner_radius ?? 14,
      seed,
    }))}`;
  }

  render() {
    const name = this._config?.name || 'Activity';

    return html`
      <ha-card>
        ${this._renderSketchBg()}
        <div class="timeline-content">
          <div class="timeline-title">${name}</div>
          ${this._events.length
            ? html`
                <div class="timeline-list">
                  <div class="timeline-line"></div>
                  ${this._events.map(
                    (event, idx) => {
                      const opacity = Math.max(0.35, 1 - idx * 0.08);
                      return html`
                        <div class="timeline-entry" style="opacity: ${opacity}">
                          <div class="timeline-dot"></div>
                          <ha-icon class="timeline-icon" .icon=${event.icon}></ha-icon>
                          <div class="timeline-text">
                            <div class="timeline-desc">${event.name}: ${event.state}</div>
                            <div class="timeline-time">${this._formatTime(event.time)}</div>
                          </div>
                        </div>
                      `;
                    }
                  )}
                </div>
              `
            : html`<div class="timeline-empty">No recent activity</div>`}
        </div>
      </ha-card>
    `;
  }
}

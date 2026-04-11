import { html, css, svg, nothing, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../shared/styles';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderSketchOverlay } from '../shared/sketch-svg';
import { applyAppearance } from '../shared/utils';
import type { HomeAssistant, HistoryGraphCardConfig } from '../shared/types';
import '../editors/sketch-history-graph-card-editor';

@customElement('sketch-history-graph-card')
export class SketchHistoryGraphCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: HistoryGraphCardConfig;
  @state() private _histories: Map<string, number[]> = new Map();
  private _fetchTimer?: ReturnType<typeof setInterval>;

  static styles = [
    sharedStyles,
    css`
      .graph-content {
        position: relative;
        z-index: 1;
        padding: clamp(12px, 3vw, 20px);
      }
      .graph-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      .graph-name {
        font-family: var(--sketch-font);
        font-size: 1.1em;
        font-weight: 600;
        color: var(--sketch-ink);
      }
      .graph-value {
        font-family: var(--sketch-font);
        font-size: 1.4em;
        font-weight: 700;
        color: var(--sketch-ink);
      }
      .graph-unit {
        font-size: 0.6em;
        font-weight: 400;
        color: var(--sketch-ink-muted);
      }
      .graph-svg {
        width: 100%;
        height: 60px;
        overflow: hidden;
      }
      .graph-line {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .graph-fill {
        opacity: 0.15;
      }
      .graph-labels {
        display: flex;
        justify-content: space-between;
        font-family: var(--sketch-font);
        font-size: 0.7em;
        color: var(--sketch-ink-muted);
        margin-top: 4px;
      }
      .graph-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
        font-style: italic;
      }
    `,
  ];

  setConfig(config: HistoryGraphCardConfig): void {
    if (!config.entities || !config.entities.length) {
      throw new Error('Please define at least one entity');
    }
    this._config = { ...config };
  }

  static getConfigElement() {
    return document.createElement('sketch-history-graph-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const sensors = Object.keys(hass.states).filter((e) => e.startsWith('sensor.'));
    return { entities: [sensors[0] || 'sensor.temperature'], hours_to_show: 24 };
  }

  getCardSize() {
    return 3;
  }

  getLayoutOptions() {
    return { grid_columns: 4, grid_rows: 3 };
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchHistory();
    this._fetchTimer = setInterval(() => this._fetchHistory(), 300000); // 5min
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._fetchTimer) clearInterval(this._fetchTimer);
  }

  updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    if (changedProps.has('_config')) {
      applyAppearance(this, this._config);
      this._fetchHistory();
    }
    if (changedProps.has('hass') && this.hass) {
      this.classList.toggle('dark-mode', this.hass.themes?.darkMode ?? false);
    }
  }

  private async _fetchHistory() {
    if (!this.hass || !this._config?.entities) return;
    const hours = this._config.hours_to_show || 24;
    const end = new Date();
    const start = new Date(end.getTime() - hours * 3600000);

    for (const entityId of this._config.entities) {
      try {
        const result = await this.hass.callWS({
          type: 'recorder/statistics_during_period',
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          statistic_ids: [entityId],
          period: hours <= 6 ? '5minute' : hours <= 48 ? 'hour' : 'day',
          types: ['mean'],
        });
        const stats = result[entityId];
        if (stats?.length) {
          this._histories = new Map(this._histories);
          this._histories.set(entityId, stats.map((s: any) => s.mean ?? 0));
        }
      } catch (_e) {
        // Fallback: try history/period API
        try {
          const resp = await (this.hass as any).callApi?.('GET',
            `history/period/${start.toISOString()}?filter_entity_id=${entityId}&end_time=${end.toISOString()}&minimal_response&no_attributes`
          );
          if (resp?.[0]?.length) {
            this._histories = new Map(this._histories);
            this._histories.set(entityId, resp[0].map((s: any) => parseFloat(s.s) || 0));
          }
        } catch (_e2) { /* no history available */ }
      }
    }
    this.requestUpdate();
  }

  private _getColorForValue(value: number): string {
    const thresholds = this._config.color_thresholds;
    if (!thresholds?.length) return 'var(--sketch-primary)';
    let color = thresholds[0].color;
    for (const t of thresholds) {
      if (value >= t.value) color = t.color;
    }
    return color;
  }

  private _renderGraph(entityId: string, data: number[], idx: number) {
    if (!data.length) return nothing;
    const w = 300;
    const h = 50;
    const pad = 2;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((v, i) => ({
      x: pad + (i / (data.length - 1)) * (w - pad * 2),
      y: pad + (1 - (v - min) / range) * (h - pad * 2),
    }));

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }

    const currentValue = data[data.length - 1];
    const color = this._getColorForValue(currentValue);
    const fill = this._config.fill !== 'none';
    const fillD = fill ? `${d} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z` : '';

    return svg`
      ${fill ? svg`<path d="${fillD}" class="graph-fill" fill="${color}" />` : nothing}
      <path d="${d}" class="graph-line" stroke="${color}" stroke-width="${this._config.line_width || 2}" />
    `;
  }

  private _renderSketchBg() {
    let seed = 0;
    const id = this._config?.entities?.[0] || '';
    for (let i = 0; i < id.length; i++) {
      seed = ((seed << 5) - seed + id.charCodeAt(i)) | 0;
    }
    seed = Math.abs(seed);
    return html`${unsafeHTML(renderSketchOverlay(400, 200, {
      showBorder: this._config?.show_border !== false,
      showTexture: this._config?.show_texture !== false,
      variant: (this._config as any)?.variant || 'paper',
      cornerRadius: (this._config as any)?.corner_radius ?? 14,
      seed,
    }))}`;
  }

  render() {
    if (!this._config?.entities?.length) {
      return html`<ha-card><div class="graph-content"><p class="sketch-name">No entities</p></div></ha-card>`;
    }

    const firstEntity = this.hass?.states[this._config.entities[0]];
    const name = this._config.name || firstEntity?.attributes?.friendly_name || this._config.entities[0];
    const currentVal = firstEntity ? parseFloat(firstEntity.state) : NaN;
    const unit = firstEntity?.attributes?.unit_of_measurement || '';
    const hours = this._config.hours_to_show || 24;
    const showLabels = this._config.show_labels !== false;

    return html`
      <ha-card>
        ${this._renderSketchBg()}
        <div class="graph-content">
          <div class="graph-header">
            <span class="graph-name">${name}</span>
            ${!isNaN(currentVal)
              ? html`<span class="graph-value">${currentVal.toFixed(1)}<span class="graph-unit">${unit}</span></span>`
              : nothing}
          </div>
          ${this._config.entities.map((entityId, idx) => {
            const data = this._histories.get(entityId);
            if (!data?.length) {
              return html`<div class="graph-empty">No history data</div>`;
            }
            return html`
              <svg class="graph-svg" viewBox="0 0 300 50" preserveAspectRatio="none">
                ${this._renderGraph(entityId, data, idx)}
              </svg>
            `;
          })}
          ${showLabels
            ? html`
                <div class="graph-labels">
                  <span>${hours}h ago</span>
                  <span>now</span>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

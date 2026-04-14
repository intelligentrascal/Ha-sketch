import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import type { HomeAssistant, CoverCardConfig } from '../shared/types';
import '../editors/sketch-cover-card-editor';

@customElement('sketch-cover-card')
export class SketchCoverCard extends BaseSketchCard {
  static styles = [
    ...super.styles,
    css`
      .cover-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .cover-icon-wrap {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
      }
      .cover-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .cover-icon-wrap.open ha-icon {
        color: var(--sketch-active, var(--sketch-success));
      }
      .cover-fill {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--sketch-primary);
        opacity: 0.15;
        transition: height 0.3s ease;
      }
      .cover-controls {
        display: flex;
        gap: 8px;
        margin-top: 12px;
        justify-content: center;
      }
      .cover-ctrl-btn {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 2px solid var(--sketch-border);
        border-radius: 2px;
        cursor: pointer;
        color: var(--sketch-ink);
        transition: background 0.2s;
        padding: 0;
      }
      .cover-ctrl-btn:hover { background: var(--sketch-hover-bg); }
      .cover-ctrl-btn ha-icon { --mdc-icon-size: 22px; }
      .position-row {
        margin-top: 12px;
      }
      .position-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .tilt-row {
        margin-top: 8px;
      }
    `,
  ];

  setConfig(config: CoverCardConfig): void {
    if (!config.entity) throw new Error('Please define a cover entity');
    super.setConfig(config);
  }

  static getConfigElement() {
    return document.createElement('sketch-cover-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const covers = Object.keys(hass.states).filter((e) => e.startsWith('cover.'));
    return { entity: covers[0] || 'cover.example' };
  }

  getCardSize() {
    return 3;
  }

  private get _coverConfig(): CoverCardConfig {
    return this._config as CoverCardConfig;
  }

  private _callCoverService(service: string) {
    this.callService('cover', service, { entity_id: this._config.entity });
  }

  private _setPosition(e: Event) {
    const value = Math.max(0, Math.min(parseInt((e.target as HTMLInputElement).value), 100));
    this.callService('cover', 'set_cover_position', {
      entity_id: this._config.entity,
      position: value,
    });
  }

  private _setTilt(e: Event) {
    const value = Math.max(0, Math.min(parseInt((e.target as HTMLInputElement).value), 100));
    this.callService('cover', 'set_cover_tilt_position', {
      entity_id: this._config.entity,
      tilt_position: value,
    });
  }

  render() {
    const entity = this.getEntity();
    if (!entity) {
      return html`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Cover not found</p></div></ha-card>`;
    }

    const isOpen = entity.state === 'open';
    const position = entity.attributes.current_position ?? (isOpen ? 100 : 0);
    const tilt = entity.attributes.current_tilt_position;
    const showPosition = this._coverConfig.show_position !== false && entity.attributes.current_position !== undefined;
    const showTilt = this._coverConfig.show_tilt !== false && tilt !== undefined;
    const icon = isOpen ? 'mdi:window-open-variant' : 'mdi:window-closed-variant';
    const showName = this._config.show_name !== false;
    const showState = this._config.show_state !== false;
    const showIcon = this._config.show_icon !== false;

    return html`
      <ha-card>
        ${this.renderSketchBg(400, 200, isOpen)}
        <div class="sketch-card-content">
          <div class="cover-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${showIcon
              ? html`
                  <div class="cover-icon-wrap ${isOpen ? 'open' : ''}">
                    <div class="cover-fill" style="height: ${position}%"></div>
                    <ha-icon class="sketch-icon" .icon=${this._config.icon || icon}></ha-icon>
                  </div>
                `
              : nothing}
            <div class="sketch-col">
              ${showName ? html`<p class="sketch-name">${this.getName()}</p>` : nothing}
              ${showState ? html`<p class="sketch-state">${entity.state} ${position != null ? `(${position}%)` : ''}</p>` : nothing}
            </div>
          </div>

          <div class="cover-controls">
            <button class="cover-ctrl-btn" @click=${() => this._callCoverService('open_cover')}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
            <button class="cover-ctrl-btn" @click=${() => this._callCoverService('stop_cover')}>
              <ha-icon icon="mdi:stop"></ha-icon>
            </button>
            <button class="cover-ctrl-btn" @click=${() => this._callCoverService('close_cover')}>
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
          </div>

          ${showPosition
            ? html`
                <div class="position-row">
                  <div class="position-label">
                    <span class="sketch-label">Position</span>
                    <span class="sketch-label">${position}%</span>
                  </div>
                  <input
                    type="range"
                    class="sketch-slider"
                    min="0"
                    max="100"
                    .value=${String(position)}
                    @change=${this._setPosition}
                  />
                </div>
              `
            : nothing}

          ${showTilt
            ? html`
                <div class="tilt-row">
                  <div class="position-label">
                    <span class="sketch-label">Tilt</span>
                    <span class="sketch-label">${tilt}%</span>
                  </div>
                  <input
                    type="range"
                    class="sketch-slider"
                    min="0"
                    max="100"
                    .value=${String(tilt)}
                    @change=${this._setTilt}
                  />
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

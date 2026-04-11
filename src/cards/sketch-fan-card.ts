import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import { isEntityActive } from '../shared/utils';
import type { HomeAssistant, FanCardConfig } from '../shared/types';
import '../editors/sketch-fan-card-editor';

@customElement('sketch-fan-card')
export class SketchFanCard extends BaseSketchCard {
  static styles = [
    ...super.styles,
    css`
      .fan-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .fan-icon-wrap {
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .fan-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .fan-icon-wrap.on ha-icon {
        color: var(--sketch-active, var(--sketch-primary));
      }
      .fan-icon-wrap.on ha-icon {
        color: var(--sketch-active);
        animation: sketch-fan-spin 1.5s linear infinite;
      }
      @keyframes sketch-fan-spin {
        to { transform: rotate(360deg); }
      }
      .speed-row {
        margin-top: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .speed-value {
        font-family: var(--sketch-font);
        font-size: 1em;
        min-width: 40px;
        text-align: right;
        color: var(--sketch-ink-muted);
      }
    `,
  ];

  setConfig(config: FanCardConfig): void {
    if (!config.entity) throw new Error('Please define a fan entity');
    super.setConfig(config);
  }

  protected get defaultTapAction(): string {
    return 'toggle';
  }

  static getConfigElement() {
    return document.createElement('sketch-fan-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const fans = Object.keys(hass.states).filter((e) => e.startsWith('fan.'));
    return { entity: fans[0] || 'fan.example' };
  }

  getCardSize() {
    return 3;
  }

  private get _fanConfig(): FanCardConfig {
    return this._config as FanCardConfig;
  }

  private _setSpeed(e: Event) {
    const value = Math.max(0, Math.min(parseInt((e.target as HTMLInputElement).value), 100));
    this.callService('fan', 'set_percentage', {
      entity_id: this._config.entity,
      percentage: value,
    });
  }

  render() {
    const entity = this.getEntity();
    if (!entity) {
      return html`<ha-card><div class="sketch-card-content"><p class="sketch-name">Fan not found</p></div></ha-card>`;
    }

    const isOn = isEntityActive(entity.state);
    const speed = entity.attributes.percentage ?? 0;
    const showName = this._config.show_name !== false;
    const showState = this._config.show_state !== false;
    const showIcon = this._config.show_icon !== false;
    const showSpeed = this._fanConfig.show_speed !== false && isOn;
    const icon = this._config.icon || 'mdi:fan';

    return html`
      <ha-card>
        ${this.renderSketchBg(400, 200, isOn)}
        <div class="sketch-card-content">
          <div class="fan-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${showIcon
              ? html`
                  <div class="fan-icon-wrap ${isOn ? 'on' : ''}">
                    <ha-icon class="sketch-icon" .icon=${icon}></ha-icon>
                  </div>
                `
              : nothing}
            <div class="sketch-col">
              ${showName ? html`<p class="sketch-name">${this.getName()}</p>` : nothing}
              ${showState ? html`<p class="sketch-state">${isOn ? `${speed}%` : 'Off'}</p>` : nothing}
            </div>
          </div>
          ${showSpeed
            ? html`
                <div class="speed-row">
                  <span class="sketch-label">Speed</span>
                  <input type="range" class="sketch-slider" min="0" max="100" .value=${String(speed)} @change=${this._setSpeed} />
                  <span class="speed-value">${speed}%</span>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

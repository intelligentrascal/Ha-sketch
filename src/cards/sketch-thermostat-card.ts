import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import type { HomeAssistant, ThermostatCardConfig } from '../shared/types';
import '../editors/sketch-thermostat-card-editor';

@customElement('sketch-thermostat-card')
export class SketchThermostatCard extends BaseSketchCard {
  static styles = [
    ...super.styles,
    css`
      .thermo-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .thermo-icon-wrap {
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--sketch-hover-bg);
        border-radius: 50%;
      }
      .thermo-icon-wrap.heating {
        background: rgba(244, 67, 54, 0.15);
      }
      .thermo-icon-wrap.heating ha-icon { color: var(--sketch-danger); }
      .thermo-icon-wrap.cooling {
        background: rgba(74, 111, 165, 0.15);
      }
      .thermo-icon-wrap.cooling ha-icon { color: var(--sketch-primary); }
      .thermo-temp-display {
        text-align: center;
        margin: 16px 0 8px;
      }
      .current-temp {
        font-family: var(--sketch-font);
        font-size: 2.8em;
        font-weight: 700;
        line-height: 1;
      }
      .target-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin: 12px 0;
      }
      .temp-adjust-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--sketch-font);
        font-size: 1.4em;
        font-weight: 700;
        background: transparent;
        border: 2px solid var(--sketch-border);
        border-radius: 50%;
        cursor: pointer;
        color: var(--sketch-ink);
        transition: background 0.2s;
      }
      .temp-adjust-btn:hover { background: var(--sketch-hover-bg); }
      .target-temp {
        font-family: var(--sketch-font);
        font-size: 1.5em;
        font-weight: 600;
        min-width: 60px;
        text-align: center;
      }
      .mode-row {
        display: flex;
        gap: 6px;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 8px;
      }
    `,
  ];

  setConfig(config: ThermostatCardConfig): void {
    if (!config.entity) throw new Error('Please define a climate entity');
    super.setConfig(config);
  }

  static getConfigElement() {
    return document.createElement('sketch-thermostat-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const climates = Object.keys(hass.states).filter((e) => e.startsWith('climate.'));
    return { entity: climates[0] || 'climate.example' };
  }

  getCardSize() {
    return 4;
  }

  private _adjustTemp(delta: number) {
    const entity = this.getEntity();
    if (!entity) return;
    const step = entity.attributes.target_temp_step || 0.5;
    const current = entity.attributes.temperature || 20;
    this.callService('climate', 'set_temperature', {
      entity_id: this._config.entity,
      temperature: current + delta * step,
    });
  }

  private _setMode(mode: string) {
    this.callService('climate', 'set_hvac_mode', {
      entity_id: this._config.entity,
      hvac_mode: mode,
    });
  }

  render() {
    const entity = this.getEntity();
    if (!entity) {
      return html`<ha-card><div class="sketch-card-content"><p class="sketch-name">Climate not found</p></div></ha-card>`;
    }

    const currentTemp = entity.attributes.current_temperature ?? '--';
    const targetTemp = entity.attributes.temperature ?? '--';
    const unit = entity.attributes.unit_of_measurement || '\u00b0';
    const hvacAction = entity.attributes.hvac_action || entity.state;
    const modes = entity.attributes.hvac_modes || [];
    const activeMode = entity.state;

    let actionClass = '';
    if (hvacAction === 'heating' || activeMode === 'heat') actionClass = 'heating';
    if (hvacAction === 'cooling' || activeMode === 'cool') actionClass = 'cooling';

    const showName = this._config.show_name !== false;
    const showState = this._config.show_state !== false;
    const showIcon = this._config.show_icon !== false;

    return html`
      <ha-card>
        ${this.renderSketchBg()}
        <div class="sketch-card-content">
          <div class="thermo-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${showIcon
              ? html`
                  <div class="thermo-icon-wrap ${actionClass}">
                    <ha-icon class="sketch-icon" .icon=${'mdi:thermostat'}></ha-icon>
                  </div>
                `
              : nothing}
            <div class="sketch-col">
              ${showName ? html`<p class="sketch-name">${this.getName()}</p>` : nothing}
              ${showState ? html`<p class="sketch-state">${activeMode}</p>` : nothing}
            </div>
          </div>

          <div class="thermo-temp-display">
            <span class="current-temp">${currentTemp}${unit}</span>
            <span class="sketch-label" style="display:block;margin-top:4px">Current</span>
          </div>

          <hr class="sketch-divider" />

          <div class="target-row">
            <button class="temp-adjust-btn" @click=${() => this._adjustTemp(-1)}>-</button>
            <span class="target-temp">${targetTemp}${unit}</span>
            <button class="temp-adjust-btn" @click=${() => this._adjustTemp(1)}>+</button>
          </div>
          <span class="sketch-label" style="text-align:center;display:block">Target</span>

          ${modes.length > 0
            ? html`
                <div class="mode-row">
                  ${modes.map(
                    (mode: string) => html`
                      <button
                        class="sketch-btn ${mode === activeMode ? 'active' : ''}"
                        @click=${() => this._setMode(mode)}
                      >
                        ${mode}
                      </button>
                    `
                  )}
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

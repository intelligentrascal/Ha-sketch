import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import type { HomeAssistant, NumberCardConfig } from '../shared/types';
import '../editors/sketch-number-card-editor';

@customElement('sketch-number-card')
export class SketchNumberCard extends BaseSketchCard {
  static styles = [
    ...super.styles,
    css`
      .number-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .number-icon-wrap {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1.5px dashed var(--sketch-ink-light);
        border-radius: 50%;
        flex-shrink: 0;
      }
      .number-slider-row {
        margin-top: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .number-value {
        font-family: var(--sketch-font);
        font-size: 1em;
        min-width: 50px;
        text-align: right;
        color: var(--sketch-ink-muted);
      }
    `,
  ];

  setConfig(config: NumberCardConfig): void {
    if (!config.entity) throw new Error('Please define a number/input_number entity');
    super.setConfig(config);
  }

  static getConfigElement() {
    return document.createElement('sketch-number-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const numbers = Object.keys(hass.states).filter((e) =>
      e.startsWith('input_number.') || e.startsWith('number.')
    );
    return { entity: numbers[0] || 'input_number.example' };
  }

  getCardSize() {
    return 2;
  }

  private _setValue(e: Event) {
    const entity = this.getEntity();
    if (!entity) return;
    const min = entity.attributes.min ?? 0;
    const max = entity.attributes.max ?? 100;
    const raw = parseFloat((e.target as HTMLInputElement).value);
    const value = Math.max(min, Math.min(raw, max));
    const domain = this._config.entity!.split('.')[0];
    this.callService(domain, 'set_value', {
      entity_id: this._config.entity,
      value,
    });
  }

  render() {
    const entity = this.getEntity();
    if (!entity) {
      return html`<ha-card><div class="sketch-card-content"><p class="sketch-name">Number not found</p></div></ha-card>`;
    }

    const value = parseFloat(entity.state) || 0;
    const min = entity.attributes.min ?? 0;
    const max = entity.attributes.max ?? 100;
    const step = entity.attributes.step ?? 1;
    const unit = entity.attributes.unit_of_measurement || '';
    const showName = this._config.show_name !== false;
    const showState = this._config.show_state !== false;
    const showIcon = this._config.show_icon !== false;
    const showSlider = (this._config as NumberCardConfig).show_slider !== false;
    const icon = this._config.icon || 'mdi:ray-vertex';

    return html`
      <ha-card>
        <div class="sketch-card-content">
          <div class="number-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${showIcon
              ? html`
                  <div class="number-icon-wrap">
                    <ha-icon class="sketch-icon" .icon=${icon}></ha-icon>
                  </div>
                `
              : nothing}
            <div class="sketch-col">
              ${showName ? html`<p class="sketch-name">${this.getName()}</p>` : nothing}
              ${showState ? html`<p class="sketch-state">${value}${unit ? ` ${unit}` : ''}</p>` : nothing}
            </div>
          </div>
          ${showSlider
            ? html`
                <div class="number-slider-row">
                  <input
                    type="range"
                    class="sketch-slider"
                    min=${min}
                    max=${max}
                    step=${step}
                    .value=${String(value)}
                    @change=${this._setValue}
                  />
                  <span class="number-value">${value}${unit ? ` ${unit}` : ''}</span>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

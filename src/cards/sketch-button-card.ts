import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import { stateIcon, isEntityActive } from '../shared/utils';
import type { HomeAssistant, CardConfig } from '../shared/types';
import '../editors/sketch-button-card-editor';

@customElement('sketch-button-card')
export class SketchButtonCard extends BaseSketchCard {
  @state() private _pressing = false;

  static styles = [
    ...super.styles,
    css`
      .button-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 16px;
        cursor: pointer;
        user-select: none;
        min-height: 80px;
        transition: transform 0.15s ease;
      }
      .button-wrap.pressing {
        transform: scale(0.96);
      }
      .button-icon-wrap {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        border-radius: 50%;
        transition: color 0.2s ease;
      }
      .button-icon-wrap.active ha-icon {
        color: var(--sketch-primary);
      }
      .button-icon-wrap.active ha-icon {
        color: #fff;
      }
      .button-label {
        font-family: var(--sketch-font);
        font-size: 1.2em;
        font-weight: 600;
        text-align: center;
      }
      .button-state {
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
        margin-top: 2px;
      }
    `,
  ];

  setConfig(config: CardConfig): void {
    super.setConfig(config);
  }

  protected get defaultTapAction(): string {
    return 'toggle';
  }

  static getConfigElement() {
    return document.createElement('sketch-button-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const entities = Object.keys(hass.states).filter((e) => e.startsWith('light.') || e.startsWith('switch.'));
    return { entity: entities[0] || 'light.example', tap_action: { action: 'toggle' } };
  }

  getCardSize() {
    return 3;
  }

  private _handlePress(ev: PointerEvent) {
    this._pressing = true;
    this.handlePointerDown(ev);
  }

  private _handleRelease(ev: PointerEvent) {
    this._pressing = false;
    this.handlePointerUp(ev);
  }

  private _handleCancel() {
    this._pressing = false;
    this.handlePointerCancel();
  }

  render() {
    const entity = this.getEntity();
    const icon = this._config.icon || (entity ? stateIcon(entity) : 'mdi:gesture-tap');
    const name = this.getName() || 'Button';
    const isActive = entity && isEntityActive(entity.state);
    const showName = this._config.show_name !== false;
    const showState = this._config.show_state !== false;
    const showIcon = this._config.show_icon !== false;

    return html`
      <ha-card>
        ${this.renderSketchBg(400, 200, !!isActive)}
        <div
          class="sketch-card-content button-wrap ${this._pressing ? 'pressing' : ''}"
          role="button"
          tabindex="0"
          aria-label="${this.getName() || 'Button'}"
          @keydown=${this.handleKeyDown}
          @pointerdown=${this._handlePress}
          @pointerup=${this._handleRelease}
          @pointerleave=${this._handleCancel}
          @pointercancel=${this._handleCancel}
        >
          ${showIcon
            ? html`
                <div class="button-icon-wrap ${isActive ? 'active' : ''}">
                  <ha-icon class="sketch-icon" .icon=${icon}></ha-icon>
                </div>
              `
            : nothing}
          ${showName ? html`<div class="button-label">${name}</div>` : nothing}
          ${showState && entity
            ? html`<div class="button-state">${entity.state}</div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

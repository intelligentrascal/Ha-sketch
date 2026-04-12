import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import type { HomeAssistant, LockCardConfig } from '../shared/types';
import '../editors/sketch-lock-card-editor';

@customElement('sketch-lock-card')
export class SketchLockCard extends BaseSketchCard {
  static styles = [
    ...super.styles,
    css`
      .lock-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .lock-icon-wrap {
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .lock-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .lock-icon-wrap.locked ha-icon { color: var(--sketch-success); }
      .lock-icon-wrap.unlocked ha-icon { color: var(--sketch-warning); }
      .lock-controls {
        display: flex;
        gap: 8px;
        margin-top: 12px;
        justify-content: center;
      }
    `,
  ];

  setConfig(config: LockCardConfig): void {
    if (!config.entity) throw new Error('Please define a lock entity');
    super.setConfig(config);
  }

  static getConfigElement() {
    return document.createElement('sketch-lock-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const locks = Object.keys(hass.states).filter((e) => e.startsWith('lock.'));
    return { entity: locks[0] || 'lock.example' };
  }

  getCardSize() {
    return 3;
  }

  private _lock() {
    this.callService('lock', 'lock', { entity_id: this._config.entity });
  }

  private _unlock() {
    this.callService('lock', 'unlock', { entity_id: this._config.entity });
  }

  render() {
    const entity = this.getEntity();
    if (!entity) {
      return html`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Lock not found</p></div></ha-card>`;
    }

    const isLocked = entity.state === 'locked';
    const showName = this._config.show_name !== false;
    const showState = this._config.show_state !== false;
    const showIcon = this._config.show_icon !== false;
    const icon = this._config.icon || (isLocked ? 'mdi:lock' : 'mdi:lock-open');

    return html`
      <ha-card>
        ${this.renderSketchBg(400, 200, isLocked)}
        <div class="sketch-card-content">
          <div class="lock-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${showIcon
              ? html`
                  <div class="lock-icon-wrap ${isLocked ? 'locked' : 'unlocked'}">
                    <ha-icon class="sketch-icon" .icon=${icon}></ha-icon>
                  </div>
                `
              : nothing}
            <div class="sketch-col">
              ${showName ? html`<p class="sketch-name">${this.getName()}</p>` : nothing}
              ${showState ? html`<p class="sketch-state">${isLocked ? 'Locked' : 'Unlocked'}</p>` : nothing}
            </div>
          </div>
          <div class="lock-controls">
            <button class="sketch-btn ${isLocked ? 'active' : ''}" @click=${this._lock}>Lock</button>
            <button class="sketch-btn ${!isLocked ? 'active' : ''}" @click=${this._unlock}>Unlock</button>
          </div>
        </div>
      </ha-card>
    `;
  }
}

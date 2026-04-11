import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import { isEntityActive, formatState } from '../shared/utils';
import type { HomeAssistant, RoomCardConfig } from '../shared/types';
import '../editors/sketch-room-card-editor';

@customElement('sketch-room-card')
export class SketchRoomCard extends BaseSketchCard {
  static styles = [
    ...super.styles,
    css`
      .room-wrap {
        display: flex;
        align-items: center;
        gap: 14px;
        cursor: pointer;
        min-height: 48px;
      }
      .room-icon-wrap {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .room-icon-wrap ha-icon {
        --mdc-icon-size: var(--sketch-icon-md);
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .room-icon-wrap.active ha-icon {
        color: var(--sketch-active, var(--sketch-primary));
      }
      .room-info {
        flex: 1;
        min-width: 0;
      }
      .room-name {
        font-family: var(--sketch-font);
        font-size: 1.2em;
        font-weight: 600;
        color: var(--sketch-ink);
      }
      .room-status {
        font-family: var(--sketch-font);
        font-size: 0.85em;
        color: var(--sketch-ink-muted);
        margin-top: 2px;
      }
      .room-sensors {
        display: flex;
        gap: 10px;
        flex-shrink: 0;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .room-sensor {
        font-family: var(--sketch-font);
        font-size: 0.85em;
        color: var(--sketch-ink-muted);
        display: flex;
        align-items: center;
        gap: 3px;
        white-space: nowrap;
      }
      .room-sensor ha-icon {
        --mdc-icon-size: 14px;
        color: var(--sketch-ink-muted);
      }
    `,
  ];

  private get _roomConfig(): RoomCardConfig {
    return this._config as RoomCardConfig;
  }

  setConfig(config: RoomCardConfig): void {
    super.setConfig(config as any);
  }

  static getConfigElement() {
    return document.createElement('sketch-room-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const binary = Object.keys(hass.states).filter((e) => e.startsWith('binary_sensor.'));
    return { entity: binary[0] || 'binary_sensor.motion', name: 'Room', icon: 'mdi:sofa' };
  }

  getCardSize() {
    return 2;
  }

  protected get defaultTapAction(): string {
    return 'more-info';
  }

  render() {
    const entity = this.getEntity();
    const isActive = entity ? isEntityActive(entity.state) : false;
    const icon = this._config.icon || 'mdi:home';
    const name = this.getName() || 'Room';
    const status = entity ? (isActive ? 'Occupied' : 'Empty') : '';
    const subEntities = this._roomConfig.sub_entities || [];

    return html`
      <ha-card>
        ${this.renderSketchBg(400, 200, isActive)}
        <div class="sketch-card-content">
          <div
            class="room-wrap"
            role="button"
            tabindex="0"
            aria-label="${name}"
            @keydown=${this.handleKeyDown}
            @pointerdown=${this.handlePointerDown}
            @pointerup=${this.handlePointerUp}
            @pointercancel=${this.handlePointerCancel}
          >
            <div class="room-icon-wrap ${isActive ? 'active' : ''}">
              <ha-icon .icon=${icon}></ha-icon>
            </div>
            <div class="room-info">
              <div class="room-name">${name}</div>
              ${status ? html`<div class="room-status">${status}</div>` : nothing}
            </div>
            ${subEntities.length
              ? html`
                  <div class="room-sensors">
                    ${subEntities.map((sub) => {
                      const subEnt = this.hass?.states[sub.entity || ''];
                      if (!subEnt) return nothing;
                      return html`
                        <span class="room-sensor">
                          ${sub.icon ? html`<ha-icon .icon=${sub.icon}></ha-icon>` : nothing}
                          ${formatState(subEnt, this.hass)}
                        </span>
                      `;
                    })}
                  </div>
                `
              : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }
}

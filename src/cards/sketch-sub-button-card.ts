import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import { stateIcon, formatState, isEntityActive } from '../shared/utils';
import type { HomeAssistant, SubButtonCardConfig, SubButton } from '../shared/types';
import '../editors/sketch-sub-button-card-editor';

@customElement('sketch-sub-button-card')
export class SketchSubButtonCard extends BaseSketchCard {
  @state() private _expanded = true;

  static styles = [
    ...super.styles,
    css`
      .primary-row {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .primary-icon-wrap {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .primary-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .primary-icon-wrap.on ha-icon {
        color: var(--sketch-active, var(--sketch-primary));
      }
      .expand-chevron {
        --mdc-icon-size: 20px;
        color: var(--sketch-ink-muted);
        transition: transform 0.3s ease;
        flex-shrink: 0;
      }
      .expand-chevron.open {
        transform: rotate(180deg);
      }
      .sub-buttons-grid {
        display: grid;
        gap: 8px;
        margin-top: 12px;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        overflow: hidden;
      }
      .sub-buttons-grid.collapsed {
        max-height: 0;
        opacity: 0;
        margin-top: 0;
      }
      .sub-buttons-grid.expanded {
        max-height: 500px;
        opacity: 1;
      }
      .sub-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 10px;
        background: transparent;
        border: 1.5px solid var(--sketch-ink-light);
        border-radius: 2px;
        cursor: pointer;
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink);
        transition: background 0.2s ease, transform 0.15s ease;
        border-style: dashed;
        text-align: left;
      }
      .sub-btn:nth-child(odd) { rotate: -0.3deg; }
      .sub-btn:nth-child(even) { rotate: 0.4deg; }
      .sub-btn:hover {
        background: var(--sketch-hover-bg);
        transform: translate(-1px, -1px);
      }
      .sub-btn:active {
        transform: translate(0, 0);
      }
      .sub-btn.active {
        background: var(--sketch-primary);
        color: var(--text-primary-color, #fff);
        border-color: var(--sketch-primary);
      }
      .sub-btn.active ha-icon {
        color: var(--text-primary-color, #fff);
      }
      .sub-btn ha-icon {
        --mdc-icon-size: 18px;
        color: var(--sketch-ink-muted);
        flex-shrink: 0;
      }
      .sub-btn-info {
        flex: 1;
        min-width: 0;
      }
      .sub-btn-name {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sub-btn-state {
        font-size: 0.85em;
        color: var(--sketch-ink-muted);
        white-space: nowrap;
      }
      .sub-btn.active .sub-btn-state {
        color: rgba(255, 255, 255, 0.8);
      }
    `,
  ];

  setConfig(config: SubButtonCardConfig): void {
    if (!config.entity) throw new Error('Please define an entity');
    if (!config.sub_buttons || !Array.isArray(config.sub_buttons)) {
      throw new Error('Please define sub_buttons array');
    }
    super.setConfig(config);
    if (config.collapsible === false) this._expanded = true;
  }

  static getConfigElement() {
    return document.createElement('sketch-sub-button-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const entities = Object.keys(hass.states);
    const lights = entities.filter((e) => e.startsWith('light.'));
    return {
      entity: lights[0] || entities[0] || 'light.example',
      sub_buttons: [
        { entity: lights[1] || 'light.example', name: 'Lamp' },
        { icon: 'mdi:movie', name: 'Movie Mode', tap_action: { action: 'call-service', service: 'scene.turn_on' } },
        { icon: 'mdi:power', name: 'All Off', tap_action: { action: 'call-service', service: 'light.turn_off' } },
      ],
    };
  }

  getCardSize() {
    return 3;
  }

  private get _subConfig(): SubButtonCardConfig {
    return this._config as SubButtonCardConfig;
  }

  private _toggleExpand() {
    if (this._subConfig.collapsible !== false) {
      this._expanded = !this._expanded;
    }
  }

  private _handleSubButtonTap(btn: SubButton) {
    const defaultAction = btn.entity ? 'toggle' : 'none';
    const action = btn.tap_action?.action || defaultAction;
    switch (action) {
      case 'toggle':
        if (btn.entity) {
          const [domain] = btn.entity.split('.');
          this.callService(domain, 'toggle', { entity_id: btn.entity });
          window.dispatchEvent(new CustomEvent('haptic', { detail: 'success' }));
        }
        break;
      case 'call-service':
        if (btn.tap_action?.service) {
          const [domain, service] = btn.tap_action.service.split('.');
          this.callService(domain, service, {
            ...btn.tap_action.service_data,
            ...(btn.entity ? { entity_id: btn.entity } : {}),
          });
          window.dispatchEvent(new CustomEvent('haptic', { detail: 'light' }));
        }
        break;
      case 'more-info':
        if (btn.entity) {
          this.fireEvent('hass-more-info', { entityId: btn.entity });
        }
        break;
      case 'navigate':
        if (btn.tap_action?.navigation_path) {
          window.history.pushState(null, '', btn.tap_action.navigation_path);
          this.fireEvent('location-changed');
          window.dispatchEvent(new CustomEvent('haptic', { detail: 'light' }));
        }
        break;
      case 'url':
        if (btn.tap_action?.url_path) {
          window.open(btn.tap_action.url_path, '_blank');
          window.dispatchEvent(new CustomEvent('haptic', { detail: 'light' }));
        }
        break;
      case 'none':
        break;
    }
  }

  private _renderSubButton(btn: SubButton) {
    const entity = btn.entity ? this.hass.states[btn.entity] : undefined;
    const icon = btn.icon || (entity ? stateIcon(entity) : 'mdi:circle-small');
    const name = btn.name || (entity?.attributes?.friendly_name) || '';
    const isActive = entity && isEntityActive(entity.state);
    const showState = btn.show_state && entity;

    return html`
      <button class="sub-btn ${isActive ? 'active' : ''}" @click=${() => this._handleSubButtonTap(btn)}>
        <ha-icon .icon=${icon}></ha-icon>
        <div class="sub-btn-info">
          <div class="sub-btn-name">${name}</div>
          ${showState ? html`<div class="sub-btn-state">${formatState(entity!)}</div>` : nothing}
        </div>
      </button>
    `;
  }

  render() {
    const entity = this.getEntity();
    if (!entity) {
      return html`<ha-card><div class="sketch-card-content"><p class="sketch-name">Entity not found</p></div></ha-card>`;
    }

    const icon = this._config.icon || stateIcon(entity);
    const name = this.getName();
    const isOn = isEntityActive(entity.state);
    const columns = Math.max(1, Math.min(this._subConfig.columns || 3, 6));
    const collapsible = this._subConfig.collapsible !== false;
    const showName = this._config.show_name !== false;
    const showState = this._config.show_state !== false;
    const showIcon = this._config.show_icon !== false;

    return html`
      <ha-card>
        ${this.renderSketchBg(400, 200, isOn)}
        <div class="sketch-card-content">
          <div class="primary-row" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @click=${collapsible ? this._toggleExpand : undefined} @pointerdown=${collapsible ? undefined : this.handlePointerDown} @pointerup=${collapsible ? undefined : this.handlePointerUp} @pointercancel=${collapsible ? undefined : this.handlePointerCancel}>
            ${showIcon
              ? html`
                  <div class="primary-icon-wrap ${isOn ? 'on' : ''}">
                    <ha-icon class="sketch-icon" .icon=${icon}></ha-icon>
                  </div>
                `
              : nothing}
            <div class="sketch-col">
              ${showName ? html`<p class="sketch-name">${name}</p>` : nothing}
              ${showState ? html`<p class="sketch-state">${formatState(entity)}</p>` : nothing}
            </div>
            ${collapsible
              ? html`<ha-icon class="expand-chevron ${this._expanded ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>`
              : nothing}
          </div>
          <div
            class="sub-buttons-grid ${this._expanded ? 'expanded' : 'collapsed'}"
            style="grid-template-columns: repeat(${columns}, 1fr)"
          >
            ${this._subConfig.sub_buttons.map((btn) => this._renderSubButton(btn))}
          </div>
        </div>
      </ha-card>
    `;
  }
}

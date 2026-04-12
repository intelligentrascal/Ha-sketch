import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import type { HomeAssistant, SelectCardConfig } from '../shared/types';
import '../editors/sketch-select-card-editor';

@customElement('sketch-select-card')
export class SketchSelectCard extends BaseSketchCard {
  @state() private _open = false;

  static styles = [
    ...super.styles,
    css`
      .select-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .select-icon-wrap {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .select-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .select-info {
        flex: 1;
        min-width: 0;
      }
      .select-current {
        font-family: var(--sketch-font);
        font-size: 1.1em;
        font-weight: 600;
        color: var(--sketch-ink);
      }
      .select-chevron {
        --mdc-icon-size: 20px;
        color: var(--sketch-ink-muted);
        transition: transform 0.2s ease;
        flex-shrink: 0;
      }
      .select-chevron.open {
        transform: rotate(180deg);
      }
      .select-options {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
      .select-options.open {
        max-height: 500px;
      }
      .select-option {
        font-family: var(--sketch-font);
        font-size: 1em;
        padding: 8px 12px;
        cursor: pointer;
        border-radius: var(--sketch-radius, 12px);
        color: var(--sketch-ink);
        transition: background 0.15s ease;
      }
      .select-option:hover {
        background: var(--sketch-hover-bg);
      }
      .select-option.active {
        color: var(--sketch-active, var(--sketch-primary));
        font-weight: 600;
      }
    `,
  ];

  setConfig(config: SelectCardConfig): void {
    if (!config.entity) throw new Error('Please define an entity');
    super.setConfig(config as any);
  }

  static getConfigElement() {
    return document.createElement('sketch-select-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const selects = Object.keys(hass.states).filter(
      (e) => e.startsWith('input_select.') || e.startsWith('select.')
    );
    return { entity: selects[0] || 'input_select.example' };
  }

  getCardSize() {
    return 2;
  }

  private _toggleOpen() {
    this._open = !this._open;
  }

  private _selectOption(option: string) {
    if (!this._config?.entity) return;
    const domain = this._config.entity.split('.')[0];
    const service = domain === 'input_select' ? 'select_option' : 'select_option';
    this.callService(domain, service, {
      entity_id: this._config.entity,
      option,
    });
    this._open = false;
  }

  render() {
    const entity = this.getEntity();
    if (!entity) {
      return html`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Entity not found</p></div></ha-card>`;
    }

    const name = this.getName();
    const current = entity.state;
    const options: string[] = entity.attributes.options || [];
    const icon = this._config.icon || entity.attributes.icon || 'mdi:format-list-bulleted';
    const showIcon = this._config.show_icon !== false;
    const showName = this._config.show_name !== false;

    return html`
      <ha-card>
        ${this.renderSketchBg()}
        <div class="sketch-card-content">
          <div
            class="select-header"
            role="button"
            tabindex="0"
            aria-label="${name}"
            @click=${this._toggleOpen}
            @keydown=${(ev: KeyboardEvent) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); this._toggleOpen(); } }}
          >
            ${showIcon
              ? html`
                  <div class="select-icon-wrap">
                    <ha-icon .icon=${icon}></ha-icon>
                  </div>
                `
              : nothing}
            <div class="select-info">
              ${showName ? html`<p class="sketch-name">${name}</p>` : nothing}
              <div class="select-current">${current}</div>
            </div>
            <ha-icon class="select-chevron ${this._open ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="select-options ${this._open ? 'open' : ''}">
            ${options.map(
              (opt) => html`
                <div
                  class="select-option ${opt === current ? 'active' : ''}"
                  role="option"
                  aria-selected="${opt === current}"
                  @click=${() => this._selectOption(opt)}
                >
                  ${opt}
                </div>
              `
            )}
          </div>
        </div>
      </ha-card>
    `;
  }
}

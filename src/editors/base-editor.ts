import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../shared/types';

/**
 * Base class for all sketch card editors.
 * Provides shared hass/config handling and fires 'config-changed' events.
 */
export abstract class BaseSketchEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() protected _config: any = {};

  static styles = [css`
    :host {
      display: block;
    }
    .editor-section-title {
      font-weight: 500;
      font-size: 14px;
      margin: 16px 0 8px;
      color: var(--primary-text-color);
    }
    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      cursor: pointer;
    }
    .switch-row span {
      font-size: 14px;
    }
    ha-textfield {
      display: block;
      width: 100%;
      margin-bottom: 8px;
    }
    ha-entity-picker {
      display: block;
      margin-bottom: 8px;
    }
    ha-icon-picker {
      display: block;
      margin-bottom: 8px;
    }
    ha-select {
      display: block;
      width: 100%;
      margin-bottom: 8px;
    }
  `];

  setConfig(config: any): void {
    this._config = { ...config };
  }

  protected _configChanged(newConfig: any): void {
    this._config = { ...newConfig };
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected _valueChanged(key: string, value: any): void {
    const newConfig = { ...this._config };
    if (value === undefined || value === null || value === '') {
      delete newConfig[key];
    } else {
      newConfig[key] = value;
    }
    this._configChanged(newConfig);
  }

  /** Render an entity picker field. */
  protected renderEntityPicker(label: string, key: string = 'entity', domainFilter?: string): any {
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${this._config[key] || ''}
        .label=${label}
        .includeDomains=${domainFilter ? [domainFilter] : undefined}
        @value-changed=${(ev: CustomEvent) => {
          ev.stopPropagation();
          this._valueChanged(key, ev.detail.value);
        }}
        allow-custom-entity
      ></ha-entity-picker>
    `;
  }

  /** Render a text field. */
  protected renderTextField(label: string, key: string): any {
    return html`
      <ha-textfield
        .label=${label}
        .value=${this._config[key] || ''}
        @change=${(ev: Event) => this._valueChanged(key, (ev.target as any).value)}
      ></ha-textfield>
    `;
  }

  /** Render an icon picker. */
  protected renderIconPicker(label: string, key: string = 'icon'): any {
    return html`
      <ha-icon-picker
        .hass=${this.hass}
        .value=${this._config[key] || ''}
        .label=${label}
        @value-changed=${(ev: CustomEvent) => {
          ev.stopPropagation();
          this._valueChanged(key, ev.detail.value);
        }}
      ></ha-icon-picker>
    `;
  }

  /** Render a boolean switch row. */
  protected renderSwitch(label: string, key: string, defaultVal: boolean = true): any {
    const checked = this._config[key] !== undefined ? !!this._config[key] : defaultVal;
    return html`
      <div class="switch-row" @click=${() => this._valueChanged(key, !checked)}>
        <span>${label}</span>
        <ha-switch .checked=${checked}></ha-switch>
      </div>
    `;
  }

  /** Render a number field. */
  protected renderNumber(label: string, key: string, min: number, max: number, defaultVal?: number): any {
    return html`
      <ha-textfield
        .label=${label}
        type="number"
        .value=${String(this._config[key] ?? defaultVal ?? '')}
        .min=${String(min)}
        .max=${String(max)}
        @change=${(ev: Event) => {
          const val = parseInt((ev.target as any).value);
          if (!isNaN(val)) this._valueChanged(key, val);
        }}
      ></ha-textfield>
    `;
  }

  /** Render a select dropdown. */
  protected renderSelect(label: string, key: string, options: { value: string; label: string }[], defaultVal?: string): any {
    return html`
      <ha-select
        .label=${label}
        .value=${this._config[key] || defaultVal || ''}
        @selected=${(ev: CustomEvent) => {
          const index = ev.detail.index;
          if (index >= 0 && index < options.length) {
            this._valueChanged(key, options[index].value);
          }
        }}
        @closed=${(ev: Event) => ev.stopPropagation()}
        fixedMenuPosition
        naturalMenuWidth
      >
        ${options.map(
          (opt) => html`<mwc-list-item .value=${opt.value}>${opt.label}</mwc-list-item>`
        )}
      </ha-select>
    `;
  }

  /**
   * Render the common base fields shared by all entity-based cards.
   * Pass domainFilter (e.g., 'light') to restrict entity picker.
   */
  protected renderBaseFields(domainFilter?: string): any {
    return html`
      ${this.renderEntityPicker('Entity', 'entity', domainFilter)}
      ${this.renderTextField('Name (optional)', 'name')}
      ${this.renderIconPicker('Icon (optional)')}
      ${this.renderSwitch('Show Name', 'show_name')}
      ${this.renderSwitch('Show State', 'show_state')}
      ${this.renderSwitch('Show Icon', 'show_icon')}
    `;
  }
}

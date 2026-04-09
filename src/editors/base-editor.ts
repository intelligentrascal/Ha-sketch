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
      font-family: var(--paper-font-body1_-_font-family, 'Roboto', sans-serif);
    }
    .editor-section {
      margin-bottom: 16px;
    }
    .editor-section-title {
      font-weight: 500;
      font-size: 14px;
      margin: 16px 0 8px;
      color: var(--primary-text-color);
    }
    .editor-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
    }
    .editor-row label {
      flex: 1;
      font-size: 14px;
    }
    ha-textfield,
    ha-select {
      width: 100%;
    }
    ha-entity-picker {
      display: block;
      width: 100%;
    }
    ha-icon-picker {
      display: block;
      width: 100%;
    }
    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
    }
    .switch-row label {
      font-size: 14px;
    }
  `];

  setConfig(config: any): void {
    this._config = { ...config };
  }

  protected _configChanged(newConfig: any): void {
    this._config = newConfig;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected _valueChanged(key: string, value: any): void {
    const newConfig = { ...this._config, [key]: value };
    // Remove undefined/null values
    if (value === undefined || value === null || value === '') {
      delete newConfig[key];
    }
    this._configChanged(newConfig);
  }

  protected _boolChanged(key: string, ev: Event): void {
    const target = ev.target as any;
    // ha-switch may use .checked or .selected depending on HA version
    const checked = target.checked ?? target.selected ?? false;
    this._valueChanged(key, checked);
  }

  /** Render an entity picker field. */
  protected renderEntityPicker(label: string, key: string = 'entity', domainFilter?: string): any {
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${this._config[key] || ''}
        .label=${label}
        .includeDomains=${domainFilter ? [domainFilter] : undefined}
        @value-changed=${(ev: CustomEvent) => this._valueChanged(key, ev.detail.value)}
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
        @input=${(ev: Event) => this._valueChanged(key, (ev.target as any).value)}
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
        @value-changed=${(ev: CustomEvent) => this._valueChanged(key, ev.detail.value)}
      ></ha-icon-picker>
    `;
  }

  /** Render a boolean switch row. */
  protected renderSwitch(label: string, key: string, defaultVal: boolean = true): any {
    const checked = this._config[key] !== undefined ? !!this._config[key] : defaultVal;
    return html`
      <div class="switch-row">
        <label @click=${(ev: Event) => {
          // Click label to toggle — some HA versions don't propagate label clicks
          const sw = (ev.currentTarget as HTMLElement).parentElement?.querySelector('ha-switch') as any;
          if (sw) {
            this._valueChanged(key, !checked);
          }
        }}>${label}</label>
        <ha-switch
          .checked=${checked}
          @change=${(ev: Event) => {
            const target = ev.target as any;
            const val = target.checked ?? target.selected ?? !checked;
            this._valueChanged(key, val);
          }}
        ></ha-switch>
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
        @input=${(ev: Event) => {
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
        @selected=${(ev: Event) => this._valueChanged(key, (ev.target as any).value)}
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

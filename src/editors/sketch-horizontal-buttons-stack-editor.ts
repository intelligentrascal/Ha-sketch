import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-horizontal-buttons-stack-editor')
export class SketchHorizontalButtonsStackEditor extends BaseSketchEditor {
  @state() private _expandedBtn = -1;

  static styles = [
    ...BaseSketchEditor.styles,
    css`
      .btn-list {
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        margin-top: 8px;
      }
      .btn-item {
        padding: 8px 12px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        cursor: pointer;
      }
      .btn-item:last-child { border-bottom: none; }
      .btn-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .btn-header-label {
        font-size: 14px;
        font-weight: 500;
      }
      .btn-detail { padding-top: 8px; }
      .add-btn {
        margin-top: 8px;
        width: 100%;
      }
    `,
  ];

  private _getButtons(): any[] {
    return this._config.buttons || [];
  }

  private _updateButton(index: number, key: string, value: any) {
    const buttons = [...this._getButtons()];
    buttons[index] = { ...buttons[index], [key]: value };
    if (value === undefined || value === null || value === '') delete buttons[index][key];
    this._valueChanged('buttons', buttons);
  }

  private _addButton() {
    const buttons = [...this._getButtons(), { name: 'New', icon: 'mdi:home' }];
    this._valueChanged('buttons', buttons);
    this._expandedBtn = buttons.length - 1;
  }

  private _removeButton(index: number) {
    const buttons = this._getButtons().filter((_: any, i: number) => i !== index);
    this._valueChanged('buttons', buttons);
    this._expandedBtn = -1;
  }

  render() {
    const buttons = this._getButtons();
    return html`
      ${this.renderSelect('Style', 'style', [
        { value: 'fixed', label: 'Fixed Footer' },
        { value: 'inline', label: 'Inline' },
      ], 'fixed')}

      <div class="editor-section-title">Buttons (${buttons.length})</div>
      <div class="btn-list">
        ${buttons.map((btn: any, i: number) => html`
          <div class="btn-item">
            <div class="btn-header" @click=${() => (this._expandedBtn = this._expandedBtn === i ? -1 : i)}>
              <span class="btn-header-label">${btn.name || `Button ${i + 1}`}</span>
              <ha-icon icon=${this._expandedBtn === i ? 'mdi:chevron-up' : 'mdi:chevron-down'} style="--mdc-icon-size:20px"></ha-icon>
            </div>
            ${this._expandedBtn === i ? html`
              <div class="btn-detail">
                <ha-textfield
                  label="Name"
                  .value=${btn.name || ''}
                  @change=${(ev: Event) => this._updateButton(i, 'name', (ev.target as any).value)}
                ></ha-textfield>
                <ha-icon-picker
                  .hass=${this.hass}
                  .value=${btn.icon || ''}
                  label="Icon"
                  @value-changed=${(ev: CustomEvent) => this._updateButton(i, 'icon', ev.detail.value)}
                ></ha-icon-picker>
                <ha-textfield
                  label="Hash (e.g. kitchen)"
                  .value=${btn.hash || ''}
                  @change=${(ev: Event) => this._updateButton(i, 'hash', (ev.target as any).value)}
                ></ha-textfield>
                <ha-textfield
                  label="Navigation Path (e.g. /lovelace/1)"
                  .value=${btn.navigation_path || ''}
                  @change=${(ev: Event) => this._updateButton(i, 'navigation_path', (ev.target as any).value)}
                ></ha-textfield>
                <div style="margin-top:8px">
                  <mwc-button dense @click=${() => this._removeButton(i)}>Remove</mwc-button>
                </div>
              </div>
            ` : nothing}
          </div>
        `)}
      </div>
      <mwc-button class="add-btn" @click=${() => this._addButton()}>Add Button</mwc-button>
    `;
  }
}

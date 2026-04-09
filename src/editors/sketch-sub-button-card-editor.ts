import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-sub-button-card-editor')
export class SketchSubButtonCardEditor extends BaseSketchEditor {
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
      .btn-detail {
        padding-top: 8px;
      }
      .btn-actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
      .add-btn {
        margin-top: 8px;
        width: 100%;
      }
    `,
  ];

  private _getSubButtons(): any[] {
    return this._config.sub_buttons || [];
  }

  private _updateSubButton(index: number, key: string, value: any) {
    const buttons = [...this._getSubButtons()];
    buttons[index] = { ...buttons[index], [key]: value };
    if (value === undefined || value === null || value === '') delete buttons[index][key];
    this._valueChanged('sub_buttons', buttons);
  }

  private _addSubButton() {
    const buttons = [...this._getSubButtons(), { icon: 'mdi:circle-small', name: 'New' }];
    this._valueChanged('sub_buttons', buttons);
    this._expandedBtn = buttons.length - 1;
  }

  private _removeSubButton(index: number) {
    const buttons = this._getSubButtons().filter((_: any, i: number) => i !== index);
    this._valueChanged('sub_buttons', buttons);
    this._expandedBtn = -1;
  }

  render() {
    const buttons = this._getSubButtons();
    return html`
      ${this.renderBaseFields()}
      <div class="editor-section-title">Sub-Button Options</div>
      ${this.renderNumber('Columns', 'columns', 1, 6, 3)}
      ${this.renderSwitch('Collapsible', 'collapsible')}

      <div class="editor-section-title">Sub-Buttons (${buttons.length})</div>
      <div class="btn-list">
        ${buttons.map((btn: any, i: number) => html`
          <div class="btn-item">
            <div class="btn-header" @click=${() => (this._expandedBtn = this._expandedBtn === i ? -1 : i)}>
              <span class="btn-header-label">${btn.name || btn.entity || `Button ${i + 1}`}</span>
              <ha-icon icon=${this._expandedBtn === i ? 'mdi:chevron-up' : 'mdi:chevron-down'} style="--mdc-icon-size:20px"></ha-icon>
            </div>
            ${this._expandedBtn === i ? html`
              <div class="btn-detail">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${btn.entity || ''}
                  label="Entity (optional)"
                  @value-changed=${(ev: CustomEvent) => this._updateSubButton(i, 'entity', ev.detail.value)}
                  allow-custom-entity
                ></ha-entity-picker>
                <ha-textfield
                  label="Name"
                  .value=${btn.name || ''}
                  @change=${(ev: Event) => this._updateSubButton(i, 'name', (ev.target as any).value)}
                ></ha-textfield>
                <ha-icon-picker
                  .hass=${this.hass}
                  .value=${btn.icon || ''}
                  label="Icon"
                  @value-changed=${(ev: CustomEvent) => this._updateSubButton(i, 'icon', ev.detail.value)}
                ></ha-icon-picker>
                <div class="btn-actions">
                  <mwc-button dense @click=${() => this._removeSubButton(i)}>Remove</mwc-button>
                </div>
              </div>
            ` : nothing}
          </div>
        `)}
      </div>
      <mwc-button class="add-btn" @click=${() => this._addSubButton()}>Add Sub-Button</mwc-button>
    `;
  }
}

import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-chip-card-editor')
export class SketchChipCardEditor extends BaseSketchEditor {
  @state() private _expandedChip = -1;

  static styles = [
    ...BaseSketchEditor.styles,
    css`
      .chip-list {
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        margin-top: 8px;
      }
      .chip-item {
        padding: 8px 12px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        cursor: pointer;
      }
      .chip-item:last-child { border-bottom: none; }
      .chip-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .chip-header-label {
        font-size: 14px;
        font-weight: 500;
      }
      .chip-detail { padding-top: 8px; }
      .add-btn {
        margin-top: 8px;
        width: 100%;
      }
    `,
  ];

  private _getChips(): any[] {
    return this._config.chips || [];
  }

  private _updateChip(index: number, key: string, value: any) {
    const chips = [...this._getChips()];
    chips[index] = { ...chips[index], [key]: value };
    if (value === undefined || value === null || value === '') delete chips[index][key];
    this._valueChanged('chips', chips);
  }

  private _addChip() {
    const chips = [...this._getChips(), { type: 'entity', entity: '' }];
    this._valueChanged('chips', chips);
    this._expandedChip = chips.length - 1;
  }

  private _removeChip(index: number) {
    const chips = this._getChips().filter((_: any, i: number) => i !== index);
    this._valueChanged('chips', chips);
    this._expandedChip = -1;
  }

  render() {
    const chips = this._getChips();
    return html`
      <div class="editor-section-title">Chips (${chips.length})</div>
      <div class="chip-list">
        ${chips.map((chip: any, i: number) => html`
          <div class="chip-item">
            <div class="chip-header" @click=${() => (this._expandedChip = this._expandedChip === i ? -1 : i)}>
              <span class="chip-header-label">${chip.name || chip.entity || `Chip ${i + 1} (${chip.type})`}</span>
              <ha-icon icon=${this._expandedChip === i ? 'mdi:chevron-up' : 'mdi:chevron-down'} style="--mdc-icon-size:20px"></ha-icon>
            </div>
            ${this._expandedChip === i ? html`
              <div class="chip-detail">
                <ha-select
                  label="Type"
                  .value=${chip.type || 'entity'}
                  @selected=${(ev: Event) => this._updateChip(i, 'type', (ev.target as any).value)}
                  @closed=${(ev: Event) => ev.stopPropagation()}
                  fixedMenuPosition
                >
                  <mwc-list-item value="entity">Entity</mwc-list-item>
                  <mwc-list-item value="action">Action</mwc-list-item>
                  <mwc-list-item value="template">Template</mwc-list-item>
                </ha-select>
                ${chip.type !== 'template' ? html`
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${chip.entity || ''}
                    label="Entity"
                    @value-changed=${(ev: CustomEvent) => this._updateChip(i, 'entity', ev.detail.value)}
                    allow-custom-entity
                  ></ha-entity-picker>
                ` : nothing}
                <ha-textfield
                  label="Name (optional)"
                  .value=${chip.name || ''}
                  @input=${(ev: Event) => this._updateChip(i, 'name', (ev.target as any).value)}
                ></ha-textfield>
                <ha-icon-picker
                  .hass=${this.hass}
                  .value=${chip.icon || ''}
                  label="Icon (optional)"
                  @value-changed=${(ev: CustomEvent) => this._updateChip(i, 'icon', ev.detail.value)}
                ></ha-icon-picker>
                ${chip.type === 'template' ? html`
                  <ha-textfield
                    label="Content"
                    .value=${chip.content || ''}
                    @input=${(ev: Event) => this._updateChip(i, 'content', (ev.target as any).value)}
                  ></ha-textfield>
                ` : nothing}
                <div style="margin-top:8px">
                  <mwc-button dense @click=${() => this._removeChip(i)}>Remove</mwc-button>
                </div>
              </div>
            ` : nothing}
          </div>
        `)}
      </div>
      <mwc-button class="add-btn" @click=${this._addChip}>Add Chip</mwc-button>
    `;
  }
}

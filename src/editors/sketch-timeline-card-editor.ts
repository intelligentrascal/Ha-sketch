import { html, css, nothing, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../shared/types';
import { appearanceSchema } from './base-editor';

function fireEvent(node: HTMLElement, type: string, detail?: any): void {
  const event = new Event(type, { bubbles: true, cancelable: false, composed: true });
  (event as any).detail = detail;
  node.dispatchEvent(event);
}

@customElement('sketch-timeline-card-editor')
export class SketchTimelineCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() protected _config?: any;

  static styles = [css`
    :host { display: block; }
    .entity-list { margin: 8px 0; }
    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 4px 0;
    }
    .entity-row span {
      flex: 1;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .remove-btn {
      cursor: pointer;
      color: var(--secondary-text-color);
      --mdc-icon-size: 20px;
    }
    .remove-btn:hover { color: var(--error-color, #f44336); }
    .add-entity { margin: 8px 0; }
  `];

  public setConfig(config: any): void {
    this._config = { max_entries: 10, hours_to_show: 4, ...config };
  }

  private _computeLabel = (schema: any): string => {
    const labels: Record<string, string> = {
      name: 'Name (optional)',
      hours_to_show: 'Hours to Show',
      max_entries: 'Max Entries',
      color: 'Accent Color',
      card_background: 'Card Background',
      border_color: 'Border Color',
      variant: 'Card Style',
      card_rotation: 'Rotation',
      corner_radius: 'Corner Roundness',
      show_border: 'Show Border',
      show_texture: 'Show Paper Texture',
    };
    return labels[schema.name] || schema.name;
  };

  private _valueChanged = (ev: CustomEvent): void => {
    const config = { ...this._config, ...ev.detail.value };
    fireEvent(this, 'config-changed', { config });
  };

  private _addEntity(ev: CustomEvent) {
    const entity = (ev.detail as any).value;
    if (!entity) return;
    const entities = [...(this._config?.entities || [])];
    if (!entities.includes(entity)) {
      entities.push(entity);
      const config = { ...this._config, entities };
      fireEvent(this, 'config-changed', { config });
    }
  }

  private _removeEntity(index: number) {
    const entities = [...(this._config?.entities || [])];
    entities.splice(index, 1);
    const config = { ...this._config, entities };
    fireEvent(this, 'config-changed', { config });
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const entities: string[] = this._config.entities || [];

    return html`
      <div class="add-entity">
        <ha-entity-picker
          .hass=${this.hass}
          @value-changed=${this._addEntity}
          .label=${'Add entity to track'}
          allow-custom-entity
        ></ha-entity-picker>
      </div>

      ${entities.length
        ? html`
            <div class="entity-list">
              ${entities.map((e: string, i: number) => html`
                <div class="entity-row">
                  <ha-icon icon="mdi:drag" style="opacity:0.3;--mdc-icon-size:16px"></ha-icon>
                  <span>${e}</span>
                  <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeEntity(i)}></ha-icon>
                </div>
              `)}
            </div>
          `
        : html`<p style="font-size:13px;color:var(--secondary-text-color);padding:4px 0;">No entities — will show full logbook</p>`}

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[
          { name: 'name', selector: { text: {} } },
          { name: 'hours_to_show', selector: { number: { min: 1, max: 48, step: 1, mode: 'slider' } } },
          { name: 'max_entries', selector: { number: { min: 1, max: 30, step: 1, mode: 'slider' } } },
          ...appearanceSchema(),
        ]}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

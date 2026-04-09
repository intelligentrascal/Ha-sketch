import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-sub-button-card-editor')
export class SketchSubButtonCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_state: true, show_icon: true, columns: 3, collapsible: true };
  }
  protected get _schema() {
    return [
      ...entitySchema(),
      { name: 'columns', selector: { number: { min: 1, max: 6, mode: 'box' } } },
      { name: 'collapsible', selector: { boolean: {} } },
    ];
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;
    return html`
      ${super.render()}
      <p class="editor-note">
        Configure sub_buttons in YAML mode (code editor).
      </p>
    `;
  }
}

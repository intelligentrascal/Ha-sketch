import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-sub-button-card-editor')
export class SketchSubButtonCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      ...entitySchema(),
      { name: 'columns', selector: { number: { min: 1, max: 6, mode: 'box' } } },
      { name: 'collapsible', selector: { boolean: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return nothing;
    return html`
      ${super.render()}
      <p class="editor-note">
        Configure sub_buttons in YAML mode (code editor).
      </p>
    `;
  }
}

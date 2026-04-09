import { customElement } from 'lit/decorators.js';
import { html, nothing } from 'lit';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-popup-card-editor')
export class SketchPopupCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      { name: 'hash', selector: { text: {} } },
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'name', selector: { text: {} } },
          { name: 'icon', selector: { icon: {} } },
        ],
      },
      { name: 'auto_close', selector: { number: { min: 0, max: 300, mode: 'box' } } },
      { name: 'width', selector: { text: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return nothing;
    return html`
      ${super.render()}
      <p class="editor-note">
        Configure child cards in YAML mode (code editor).
      </p>
    `;
  }
}

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-popup-card-editor')
export class SketchPopupCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderTextField('Hash (required, e.g. kitchen)', 'hash')}
      ${this.renderTextField('Title (optional)', 'name')}
      ${this.renderIconPicker('Icon (optional)')}
      ${this.renderNumber('Auto-close (seconds, 0 = off)', 'auto_close', 0, 300)}
      ${this.renderTextField('Width (e.g. 90%, 500px)', 'width')}
      <div class="editor-section-title">Child Cards</div>
      <p style="font-size:13px;color:var(--secondary-text-color)">
        Configure child cards in YAML mode. Switch to the code editor to add cards.
      </p>
    `;
  }
}

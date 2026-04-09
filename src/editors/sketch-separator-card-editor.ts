import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-separator-card-editor')
export class SketchSeparatorCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderTextField('Label (optional)', 'name')}
      ${this.renderIconPicker('Icon (optional)')}
    `;
  }
}

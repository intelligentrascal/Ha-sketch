import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-camera-card-editor')
export class SketchCameraCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderBaseFields('camera')}
      <div class="editor-section-title">Camera Options</div>
      ${this.renderSwitch('Show Controls', 'show_controls')}
      ${this.renderTextField('Aspect Ratio (e.g. 16:9)', 'aspect_ratio')}
    `;
  }
}

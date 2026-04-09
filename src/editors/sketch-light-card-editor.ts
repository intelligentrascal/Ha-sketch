import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-light-card-editor')
export class SketchLightCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderBaseFields('light')}
      <div class="editor-section-title">Light Options</div>
      ${this.renderSwitch('Show Brightness Slider', 'show_brightness')}
      ${this.renderSwitch('Show Color Temperature', 'show_color_temp')}
    `;
  }
}

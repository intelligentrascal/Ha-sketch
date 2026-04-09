import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-cover-card-editor')
export class SketchCoverCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderBaseFields('cover')}
      <div class="editor-section-title">Cover Options</div>
      ${this.renderSwitch('Show Position Slider', 'show_position')}
      ${this.renderSwitch('Show Tilt Slider', 'show_tilt')}
    `;
  }
}

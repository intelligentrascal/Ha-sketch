import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-sensor-card-editor')
export class SketchSensorCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderBaseFields('sensor')}
      <div class="editor-section-title">Sensor Options</div>
      ${this.renderSwitch('Show Graph', 'graph')}
    `;
  }
}

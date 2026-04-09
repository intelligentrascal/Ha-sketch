import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-thermostat-card-editor')
export class SketchThermostatCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderBaseFields('climate')}
      <div class="editor-section-title">Thermostat Options</div>
      ${this.renderSwitch('Show Current Temp as Primary', 'show_current_as_primary', false)}
    `;
  }
}

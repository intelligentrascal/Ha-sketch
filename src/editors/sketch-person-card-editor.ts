import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-person-card-editor')
export class SketchPersonCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderBaseFields('person')}
      <div class="editor-section-title">Person Options</div>
      ${this.renderSwitch('Show Location', 'show_location')}
      ${this.renderSwitch('Show Battery', 'show_battery')}
      ${this.renderEntityPicker('Battery Entity (optional)', 'battery_entity', 'sensor')}
    `;
  }
}

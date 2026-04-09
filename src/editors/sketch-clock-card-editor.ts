import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-clock-card-editor')
export class SketchClockCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderTextField('Name (optional)', 'name')}
      ${this.renderSelect('Display Mode', 'mode', [
        { value: 'both', label: 'Analog + Digital' },
        { value: 'analog', label: 'Analog Only' },
        { value: 'digital', label: 'Digital Only' },
      ], 'both')}
      ${this.renderSwitch('Show Date', 'show_date')}
      ${this.renderSwitch('Show Seconds', 'show_seconds')}
    `;
  }
}

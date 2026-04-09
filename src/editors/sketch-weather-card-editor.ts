import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-weather-card-editor')
export class SketchWeatherCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderBaseFields('weather')}
      <div class="editor-section-title">Weather Options</div>
      ${this.renderSwitch('Show Forecast', 'show_forecast')}
      ${this.renderNumber('Number of Forecast Days', 'num_forecasts', 1, 7, 5)}
    `;
  }
}

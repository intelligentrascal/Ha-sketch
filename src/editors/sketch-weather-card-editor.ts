import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-weather-card-editor')
export class SketchWeatherCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      ...entitySchema('weather'),
      { name: 'show_forecast', selector: { boolean: {} } },
      { name: 'num_forecasts', selector: { number: { min: 1, max: 7, mode: 'box' } } },
    ];
  }
}

import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-thermostat-card-editor')
export class SketchThermostatCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      ...entitySchema('climate'),
      { name: 'show_current_as_primary', selector: { boolean: {} } },
    ];
  }
}

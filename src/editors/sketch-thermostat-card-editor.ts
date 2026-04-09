import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-thermostat-card-editor')
export class SketchThermostatCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_state: true, show_icon: true, show_current_as_primary: false };
  }
  protected get _schema() {
    return [
      ...entitySchema('climate'),
      { name: 'show_current_as_primary', selector: { boolean: {} } },
    ];
  }
}

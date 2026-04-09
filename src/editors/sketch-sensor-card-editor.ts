import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-sensor-card-editor')
export class SketchSensorCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      ...entitySchema('sensor'),
      { name: 'graph', selector: { boolean: {} } },
    ];
  }
}

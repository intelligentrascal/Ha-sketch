import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-person-card-editor')
export class SketchPersonCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      ...entitySchema('person'),
      { name: 'show_location', selector: { boolean: {} } },
      { name: 'show_battery', selector: { boolean: {} } },
      { name: 'battery_entity', selector: { entity: { domain: 'sensor' } } },
    ];
  }
}

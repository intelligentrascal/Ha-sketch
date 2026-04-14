import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, appearanceSchema } from './base-editor';

@customElement('sketch-tog-card-editor')
export class SketchTogCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return {};
  }
  protected get _schema() {
    return [
      { name: 'name', selector: { text: {} } },
      { name: 'temperature_entity', selector: { entity: { domain: 'sensor' } } },
      { name: 'room_select_entity', selector: { entity: { domain: 'input_select' } } },
      ...appearanceSchema(),
    ];
  }
}

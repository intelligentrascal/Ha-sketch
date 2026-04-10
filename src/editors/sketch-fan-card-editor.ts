import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-fan-card-editor')
export class SketchFanCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_state: true, show_icon: true, show_speed: true };
  }
  protected get _schema() {
    return [
      ...entitySchema('fan'),
      { name: 'show_speed', selector: { boolean: {} } },
    ];
  }
}

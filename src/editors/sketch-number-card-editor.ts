import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-number-card-editor')
export class SketchNumberCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_state: true, show_icon: true, show_slider: true };
  }
  protected get _schema() {
    return [
      ...entitySchema(),
      { name: 'show_slider', selector: { boolean: {} } },
    ];
  }
}

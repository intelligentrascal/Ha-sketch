import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-progress-card-editor')
export class SketchProgressCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_icon: true, max: 100 };
  }
  protected get _schema() {
    return [
      ...entitySchema('sensor'),
      {
        name: 'max',
        selector: { number: { min: 1, max: 1000000, step: 1, mode: 'box' } },
      },
    ];
  }
}

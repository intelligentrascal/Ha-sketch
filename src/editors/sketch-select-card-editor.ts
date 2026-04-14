import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-select-card-editor')
export class SketchSelectCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_icon: true };
  }
  protected get _schema() {
    return [...entitySchema('input_select')];
  }
}

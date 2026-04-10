import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-lock-card-editor')
export class SketchLockCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_state: true, show_icon: true };
  }
  protected get _schema() {
    return [...entitySchema('lock')];
  }
}

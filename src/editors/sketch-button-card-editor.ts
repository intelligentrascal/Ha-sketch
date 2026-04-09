import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-button-card-editor')
export class SketchButtonCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [...entitySchema()];
  }
}

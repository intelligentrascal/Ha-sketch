import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-entity-card-editor')
export class SketchEntityCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [...entitySchema()];
  }
}

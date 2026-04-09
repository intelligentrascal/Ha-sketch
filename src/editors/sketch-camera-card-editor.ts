import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-camera-card-editor')
export class SketchCameraCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      ...entitySchema('camera'),
      { name: 'show_controls', selector: { boolean: {} } },
      { name: 'aspect_ratio', selector: { text: {} } },
    ];
  }
}

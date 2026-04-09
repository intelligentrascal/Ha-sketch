import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-cover-card-editor')
export class SketchCoverCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      ...entitySchema('cover'),
      { name: 'show_position', selector: { boolean: {} } },
      { name: 'show_tilt', selector: { boolean: {} } },
    ];
  }
}

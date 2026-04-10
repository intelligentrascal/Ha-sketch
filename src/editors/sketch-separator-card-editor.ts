import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, appearanceSchema } from './base-editor';

@customElement('sketch-separator-card-editor')
export class SketchSeparatorCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      { name: 'name', selector: { text: {} } },
      { name: 'icon', selector: { icon: {} } },
      ...appearanceSchema(),
    ];
  }
}

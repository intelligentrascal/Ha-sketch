import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-light-card-editor')
export class SketchLightCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      ...entitySchema('light'),
      { name: 'show_brightness', selector: { boolean: {} } },
      { name: 'show_color_temp', selector: { boolean: {} } },
    ];
  }
}

import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-light-card-editor')
export class SketchLightCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_state: true, show_icon: true, show_brightness: true, show_color_temp: true };
  }
  protected get _schema() {
    return [
      ...entitySchema('light'),
      { name: 'show_brightness', selector: { boolean: {} } },
      { name: 'show_color_temp', selector: { boolean: {} } },
    ];
  }
}

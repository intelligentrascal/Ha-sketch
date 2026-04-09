import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-tile-card-editor')
export class SketchTileCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_state: true, show_icon: true, hide_icon: false };
  }
  protected get _schema() {
    return [
      ...entitySchema(),
      { name: 'hide_icon', selector: { boolean: {} } },
    ];
  }
}

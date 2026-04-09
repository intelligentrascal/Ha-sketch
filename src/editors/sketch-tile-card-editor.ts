import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-tile-card-editor')
export class SketchTileCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      ...entitySchema(),
      { name: 'hide_icon', selector: { boolean: {} } },
    ];
  }
}

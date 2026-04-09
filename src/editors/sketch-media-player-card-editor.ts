import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-media-player-card-editor')
export class SketchMediaPlayerCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_state: true, show_icon: true, show_artwork: true, show_source: true };
  }
  protected get _schema() {
    return [
      ...entitySchema('media_player'),
      { name: 'show_artwork', selector: { boolean: {} } },
      { name: 'show_source', selector: { boolean: {} } },
    ];
  }
}

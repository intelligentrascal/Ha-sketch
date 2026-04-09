import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-media-player-card-editor')
export class SketchMediaPlayerCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderBaseFields('media_player')}
      <div class="editor-section-title">Media Player Options</div>
      ${this.renderSwitch('Show Artwork', 'show_artwork')}
      ${this.renderSwitch('Show Source', 'show_source')}
    `;
  }
}

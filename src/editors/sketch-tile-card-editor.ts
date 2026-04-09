import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-tile-card-editor')
export class SketchTileCardEditor extends BaseSketchEditor {
  render() {
    return html`
      ${this.renderBaseFields()}
      ${this.renderSwitch('Hide Icon', 'hide_icon', false)}
    `;
  }
}

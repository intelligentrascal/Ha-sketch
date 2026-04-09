import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-button-card-editor')
export class SketchButtonCardEditor extends BaseSketchEditor {
  render() {
    return html`${this.renderBaseFields()}`;
  }
}

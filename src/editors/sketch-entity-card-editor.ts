import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

@customElement('sketch-entity-card-editor')
export class SketchEntityCardEditor extends BaseSketchEditor {
  render() {
    return html`${this.renderBaseFields()}`;
  }
}

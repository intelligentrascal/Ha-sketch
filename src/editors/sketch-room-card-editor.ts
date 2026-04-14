import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-room-card-editor')
export class SketchRoomCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_name: true, show_state: true, show_icon: true };
  }
  protected get _schema() {
    return [...entitySchema('binary_sensor')];
  }
}

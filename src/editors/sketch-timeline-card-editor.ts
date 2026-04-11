import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, appearanceSchema } from './base-editor';

@customElement('sketch-timeline-card-editor')
export class SketchTimelineCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { hours_to_show: 4, max_entries: 8 };
  }
  protected get _schema() {
    return [
      { name: 'name', selector: { text: {} } },
      {
        name: 'hours_to_show',
        selector: { number: { min: 1, max: 48, step: 1, mode: 'slider' } },
      },
      {
        name: 'max_entries',
        selector: { number: { min: 1, max: 20, step: 1, mode: 'slider' } },
      },
      ...appearanceSchema(),
    ];
  }
}

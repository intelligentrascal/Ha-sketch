import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, appearanceSchema } from './base-editor';

@customElement('sketch-history-graph-card-editor')
export class SketchHistoryGraphCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { hours_to_show: 24, show_labels: true, line_width: 2, fill: 'fade' };
  }
  protected get _schema() {
    return [
      { name: 'name', selector: { text: {} } },
      {
        name: 'hours_to_show',
        selector: { number: { min: 1, max: 168, step: 1, mode: 'slider' } },
      },
      {
        name: 'line_width',
        selector: { number: { min: 1, max: 5, step: 0.5, mode: 'slider' } },
      },
      {
        name: 'fill',
        selector: {
          select: {
            options: [
              { value: 'fade', label: 'Fade' },
              { value: 'solid', label: 'Solid' },
              { value: 'none', label: 'None' },
            ],
            mode: 'dropdown',
          },
        },
      },
      { name: 'show_labels', selector: { boolean: {} } },
      ...appearanceSchema(),
    ];
  }
}

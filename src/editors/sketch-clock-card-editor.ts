import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, appearanceSchema } from './base-editor';

@customElement('sketch-clock-card-editor')
export class SketchClockCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { mode: 'both', show_date: true, show_seconds: true };
  }
  protected get _schema() {
    return [
      { name: 'name', selector: { text: {} } },
      {
        name: 'mode',
        selector: {
          select: {
            options: [
              { value: 'both', label: 'Analog + Digital' },
              { value: 'analog', label: 'Analog Only' },
              { value: 'digital', label: 'Digital Only' },
            ],
            mode: 'dropdown',
          },
        },
      },
      { name: 'show_date', selector: { boolean: {} } },
      { name: 'show_seconds', selector: { boolean: {} } },
      ...appearanceSchema(),
    ];
  }
}

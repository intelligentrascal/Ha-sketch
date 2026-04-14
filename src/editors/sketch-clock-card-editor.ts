import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, appearanceSchema } from './base-editor';

@customElement('sketch-clock-card-editor')
export class SketchClockCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { mode: 'both', show_date: true, show_seconds: true, time_format: '12h' };
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
      {
        name: 'time_format',
        selector: {
          select: {
            options: [
              { value: '12h', label: '12-hour (AM/PM)' },
              { value: '24h', label: '24-hour' },
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

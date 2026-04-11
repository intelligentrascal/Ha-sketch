import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, appearanceSchema } from './base-editor';

@customElement('sketch-template-card-editor')
export class SketchTemplateCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_icon: true, multiline_secondary: false, layout: 'horizontal' };
  }
  protected get _schema() {
    return [
      { name: 'entity', selector: { entity: {} } },
      { name: 'primary', selector: { template: {} } },
      { name: 'secondary', selector: { template: {} } },
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'icon', selector: { icon: {} } },
          { name: 'icon_color', selector: { text: {} } },
        ],
      },
      {
        name: 'layout',
        selector: {
          select: {
            options: [
              { value: 'horizontal', label: 'Horizontal' },
              { value: 'vertical', label: 'Vertical' },
            ],
            mode: 'dropdown',
          },
        },
      },
      { name: 'show_icon', selector: { boolean: {} } },
      { name: 'multiline_secondary', selector: { boolean: {} } },
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'badge_icon', selector: { icon: {} } },
          { name: 'badge_color', selector: { text: {} } },
        ],
      },
      ...appearanceSchema(),
    ];
  }
}

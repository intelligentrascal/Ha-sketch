import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, appearanceSchema } from './base-editor';

@customElement('sketch-plant-card-editor')
export class SketchPlantCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_species: true, show_gauges: true };
  }
  protected get _schema() {
    return [
      { name: 'entity', selector: { entity: { domain: 'plant' } } },
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'name', selector: { text: {} } },
          { name: 'icon', selector: { icon: {} }, context: { icon_entity: 'entity' } },
        ],
      },
      {
        name: 'plant_type',
        selector: {
          select: {
            options: [
              { value: 'snake_plant', label: 'Snake Plant (Sansevieria)' },
              { value: 'zz_plant', label: 'ZZ Plant (Zamioculcas)' },
              { value: 'rubber_plant', label: 'Rubber Plant (Ficus)' },
              { value: 'cactus', label: 'Cactus' },
              { value: 'pothos', label: 'Pothos / Trailing' },
            ],
            mode: 'dropdown',
          },
        },
      },
      { name: 'show_species', selector: { boolean: {} } },
      { name: 'show_gauges', selector: { boolean: {} } },
      ...appearanceSchema(),
    ];
  }
}

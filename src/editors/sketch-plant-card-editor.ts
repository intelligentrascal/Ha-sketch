import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, appearanceSchema } from './base-editor';

@customElement('sketch-plant-card-editor')
export class SketchPlantCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { show_species: true, show_gauges: true, show_name: true, show_icon: true };
  }
  protected get _schema() {
    return [
      { name: 'entity', selector: { entity: { domain: 'plant' } } },
      { name: 'name', selector: { text: {} } },
      {
        name: 'plant_type',
        selector: {
          select: {
            options: [
              { value: 'snake_plant', label: 'Snake Plant (Sansevieria)' },
              { value: 'zz_plant', label: 'ZZ Plant (Zamioculcas)' },
              { value: 'rubber_plant', label: 'Rubber Plant (Ficus elastica)' },
              { value: 'cactus', label: 'Cactus (coming soon)' },
              { value: 'pothos', label: 'Pothos / Trailing (coming soon)' },
            ],
            mode: 'dropdown',
          },
        },
      },
      {
        name: 'sensors',
        selector: {
          select: {
            multiple: true,
            options: [
              { value: 'moisture', label: 'Soil Moisture' },
              { value: 'temperature', label: 'Temperature' },
              { value: 'illuminance', label: 'Light (Illuminance)' },
              { value: 'conductivity', label: 'Soil Conductivity' },
              { value: 'humidity', label: 'Air Humidity' },
            ],
            mode: 'list',
          },
        },
      },
      { name: 'show_species', selector: { boolean: {} } },
      { name: 'show_gauges', selector: { boolean: {} } },
      ...appearanceSchema(),
    ];
  }
}

import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, appearanceSchema } from './base-editor';

@customElement('sketch-step-battle-card-editor')
export class SketchStepBattleCardEditor extends BaseSketchEditor {
  protected get _defaults() {
    return { goal: 10000 };
  }
  protected get _schema() {
    return [
      { name: 'name', selector: { text: {} } },
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'player1_name', selector: { text: {} } },
          { name: 'player1_entity', selector: { entity: { domain: 'sensor' } } },
        ],
      },
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'player2_name', selector: { text: {} } },
          { name: 'player2_entity', selector: { entity: { domain: 'sensor' } } },
        ],
      },
      {
        name: 'goal',
        selector: { number: { min: 1000, max: 100000, step: 1000, mode: 'box' } },
      },
      ...appearanceSchema(),
    ];
  }
}

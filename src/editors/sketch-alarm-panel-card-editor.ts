import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor, entitySchema } from './base-editor';

@customElement('sketch-alarm-panel-card-editor')
export class SketchAlarmPanelCardEditor extends BaseSketchEditor {
  protected get _schema() {
    return [
      ...entitySchema('alarm_control_panel'),
      {
        name: 'states',
        selector: {
          select: {
            multiple: true,
            options: [
              { value: 'arm_home', label: 'Arm Home' },
              { value: 'arm_away', label: 'Arm Away' },
              { value: 'arm_night', label: 'Arm Night' },
              { value: 'arm_custom_bypass', label: 'Arm Custom' },
            ],
          },
        },
      },
    ];
  }
}

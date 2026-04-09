import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchEditor } from './base-editor';

const ALARM_STATES = [
  { value: 'arm_home', label: 'Arm Home' },
  { value: 'arm_away', label: 'Arm Away' },
  { value: 'arm_night', label: 'Arm Night' },
  { value: 'arm_custom_bypass', label: 'Arm Custom' },
];

@customElement('sketch-alarm-panel-card-editor')
export class SketchAlarmPanelCardEditor extends BaseSketchEditor {
  static styles = [
    ...BaseSketchEditor.styles,
    css`
      .states-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px 16px;
      }
    `,
  ];

  private _toggleState(stateVal: string, checked: boolean) {
    const current = this._config.states || ['arm_home', 'arm_away', 'arm_night'];
    const newStates = checked
      ? [...current, stateVal]
      : current.filter((s: string) => s !== stateVal);
    this._valueChanged('states', newStates);
  }

  render() {
    const states = this._config.states || ['arm_home', 'arm_away', 'arm_night'];
    return html`
      ${this.renderBaseFields('alarm_control_panel')}
      <div class="editor-section-title">Alarm States</div>
      <div class="states-grid">
        ${ALARM_STATES.map(
          (s) => html`
            <div class="switch-row">
              <label>${s.label}</label>
              <ha-switch
                .checked=${states.includes(s.value)}
                @change=${(ev: Event) => this._toggleState(s.value, (ev.target as any).checked)}
              ></ha-switch>
            </div>
          `
        )}
      </div>
    `;
  }
}

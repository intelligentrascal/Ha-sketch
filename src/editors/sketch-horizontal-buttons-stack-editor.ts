import { html, nothing, LitElement, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../shared/types';

@customElement('sketch-horizontal-buttons-stack-editor')
export class SketchHorizontalButtonsStackEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config: any = {};

  static styles = css`
    :host { display: block; }
    .editor-note {
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 8px 0;
    }
  `;

  setConfig(config: any) {
    this._config = { ...config };
  }

  render() {
    return html`
      <p class="editor-note">
        The Horizontal Buttons Stack requires YAML configuration for its buttons array.
        Switch to the code editor to configure buttons.
      </p>
    `;
  }
}

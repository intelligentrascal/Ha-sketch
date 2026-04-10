import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from './styles';

/**
 * Reusable slider component for light brightness, cover position, media volume, etc.
 * Fires 'value-changed' with { detail: { value: number } } on change.
 */
@customElement('sketch-slider')
export class SketchSlider extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String }) unit = '';
  @property({ type: Boolean }) disabled = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      .slider-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .slider-value {
        font-family: var(--sketch-font);
        font-size: 1em;
        min-width: 40px;
        text-align: right;
        color: var(--sketch-ink-muted);
      }
    `,
  ];

  private _onChange(ev: Event) {
    const val = parseFloat((ev.target as HTMLInputElement).value);
    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { value: val },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      ${this.label ? html`<span class="sketch-label">${this.label}</span>` : ''}
      <div class="slider-row">
        <input
          type="range"
          class="sketch-slider"
          .min=${String(this.min)}
          .max=${String(this.max)}
          .value=${String(this.value)}
          ?disabled=${this.disabled}
          @change=${this._onChange}
        />
        ${this.unit ? html`<span class="slider-value">${this.value}${this.unit}</span>` : ''}
      </div>
    `;
  }
}

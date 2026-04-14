import { html, css, svg, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import { formatState, clamp } from '../shared/utils';
import type { HomeAssistant, ProgressCardConfig } from '../shared/types';
import '../editors/sketch-progress-card-editor';

/* Seeded random for wobble — same function as sketch-svg.ts */
function wobbleRand(seed: number, i: number): number {
  const x = Math.sin(seed * 9301 + i * 49297 + 233280) * 49297;
  return (x - Math.floor(x)) - 0.5;
}

@customElement('sketch-progress-card')
export class SketchProgressCard extends BaseSketchCard {
  static styles = [
    ...super.styles,
    css`
      .progress-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        overflow: hidden;
      }
      .progress-svg {
        width: 140px;
        height: 140px;
      }
      .progress-label {
        font-family: var(--sketch-font);
        font-size: 2em;
        font-weight: 700;
        fill: var(--sketch-ink);
      }
      .progress-sub {
        font-family: var(--sketch-font);
        font-size: 0.65em;
        fill: var(--sketch-ink-muted);
      }
      .progress-name {
        font-family: var(--sketch-font);
        font-size: 1.1em;
        font-weight: 600;
        color: var(--sketch-ink);
        margin-top: 8px;
      }
      .progress-value {
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
        margin-top: 2px;
      }
    `,
  ];

  private get _progressConfig(): ProgressCardConfig {
    return this._config as ProgressCardConfig;
  }

  setConfig(config: ProgressCardConfig): void {
    if (!config.entity) throw new Error('Please define an entity');
    super.setConfig(config as any);
  }

  static getConfigElement() {
    return document.createElement('sketch-progress-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const sensors = Object.keys(hass.states).filter((e) => e.startsWith('sensor.'));
    return { entity: sensors[0] || 'sensor.steps', max: 10000 };
  }

  getCardSize() {
    return 4;
  }

  getLayoutOptions() {
    return { grid_columns: 4, grid_rows: 4 };
  }

  private _getColor(pct: number): string {
    const thresholds = this._progressConfig.color_thresholds;
    if (thresholds?.length) {
      let color = thresholds[0].color;
      for (const t of thresholds) {
        if (pct >= t.value) color = t.color;
      }
      return color;
    }
    if (pct >= 100) return 'var(--sketch-success, #4caf50)';
    if (pct >= 60) return 'var(--sketch-primary, #4a6fa5)';
    return 'var(--sketch-ink-muted)';
  }

  private _renderArc(pct: number, seed: number) {
    const cx = 70, cy = 70, r = 56;
    const trackWidth = 8;
    const arcWidth = 8;
    const angle = clamp(pct / 100, 0, 1) * 360;
    const color = this._getColor(pct);

    // Generate wobbly track circle
    const trackPoints: string[] = [];
    const arcPoints: string[] = [];
    const steps = 72;

    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2 - Math.PI / 2;
      const w = wobbleRand(seed, i) * 1.5;
      const px = cx + (r + w) * Math.cos(a);
      const py = cy + (r + w) * Math.sin(a);
      trackPoints.push(`${px.toFixed(1)},${py.toFixed(1)}`);

      if ((i / steps) * 360 <= angle) {
        const wa = wobbleRand(seed + 100, i) * 2;
        const apx = cx + (r + wa) * Math.cos(a);
        const apy = cy + (r + wa) * Math.sin(a);
        arcPoints.push(`${apx.toFixed(1)},${apy.toFixed(1)}`);
      }
    }

    return svg`
      <polyline
        points="${trackPoints.join(' ')}"
        fill="none"
        stroke="var(--sketch-ink-light)"
        stroke-width="${trackWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.3"
      />
      ${arcPoints.length > 1
        ? svg`<polyline
            points="${arcPoints.join(' ')}"
            fill="none"
            stroke="${color}"
            stroke-width="${arcWidth}"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.8"
          />`
        : nothing}
      <text x="${cx}" y="${cy - 2}" text-anchor="middle" dominant-baseline="middle" class="progress-label">
        ${Math.round(pct)}%
      </text>
      <text x="${cx}" y="${cy + 18}" text-anchor="middle" dominant-baseline="middle" class="progress-sub">
        ${this._progressConfig.max ? `/ ${this._progressConfig.max.toLocaleString()}` : ''}
      </text>
    `;
  }

  render() {
    const entity = this.getEntity();
    if (!entity) {
      return html`<ha-card><div class="sketch-card-content sketch-empty"><ha-icon icon="mdi:chart-arc"></ha-icon><span>Entity not found</span></div></ha-card>`;
    }

    const value = parseFloat(entity.state) || 0;
    const max = this._progressConfig.max || 100;
    const pct = clamp((value / max) * 100, 0, 100);
    const name = this.getName();
    const icon = this._config.icon || 'mdi:chart-arc';

    let seed = 0;
    const id = this._config.entity || '';
    for (let i = 0; i < id.length; i++) {
      seed = ((seed << 5) - seed + id.charCodeAt(i)) | 0;
    }
    seed = Math.abs(seed);

    return html`
      <ha-card>
        ${this.renderSketchBg(400, 200, pct >= 100)}
        <div class="sketch-card-content progress-content"
          role="button" tabindex="0" aria-label="${name}"
          @keydown=${this.handleKeyDown}
          @pointerdown=${this.handlePointerDown}
          @pointerup=${this.handlePointerUp}
          @pointercancel=${this.handlePointerCancel}
        >
          <svg class="progress-svg" viewBox="0 0 140 140">
            ${this._renderArc(pct, seed)}
          </svg>
          <div class="progress-name">${name}</div>
          <div class="progress-value">${value.toLocaleString()} ${entity.attributes.unit_of_measurement || ''}</div>
        </div>
      </ha-card>
    `;
  }
}

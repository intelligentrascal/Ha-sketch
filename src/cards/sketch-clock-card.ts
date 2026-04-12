import { html, css, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { sharedStyles } from '../shared/styles';
import { renderSketchOverlay } from '../shared/sketch-svg';
import { applyAppearance } from '../shared/utils';
import type { HomeAssistant, ClockCardConfig } from '../shared/types';
import '../editors/sketch-clock-card-editor';

/* Seeded random for deterministic wobble */
function wr(seed: number, i: number): number {
  const x = Math.sin(seed * 9301 + i * 49297 + 233280) * 49297;
  return (x - Math.floor(x) - 0.5) * 2;
}

@customElement('sketch-clock-card')
export class SketchClockCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: ClockCardConfig;
  @state() private _time = new Date();
  private _timer?: number;

  static styles = [
    sharedStyles,
    css`
      ha-card {
        rotate: 0deg;
      }
      ha-card:hover {
        transform: none;
        filter: var(--sketch-shadow);
      }
      .clock-content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 16px;
      }
      .clock-name {
        font-family: var(--sketch-font);
        font-size: 1em;
        color: var(--sketch-ink-muted);
        margin-bottom: 8px;
      }
      .analog-clock {
        width: 160px;
        height: 160px;
      }
      .digital-time {
        font-family: var(--sketch-font);
        font-size: 2.4em;
        font-weight: 700;
        line-height: 1;
        margin-top: 8px;
        color: var(--sketch-ink);
      }
      .digital-date {
        font-family: var(--sketch-font);
        font-size: 1em;
        color: var(--sketch-ink-muted);
        margin-top: 4px;
      }
    `,
  ];

  setConfig(config: ClockCardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = { ...config };
  }

  updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    if (changedProps.has('_config')) {
      applyAppearance(this, this._config);
    }
    if (changedProps.has('hass') && this.hass) {
      this.classList.toggle('dark-mode', this.hass.themes?.darkMode ?? false);
    }
  }

  static getConfigElement() {
    return document.createElement('sketch-clock-card-editor');
  }

  static getStubConfig() {
    return { mode: 'both', show_date: true, show_seconds: true, time_format: '12h' };
  }

  getCardSize() {
    return 4;
  }

  getLayoutOptions() {
    return { grid_columns: 4, grid_rows: 4 };
  }

  connectedCallback() {
    super.connectedCallback();
    this._tick();
    this._timer = window.setInterval(() => this._tick(), 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearInterval(this._timer);
  }

  private _tick() {
    this._time = new Date();
  }

  private _renderSketchBg() {
    const cfg = this._config as any;
    return html`${unsafeHTML(renderSketchOverlay(400, 300, {
      showBorder: cfg?.show_border !== false,
      showTexture: cfg?.show_texture !== false,
      variant: cfg?.variant || 'paper',
      cornerRadius: cfg?.corner_radius ?? 14,
      seed: 54321,
    }))}`;
  }

  private _renderAnalog() {
    const h = this._time.getHours() % 12;
    const m = this._time.getMinutes();
    const s = this._time.getSeconds();
    const showSeconds = this._config.show_seconds !== false;
    const cx = 80, cy = 80, r = 65;
    const seed = 777;
    const ink = 'var(--sketch-ink, #2a2a2a)';
    const inkMuted = 'var(--sketch-ink-muted, rgba(42,42,42,0.3))';

    // ── Wobbly clock face circle ──
    const facePoints: string[] = [];
    const steps = 72;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2 - Math.PI / 2;
      const wobble = wr(seed, i) * 1.8;
      const px = cx + (r + wobble) * Math.cos(a);
      const py = cy + (r + wobble) * Math.sin(a);
      facePoints.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }

    // ── Hour marks with varying stroke ──
    const hourMarks: any[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = i * 30;
      const rad = ((angle - 90) * Math.PI) / 180;
      const wobbleR = wr(seed + 100, i) * 1.5;
      const inner = r - 10 + wobbleR;
      const outer = r - 3 + wobbleR;
      const sw = 2 + wr(seed + 200, i) * 0.5; // varying stroke width
      hourMarks.push(svg`<line
        x1=${cx + Math.cos(rad) * inner}
        y1=${cy + Math.sin(rad) * inner}
        x2=${cx + Math.cos(rad) * outer}
        y2=${cy + Math.sin(rad) * outer}
        stroke="${ink}" stroke-width="${sw.toFixed(1)}" stroke-linecap="round"
      />`);
    }

    // ── Minute marks (thinner, subtle) ──
    const minuteMarks: any[] = [];
    for (let i = 0; i < 60; i++) {
      if (i % 5 === 0) continue;
      const rad = ((i * 6 - 90) * Math.PI) / 180;
      const wobbleR = wr(seed + 300, i) * 0.8;
      minuteMarks.push(svg`<line
        x1=${cx + Math.cos(rad) * (r - 4 + wobbleR)}
        y1=${cy + Math.sin(rad) * (r - 4 + wobbleR)}
        x2=${cx + Math.cos(rad) * (r - 2 + wobbleR)}
        y2=${cy + Math.sin(rad) * (r - 2 + wobbleR)}
        stroke="${inkMuted}" stroke-width="0.8" stroke-linecap="round"
      />`);
    }

    // ── Handwriting numbers with slight rotation ──
    const numbers: any[] = [];
    for (let i = 0; i < 12; i++) {
      const num = i === 0 ? 12 : i;
      const rad = ((i * 30 - 90) * Math.PI) / 180;
      const nx = cx + Math.cos(rad) * (r - 20) + wr(seed + 400, i) * 1.5;
      const ny = cy + Math.sin(rad) * (r - 20) + wr(seed + 500, i) * 1.5;
      const rot = wr(seed + 600, i) * 6; // ±6 degree rotation per number
      numbers.push(svg`<text
        x=${nx} y=${ny}
        text-anchor="middle" dominant-baseline="central"
        font-family="var(--sketch-font, Caveat, cursive)"
        font-size="13" font-weight="600"
        fill="${ink}"
        transform="rotate(${rot.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)})"
      >${num}</text>`);
    }

    // ── Wobbly hands (quadratic bezier with displaced midpoint) ──
    const handPath = (angle: number, length: number, sw: number) => {
      const rad = ((angle - 90) * Math.PI) / 180;
      const ex = cx + Math.cos(rad) * length;
      const ey = cy + Math.sin(rad) * length;
      // Midpoint displaced perpendicular to hand direction
      const mx = (cx + ex) / 2 + Math.sin(rad) * wr(seed + 700, Math.round(angle)) * 2.5;
      const my = (cy + ey) / 2 - Math.cos(rad) * wr(seed + 800, Math.round(angle)) * 2.5;
      return svg`<path d="M ${cx} ${cy} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}"
        fill="none" stroke="${ink}" stroke-width="${sw}" stroke-linecap="round"/>`;
    };

    const hourAngle = (h + m / 60) * 30;
    const minuteAngle = (m + s / 60) * 6;
    const secondAngle = s * 6;

    return html`
      <svg class="analog-clock" viewBox="0 0 160 160">
        <!-- Wobbly face -->
        <polyline points="${facePoints.join(' ')}" fill="none"
          stroke="${ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
        <!-- Second wobbly face (overdrawn pencil) -->
        <polyline points="${facePoints.map((p, i) => {
          const [x, y] = p.split(',').map(Number);
          return `${(x + wr(seed + 900, i) * 0.8).toFixed(1)},${(y + wr(seed + 1000, i) * 0.8).toFixed(1)}`;
        }).join(' ')}" fill="none"
          stroke="${ink}" stroke-width="0.8" stroke-linecap="round" opacity="0.25"/>
        ${hourMarks}
        ${minuteMarks}
        ${numbers}
        <!-- Hands -->
        ${handPath(hourAngle, 35, 3.5)}
        ${handPath(minuteAngle, 50, 2.5)}
        ${showSeconds ? svg`
          <line x1=${cx} y1=${cy}
            x2=${cx + Math.cos(((secondAngle - 90) * Math.PI) / 180) * 54}
            y2=${cy + Math.sin(((secondAngle - 90) * Math.PI) / 180) * 54}
            stroke="var(--sketch-danger, #f44336)" stroke-width="1" stroke-linecap="round"/>
        ` : nothing}
        <!-- Center dot -->
        <circle cx=${cx} cy=${cy} r="3.5" fill="${ink}"/>
        <circle cx=${cx} cy=${cy} r="1.5" fill="var(--sketch-card-bg, var(--ha-card-background, #faf7f0))"/>
      </svg>
    `;
  }

  private _renderDigital() {
    const h24 = this._time.getHours();
    const m = this._time.getMinutes();
    const s = this._time.getSeconds();
    const showSeconds = this._config.show_seconds !== false;
    const is12h = (this._config as any).time_format === '12h';
    const pad = (n: number) => String(n).padStart(2, '0');

    let h = h24;
    let suffix = '';
    if (is12h) {
      suffix = h24 >= 12 ? ' PM' : ' AM';
      h = h24 % 12 || 12;
    }

    const timeStr = showSeconds ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}`;

    return html`<div class="digital-time">${timeStr}${is12h ? html`<span style="font-size:0.4em;font-weight:400;color:var(--sketch-ink-muted)">${suffix}</span>` : nothing}</div>`;
  }

  render() {
    const mode = this._config?.mode || 'both';
    const showDate = this._config?.show_date !== false;
    const name = this._config?.name;

    const dateStr = this._time.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return html`
      <ha-card>
        ${this._renderSketchBg()}
        <div class="sketch-card-content clock-content">
          ${name ? html`<div class="clock-name">${name}</div>` : nothing}
          ${mode === 'analog' || mode === 'both' ? this._renderAnalog() : nothing}
          ${mode === 'digital' || mode === 'both' ? this._renderDigital() : nothing}
          ${showDate ? html`<div class="digital-date">${dateStr}</div>` : nothing}
        </div>
      </ha-card>
    `;
  }
}

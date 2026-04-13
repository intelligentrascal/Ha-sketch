import { html, css, svg, nothing, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { sharedStyles } from '../shared/styles';
import { renderSketchOverlay } from '../shared/sketch-svg';
import { applyAppearance, clamp } from '../shared/utils';
import type { HomeAssistant, StepBattleCardConfig } from '../shared/types';
import '../editors/sketch-step-battle-card-editor';

/* Seeded random for deterministic wobble */
function wr(seed: number, i: number): number {
  const x = Math.sin(seed * 9301 + i * 49297 + 233280) * 49297;
  return (x - Math.floor(x) - 0.5) * 2;
}

/* ── Hand-drawn SVG trophy (sketch outline) ── */
function trophySvg(color: string): string {
  return `<svg viewBox="0 0 24 24" width="28" height="28">
    <path d="M 6 3 L 18 3 L 17 10 C 16 14 14 15 12 16 C 10 15 8 14 7 10 Z" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 6 4 C 4 4 3 6 3 8 C 3 10 5 10 6 9" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M 18 4 C 20 4 21 6 21 8 C 21 10 19 10 18 9" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="12" y1="16" x2="12" y2="20" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M 8 20 L 16 20 L 16 21 L 8 21 Z" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

/* ── Hand-drawn wobbly circle for avatar border ── */
function wobblyCircle(cx: number, cy: number, r: number, seed: number, color: string): string {
  const points: string[] = [];
  for (let i = 0; i <= 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const wobble = wr(seed, i) * 1.5;
    points.push(`${(cx + (r + wobble) * Math.cos(a)).toFixed(1)},${(cy + (r + wobble) * Math.sin(a)).toFixed(1)}`);
  }
  return `<polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/* ── Hand-drawn progress bar ── */
function sketchProgressBar(x: number, y: number, w: number, h: number, pct: number, color: string, seed: number): string {
  const s = (sd: number, i: number) => wr(sd, i) * 0.8;
  const fillW = w * clamp(pct / 100, 0, 1);

  // Track (empty)
  let out = `<rect x="${x + s(seed,0)}" y="${y + s(seed,1)}" width="${w}" height="${h}" rx="${h/2}"
    fill="none" stroke="var(--sketch-ink-muted)" stroke-width="1.2" opacity="0.3"/>`;

  // Fill
  if (fillW > 2) {
    out += `<rect x="${x + s(seed,2)}" y="${y + s(seed,3)}" width="${fillW}" height="${h}" rx="${h/2}"
      fill="${color}" opacity="0.7"/>`;
    out += `<rect x="${x + s(seed,4)}" y="${y + s(seed,5)}" width="${fillW}" height="${h}" rx="${h/2}"
      fill="none" stroke="${color}" stroke-width="1" opacity="0.5"/>`;
  }

  return out;
}

@customElement('sketch-step-battle-card')
export class SketchStepBattleCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: StepBattleCardConfig;
  @state() private _history1: number[] = [];
  @state() private _history2: number[] = [];
  private _fetchTimer?: ReturnType<typeof setInterval>;

  static styles = [
    sharedStyles,
    css`
      ha-card { overflow: hidden; }
      .battle-content {
        position: relative;
        z-index: 1;
        padding: clamp(14px, 3vw, 20px);
      }
      .battle-header {
        font-family: var(--sketch-font);
        font-size: 0.7em;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--sketch-ink-muted);
        text-align: center;
        margin-bottom: 12px;
      }
      .vs-section {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
      }
      .player {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        position: relative;
      }
      .player.leader {
        filter: drop-shadow(0 0 8px var(--player-color));
      }
      .player-avatar-wrap {
        position: relative;
        width: 56px;
        height: 56px;
        margin-bottom: 6px;
      }
      .player-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
        position: absolute;
        top: 4px;
        left: 4px;
      }
      .player-avatar-border {
        position: absolute;
        inset: 0;
      }
      .player-trophy {
        position: absolute;
        top: -18px;
        left: 50%;
        transform: translateX(-50%);
        animation: sketch-wiggle 2s ease-in-out infinite;
      }
      @keyframes sketch-wiggle {
        0%, 100% { rotate: -4deg; }
        50% { rotate: 4deg; }
      }
      .player-name {
        font-family: var(--sketch-font);
        font-size: 0.95em;
        font-weight: 600;
        color: var(--sketch-ink);
      }
      .player-steps {
        font-family: var(--sketch-font);
        font-size: 1.8em;
        font-weight: 700;
        line-height: 1;
        margin-top: 2px;
      }
      .player-pct {
        font-family: var(--sketch-font);
        font-size: 0.75em;
        color: var(--sketch-ink-muted);
        margin-top: 2px;
      }
      .vs-divider {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        gap: 2px;
      }
      .vs-text {
        font-family: var(--sketch-font);
        font-size: 1.6em;
        font-weight: 700;
        color: var(--sketch-ink-muted);
        opacity: 0.5;
      }
      .progress-section {
        margin: 8px 0;
      }
      .progress-svg {
        width: 100%;
        height: 36px;
        overflow: visible;
      }
      .lead-text {
        font-family: var(--sketch-font);
        font-size: 0.9em;
        font-style: italic;
        color: var(--sketch-ink-muted);
        text-align: center;
        margin: 8px 0 4px;
      }
      .lead-text .lead-value {
        font-weight: 700;
        font-style: normal;
      }
      .chart-section {
        margin-top: 12px;
        border-top: 1px dashed var(--sketch-ink-light);
        padding-top: 10px;
      }
      .chart-title {
        font-family: var(--sketch-font);
        font-size: 0.75em;
        color: var(--sketch-ink-muted);
        text-align: center;
        margin-bottom: 6px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      .chart-svg {
        width: 100%;
        height: 60px;
        overflow: hidden;
      }
      .chart-labels {
        display: flex;
        justify-content: space-between;
        font-family: var(--sketch-font);
        font-size: 0.6em;
        color: var(--sketch-ink-muted);
        padding: 2px 4px 0;
      }
      .battle-empty {
        text-align: center;
        padding: 20px;
        font-family: var(--sketch-font);
        font-style: italic;
        color: var(--sketch-ink-muted);
      }
    `,
  ];

  setConfig(config: StepBattleCardConfig): void {
    if (!config.player1_entity || !config.player2_entity) {
      throw new Error('Please define player1_entity and player2_entity');
    }
    this._config = { ...config };
  }

  static getConfigElement() {
    return document.createElement('sketch-step-battle-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const sensors = Object.keys(hass.states).filter((e) => e.startsWith('sensor.') && e.includes('step'));
    return {
      player1_name: 'Player 1',
      player1_entity: sensors[0] || 'sensor.steps_1',
      player2_name: 'Player 2',
      player2_entity: sensors[1] || 'sensor.steps_2',
      goal: 10000,
    };
  }

  getCardSize() { return 6; }
  getLayoutOptions() { return { grid_columns: 4, grid_rows: 6 }; }

  connectedCallback() {
    super.connectedCallback();
    this._fetchHistory();
    this._fetchTimer = setInterval(() => this._fetchHistory(), 300000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._fetchTimer) clearInterval(this._fetchTimer);
  }

  updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    if (changedProps.has('_config')) {
      applyAppearance(this, this._config);
      this._fetchHistory();
    }
    if (changedProps.has('hass') && this.hass) {
      this.classList.toggle('dark-mode', this.hass.themes?.darkMode ?? false);
    }
  }

  private async _fetchHistory() {
    if (!this.hass) return;
    const end = new Date();
    const start = new Date(end.getTime() - 7 * 86400000);

    for (const [entity, setter] of [
      [this._config.player1_entity, (d: number[]) => { this._history1 = d; }],
      [this._config.player2_entity, (d: number[]) => { this._history2 = d; }],
    ] as [string, (d: number[]) => void][]) {
      try {
        const result = await this.hass.callWS({
          type: 'recorder/statistics_during_period',
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          statistic_ids: [entity],
          period: 'day',
          types: ['max'],
        });
        const stats = result[entity];
        if (stats?.length) {
          setter(stats.map((s: any) => s.max ?? 0));
        }
      } catch (_e) { /* no history */ }
    }
    this.requestUpdate();
  }

  private _renderSketchBg() {
    const cfg = this._config as any;
    let seed = 0;
    const id = this._config.player1_entity + this._config.player2_entity;
    for (let i = 0; i < id.length; i++) {
      seed = ((seed << 5) - seed + id.charCodeAt(i)) | 0;
    }
    return html`${unsafeHTML(renderSketchOverlay(400, 400, {
      showBorder: cfg?.show_border !== false,
      showTexture: cfg?.show_texture !== false,
      variant: cfg?.variant || 'paper',
      cornerRadius: cfg?.corner_radius ?? 14,
      seed: Math.abs(seed),
    }))}`;
  }

  private _renderChart() {
    if (!this._history1.length && !this._history2.length) return nothing;

    const w = 280, h = 50, pad = 4;
    const all = [...this._history1, ...this._history2].filter((v) => v > 0);
    if (!all.length) return nothing;
    const maxVal = Math.max(...all, 1);
    const p1Color = 'var(--sketch-primary, #4a6fa5)';
    const p2Color = 'var(--sketch-danger, #f44336)';
    const seed = 333;

    const makeLine = (data: number[], color: string, seedOffset: number) => {
      if (!data.length) return '';
      const points = data.map((v, i) => {
        const x = pad + (i / Math.max(data.length - 1, 1)) * (w - pad * 2);
        const y = pad + (1 - v / maxVal) * (h - pad * 2) + wr(seed + seedOffset, i) * 1.5;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      const fillPoints = [...points, `${pad + (w - pad * 2)},${h}`, `${pad},${h}`];
      return `<polyline points="${fillPoints.join(' ')}" fill="${color}" opacity="0.08"/>
        <polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>`;
    };

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay();
    const dayLabels: string[] = [];
    for (let i = 6; i >= 0; i--) {
      dayLabels.push(days[(today - i + 7) % 7]);
    }

    return html`
      <div class="chart-section">
        <div class="chart-title">7-day history</div>
        <svg class="chart-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
          ${unsafeHTML(makeLine(this._history1, p1Color, 0))}
          ${unsafeHTML(makeLine(this._history2, p2Color, 50))}
        </svg>
        <div class="chart-labels">
          ${dayLabels.map((d) => html`<span>${d}</span>`)}
        </div>
      </div>
    `;
  }

  render() {
    if (!this._config) return nothing;

    const p1Entity = this.hass?.states[this._config.player1_entity];
    const p2Entity = this.hass?.states[this._config.player2_entity];

    if (!p1Entity && !p2Entity) {
      return html`<ha-card>${this._renderSketchBg()}<div class="battle-content battle-empty">Configure step sensors to start the battle</div></ha-card>`;
    }

    const p1Steps = parseInt(p1Entity?.state || '0', 10) || 0;
    const p2Steps = parseInt(p2Entity?.state || '0', 10) || 0;
    const goal = this._config.goal || 10000;
    const p1Pct = clamp((p1Steps / goal) * 100, 0, 100);
    const p2Pct = clamp((p2Steps / goal) * 100, 0, 100);
    const p1Name = this._config.player1_name || 'Player 1';
    const p2Name = this._config.player2_name || 'Player 2';
    const p1Leads = p1Steps > p2Steps;
    const p2Leads = p2Steps > p1Steps;
    const tied = p1Steps === p2Steps;
    const lead = Math.abs(p1Steps - p2Steps);
    const p1Color = 'var(--sketch-primary, #4a6fa5)';
    const p2Color = 'var(--sketch-danger, #f44336)';

    const name = this._config.name || 'Step Battle';
    const seed = 555;

    return html`
      <ha-card>
        ${this._renderSketchBg()}
        <div class="battle-content">
          <div class="battle-header">${name}</div>

          <div class="vs-section">
            <!-- Player 1 -->
            <div class="player ${p1Leads ? 'leader' : ''}" style="--player-color: ${p1Color}">
              <div class="player-avatar-wrap">
                ${p1Leads ? html`<div class="player-trophy">${unsafeHTML(trophySvg(p1Color))}</div>` : nothing}
                <svg class="player-avatar-border" viewBox="0 0 56 56">${unsafeHTML(wobblyCircle(28, 28, 24, seed, p1Color))}</svg>
                ${this._config.player1_picture
                  ? html`<img class="player-avatar" src="${this._config.player1_picture}" alt="${p1Name}"/>`
                  : html`<div class="player-avatar" style="background:${p1Color};opacity:0.2;border-radius:50%"></div>`}
              </div>
              <span class="player-name">${p1Name}</span>
              <span class="player-steps" style="color: ${p1Color}">${p1Steps.toLocaleString()}</span>
              <span class="player-pct">${Math.round(p1Pct)}% of goal</span>
            </div>

            <!-- VS -->
            <div class="vs-divider">
              <svg width="2" height="40" viewBox="0 0 2 40">
                ${[0, 4, 8, 12, 16, 20, 24, 28, 32, 36].map((y) =>
                  svg`<line x1="${1 + wr(seed,y)*0.3}" y1="${y}" x2="${1 + wr(seed,y+1)*0.3}" y2="${y+3}" stroke="var(--sketch-ink-muted)" stroke-width="1" opacity="0.3" stroke-linecap="round"/>`
                )}
              </svg>
              <span class="vs-text">VS</span>
              <svg width="2" height="40" viewBox="0 0 2 40">
                ${[0, 4, 8, 12, 16, 20, 24, 28, 32, 36].map((y) =>
                  svg`<line x1="${1 + wr(seed+10,y)*0.3}" y1="${y}" x2="${1 + wr(seed+10,y+1)*0.3}" y2="${y+3}" stroke="var(--sketch-ink-muted)" stroke-width="1" opacity="0.3" stroke-linecap="round"/>`
                )}
              </svg>
            </div>

            <!-- Player 2 -->
            <div class="player ${p2Leads ? 'leader' : ''}" style="--player-color: ${p2Color}">
              <div class="player-avatar-wrap">
                ${p2Leads ? html`<div class="player-trophy">${unsafeHTML(trophySvg(p2Color))}</div>` : nothing}
                <svg class="player-avatar-border" viewBox="0 0 56 56">${unsafeHTML(wobblyCircle(28, 28, 24, seed + 100, p2Color))}</svg>
                ${this._config.player2_picture
                  ? html`<img class="player-avatar" src="${this._config.player2_picture}" alt="${p2Name}"/>`
                  : html`<div class="player-avatar" style="background:${p2Color};opacity:0.2;border-radius:50%"></div>`}
              </div>
              <span class="player-name">${p2Name}</span>
              <span class="player-steps" style="color: ${p2Color}">${p2Steps.toLocaleString()}</span>
              <span class="player-pct">${Math.round(p2Pct)}% of goal</span>
            </div>
          </div>

          <!-- Progress bars -->
          <div class="progress-section">
            <svg class="progress-svg" viewBox="0 0 300 36">
              <text x="2" y="8" font-family="var(--sketch-font)" font-size="7" fill="var(--sketch-ink-muted)">${p1Name}</text>
              ${unsafeHTML(sketchProgressBar(0, 11, 300, 8, p1Pct, p1Color, seed + 200))}
              <text x="2" y="28" font-family="var(--sketch-font)" font-size="7" fill="var(--sketch-ink-muted)">${p2Name}</text>
              ${unsafeHTML(sketchProgressBar(0, 30, 300, 8, p2Pct, p2Color, seed + 300))}
              <!-- Goal line -->
              <line x1="300" y1="9" x2="300" y2="40" stroke="var(--sketch-ink-muted)" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.4"/>
            </svg>
          </div>

          <!-- Lead text -->
          <div class="lead-text">
            ${tied
              ? html`<span>Tied! Keep pushing!</span>`
              : html`<span class="lead-value" style="color: ${p1Leads ? p1Color : p2Color}">${p1Leads ? p1Name : p2Name}</span> leads by <span class="lead-value">${lead.toLocaleString()}</span> steps`}
          </div>

          <!-- Goal info -->
          <div style="text-align:center;font-family:var(--sketch-font);font-size:0.7em;color:var(--sketch-ink-muted);margin-top:2px">
            Goal: ${goal.toLocaleString()} steps
          </div>

          <!-- 7-day chart -->
          ${this._renderChart()}
        </div>
      </ha-card>
    `;
  }
}

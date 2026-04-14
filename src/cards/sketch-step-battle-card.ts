import { html, css, svg, nothing, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
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
  @state() private _historyLoaded = false;
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
        margin-bottom: 8px;
      }
      .vs-section {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 4px;
        margin-bottom: 10px;
      }
      .player {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-top: 24px;
      }
      .player-avatar-wrap {
        position: relative;
        width: 64px;
        height: 64px;
        margin-bottom: 6px;
      }
      .player-avatar {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        object-fit: cover;
        position: absolute;
        top: 6px;
        left: 6px;
        z-index: 2;
      }
      .player-avatar-border {
        position: absolute;
        inset: 0;
        z-index: 1;
      }
      .player-avatar-fallback {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        position: absolute;
        top: 6px;
        left: 6px;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .player-avatar-fallback ha-icon {
        --mdc-icon-size: 24px;
        color: var(--sketch-ink-muted);
      }
      .player-trophy {
        position: absolute;
        top: -28px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 3;
        animation: sketch-wiggle 2.5s ease-in-out infinite;
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
        line-height: 1.1;
        margin-top: 2px;
      }
      .player-pct {
        font-family: var(--sketch-font);
        font-size: 0.7em;
        color: var(--sketch-ink-muted);
        margin-top: 1px;
      }
      .vs-divider {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        padding-top: 36px;
        gap: 2px;
      }
      .vs-text {
        font-family: var(--sketch-font);
        font-size: 1.4em;
        font-weight: 700;
        color: var(--sketch-ink-muted);
        opacity: 0.4;
      }
      /* ── Progress bars ── */
      .progress-section {
        margin: 4px 0;
      }
      .bar-row {
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 4px 0;
      }
      .bar-label {
        font-family: var(--sketch-font);
        font-size: 0.7em;
        color: var(--sketch-ink-muted);
        min-width: 48px;
        text-align: right;
      }
      .bar-track {
        flex: 1;
        height: 10px;
        border-radius: 5px;
        background: var(--sketch-ink-light);
        overflow: hidden;
        position: relative;
      }
      .bar-fill {
        height: 100%;
        border-radius: 5px;
        transition: width 0.5s ease;
      }
      .bar-pct {
        font-family: var(--sketch-font);
        font-size: 0.65em;
        color: var(--sketch-ink-muted);
        min-width: 30px;
      }
      /* ── Lead text ── */
      .lead-text {
        font-family: var(--sketch-font);
        font-size: 0.9em;
        font-style: italic;
        color: var(--sketch-ink-muted);
        text-align: center;
        margin: 6px 0 2px;
      }
      .lead-text .lead-value {
        font-weight: 700;
        font-style: normal;
      }
      .goal-text {
        text-align: center;
        font-family: var(--sketch-font);
        font-size: 0.7em;
        color: var(--sketch-ink-muted);
      }
      /* ── Chart ── */
      .chart-section {
        margin-top: 8px;
        border-top: 1px dashed var(--sketch-ink-light);
        padding-top: 8px;
      }
      .chart-title {
        font-family: var(--sketch-font);
        font-size: 0.7em;
        color: var(--sketch-ink-muted);
        text-align: center;
        margin-bottom: 4px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      .chart-svg {
        width: 100%;
        height: 80px;
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

  getCardSize() { return 7; }
  getLayoutOptions() { return { grid_columns: 4, grid_rows: 7 }; }

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

      // Use hass.callWS with history/history_during_period
      // This is the same API that HA's built-in history-graph card uses
      try {
        const result = await this.hass.callWS({
          type: 'history/history_during_period',
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          entity_ids: [entity],
          minimal_response: true,
          no_attributes: true,
          significant_changes_only: false,
        });

        // Result can be: { "sensor.xxx": [...] } or [...] directly
        let entries: any[] | null = null;
        if (Array.isArray(result)) {
          entries = result[0] || [];
        } else if (result && typeof result === 'object') {
          entries = result[entity] || null;
          if (!entries) {
            const keys = Object.keys(result);
            if (keys.length > 0) entries = result[keys[0]];
          }
        }

        if (entries?.length) {
          const byDay = new Map<string, number>();
          for (const entry of entries) {
            let ts: Date;
            if (typeof entry.lu === 'number') {
              ts = new Date(entry.lu * 1000);
            } else if (entry.last_updated) {
              ts = new Date(entry.last_updated);
            } else if (entry.last_changed) {
              ts = new Date(entry.last_changed);
            } else {
              continue;
            }
            // Zero-padded day key for correct lexicographic sort
            const dayKey = `${ts.getFullYear()}-${String(ts.getMonth() + 1).padStart(2, '0')}-${String(ts.getDate()).padStart(2, '0')}`;
            const val = parseFloat(String(entry.s ?? entry.state ?? '0')) || 0;
            if (val > 0) {
              byDay.set(dayKey, Math.max(byDay.get(dayKey) || 0, val));
            }
          }
          if (byDay.size > 0) {
            const sorted = Array.from(byDay.entries())
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([_, v]) => v)
              .slice(-7);
            setter(sorted);
            continue;
          }
        }
      } catch (_e) {
        console.warn('Ha-sketch: history/history_during_period failed for', entity, _e);
      }

      // Fallback: recorder/statistics_during_period
      try {
        const result = await this.hass.callWS({
          type: 'recorder/statistics_during_period',
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          statistic_ids: [entity],
          period: 'day',
          types: ['max', 'sum', 'state', 'mean'],
        });
        const stats = result?.[entity];
        if (stats?.length) {
          setter(stats.map((s: any) => s.max ?? s.sum ?? s.state ?? s.mean ?? 0));
        }
      } catch (_e) {
        console.warn('Ha-sketch: statistics failed for', entity, _e);
      }
    }
    this._historyLoaded = true;
    this.requestUpdate();
  }

  private _getPlayerPicture(personEntityId?: string, picOverride?: string, name?: string): string {
    if (picOverride) return picOverride;
    // Direct person entity lookup (most reliable)
    if (personEntityId && this.hass?.states[personEntityId]) {
      return this.hass.states[personEntityId].attributes?.entity_picture || '';
    }
    // Fallback: search by name
    if (!name || !this.hass) return '';
    const lowerName = name.toLowerCase();
    for (const [id, entity] of Object.entries(this.hass.states)) {
      if (id.startsWith('person.') && entity.attributes?.entity_picture) {
        const friendlyName = (entity.attributes.friendly_name || '').toLowerCase();
        if (friendlyName.includes(lowerName) || id.includes(lowerName)) {
          return entity.attributes.entity_picture;
        }
      }
    }
    return '';
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
    const w = 280, h = 60, pad = 4;
    const all = [...this._history1, ...this._history2].filter((v) => v > 0);

    if (!all.length) {
      return html`
        <div class="chart-section">
          <div class="chart-title">7-day history</div>
          <div style="text-align:center;font-family:var(--sketch-font);font-size:0.8em;color:var(--sketch-ink-muted);font-style:italic;padding:12px 0">
            ${this._historyLoaded ? 'No history data available' : 'Loading history...'}
          </div>
        </div>
      `;
    }
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
          ${unsafeSVG(makeLine(this._history1, p1Color, 0))}
          ${unsafeSVG(makeLine(this._history2, p2Color, 50))}
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

    // Auto-detect avatar from person entities or config
    const p1Pic = this._getPlayerPicture((this._config as any).player1_person, this._config.player1_picture, p1Name);
    const p2Pic = this._getPlayerPicture((this._config as any).player2_person, this._config.player2_picture, p2Name);

    const name = this._config.name || 'Step Battle';
    const seed = 555;

    return html`
      <ha-card>
        ${this._renderSketchBg()}
        <div class="battle-content">
          <div class="battle-header">${name}</div>

          <div class="vs-section">
            <!-- Player 1 -->
            <div class="player">
              <div class="player-avatar-wrap">
                ${p1Leads ? html`<div class="player-trophy">${unsafeHTML(trophySvg(p1Color))}</div>` : nothing}
                <svg class="player-avatar-border" viewBox="0 0 64 64">${unsafeHTML(wobblyCircle(32, 32, 28, seed, p1Color))}</svg>
                ${p1Pic
                  ? html`<img class="player-avatar" src="${p1Pic}" alt="${p1Name}"/>`
                  : html`<div class="player-avatar-fallback" style="background:${p1Color};opacity:0.15"><ha-icon icon="mdi:account"></ha-icon></div>`}
              </div>
              <span class="player-name">${p1Name}</span>
              <span class="player-steps" style="color: ${p1Color}">${p1Steps.toLocaleString()}</span>
              <span class="player-pct">${Math.round(p1Pct)}%</span>
            </div>

            <!-- VS -->
            <div class="vs-divider">
              <span class="vs-text">VS</span>
            </div>

            <!-- Player 2 -->
            <div class="player">
              <div class="player-avatar-wrap">
                ${p2Leads ? html`<div class="player-trophy">${unsafeHTML(trophySvg(p2Color))}</div>` : nothing}
                <svg class="player-avatar-border" viewBox="0 0 64 64">${unsafeHTML(wobblyCircle(32, 32, 28, seed + 100, p2Color))}</svg>
                ${p2Pic
                  ? html`<img class="player-avatar" src="${p2Pic}" alt="${p2Name}"/>`
                  : html`<div class="player-avatar-fallback" style="background:${p2Color};opacity:0.15"><ha-icon icon="mdi:account"></ha-icon></div>`}
              </div>
              <span class="player-name">${p2Name}</span>
              <span class="player-steps" style="color: ${p2Color}">${p2Steps.toLocaleString()}</span>
              <span class="player-pct">${Math.round(p2Pct)}%</span>
            </div>
          </div>

          <!-- Progress bars (CSS, not SVG) -->
          <div class="progress-section">
            <div class="bar-row">
              <span class="bar-label">${p1Name}</span>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${p1Pct}%; background: ${p1Color}; opacity: 0.7"></div>
              </div>
              <span class="bar-pct">${Math.round(p1Pct)}%</span>
            </div>
            <div class="bar-row">
              <span class="bar-label">${p2Name}</span>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${p2Pct}%; background: ${p2Color}; opacity: 0.7"></div>
              </div>
              <span class="bar-pct">${Math.round(p2Pct)}%</span>
            </div>
          </div>

          <!-- Lead text -->
          <div class="lead-text">
            ${tied
              ? html`<span>Tied! Keep pushing!</span>`
              : html`<span class="lead-value" style="color: ${p1Leads ? p1Color : p2Color}">${p1Leads ? p1Name : p2Name}</span> leads by <span class="lead-value">${lead.toLocaleString()}</span> steps`}
          </div>
          <div class="goal-text">Goal: ${goal.toLocaleString()} steps</div>

          <!-- 7-day chart -->
          ${this._renderChart()}
        </div>
      </ha-card>
    `;
  }
}

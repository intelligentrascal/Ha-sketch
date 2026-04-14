import { html, css, svg, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { BaseSketchCard } from '../shared/base-card';
import { clamp } from '../shared/utils';
import type { HomeAssistant, TogCardConfig } from '../shared/types';
import '../editors/sketch-tog-card-editor';

/* ── TOG recommendation data ── */
interface TogRec {
  tog: string;
  bucket: string;
  headline: string;
  risk: string;
  clothing: string[];
  color: string;
}

function getTogRecommendation(temp: number): TogRec {
  if (temp >= 27) return { tog: '0.2', bucket: 'very_light', headline: 'Very Light', risk: 'hot', clothing: ['Nappy only', 'Skip sleep bag'], color: 'var(--sketch-danger, #f44336)' };
  if (temp >= 24) return { tog: '0.5', bucket: 'light', headline: 'Light Layers', risk: 'warm', clothing: ['Short-sleeve bodysuit', '0.5 TOG sleep bag'], color: '#fb923c' };
  if (temp >= 22) return { tog: '1.0', bucket: 'balanced', headline: 'Balanced', risk: 'comfortable', clothing: ['Long-sleeve bodysuit', '1.0 TOG sleep bag'], color: 'var(--sketch-success, #4caf50)' };
  if (temp >= 20) return { tog: '1.0–2.5', bucket: 'transitional', headline: 'Comfortable', risk: 'comfortable', clothing: ['Long-sleeve bodysuit', 'Sleepsuit or singlet', '1.0 or 2.5 TOG sleep bag'], color: 'var(--sketch-success, #4caf50)' };
  if (temp >= 17) return { tog: '2.5', bucket: 'warm', headline: 'Warm Layers', risk: 'cool', clothing: ['Long-sleeve bodysuit', 'Warm sleepsuit', '2.5 TOG sleep bag'], color: '#38bdf8' };
  return { tog: '3.5', bucket: 'extra_warm', headline: 'Extra Warm', risk: 'cold', clothing: ['Thermal bodysuit', 'Warm sleepsuit', '3.5 TOG sleep bag'], color: '#818cf8' };
}

/* ── Inline SVG clothing illustrations ── */
/* Each item has a completely different silhouette so they're
   instantly distinguishable even at small sizes. */
function clothingSvg(item: string, seed: number): string {
  const w = (s: number, i: number) => (Math.sin(s * 9301 + i * 49297) * 49297 % 1 - 0.5) * 0.8;
  const ink = 'var(--sketch-ink, #2a2a2a)';
  const s = `stroke="${ink}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
  const lower = item.toLowerCase();

  // ── SHORT-SLEEVE bodysuit: wide T-shape, sleeves stop at mid-arm ──
  if (lower.includes('short') && (lower.includes('bodysuit') || lower.includes('sleeve') || lower.includes('vest') || lower.includes('top'))) {
    return `
      <path d="M 16 5 L 13 5 L 7 11 L 10 13 L 14 9 L 14 36 L 26 36 L 26 9 L 30 13 L 33 11 L 27 5 L 24 5" ${s}/>
      <path d="M 16 5 C 17 8 23 8 24 5" ${s} stroke-width="1"/>`;
  }

  // ── LONG-SLEEVE bodysuit: arms extend to wrists with cuffs ──
  if (lower.includes('long') && (lower.includes('bodysuit') || lower.includes('sleeve') || lower.includes('top'))) {
    return `
      <path d="M 16 5 L 13 5 L 3 15 L 5 17 L 6 16 L 14 9 L 14 36 L 26 36 L 26 9 L 34 16 L 35 17 L 37 15 L 27 5 L 24 5" ${s}/>
      <path d="M 16 5 C 17 8 23 8 24 5" ${s} stroke-width="1"/>
      <line x1="4" y1="15" x2="7" y2="13" ${s} stroke-width="0.8" opacity="0.5"/>
      <line x1="33" y1="13" x2="36" y2="15" ${s} stroke-width="0.8" opacity="0.5"/>`;
  }

  // ── BODYSUIT/VEST fallback (no short/long) — same as short ──
  if (lower.includes('bodysuit') || lower.includes('vest')) {
    return `
      <path d="M 16 5 L 13 5 L 7 11 L 10 13 L 14 9 L 14 36 L 26 36 L 26 9 L 30 13 L 33 11 L 27 5 L 24 5" ${s}/>
      <path d="M 16 5 C 17 8 23 8 24 5" ${s} stroke-width="1"/>`;
  }

  // ── SLEEPSUIT: one-piece with TWO LEGS and FEET bumps ──
  if (lower.includes('sleepsuit') || lower.includes('romper') || lower.includes('footed')) {
    return `
      <path d="M 15 4 L 25 4 L 28 8 L 30 20 L 29 30 L 27 36 C 26 39 23 40 22 38 L 21 30 L 20 28 L 19 30 L 18 38 C 17 40 14 39 13 36 L 11 30 L 10 20 L 12 8 Z" ${s}/>
      <line x1="11" y1="24" x2="29" y2="24" ${s} stroke-width="0.7" opacity="0.3"/>`;
  }

  // ── SLEEP BAG: rounded sack, NO legs, wider bottom ──
  if (lower.includes('sleep bag') || lower.includes('tog')) {
    return `
      <path d="M 14 6 C 14 2 26 2 26 6 L 28 14 L 31 32 C 31 38 26 42 20 42 C 14 42 9 38 9 32 L 12 14 Z" ${s}/>
      <line x1="16" y1="6" x2="16" y2="14" ${s} stroke-width="0.8" opacity="0.4"/>
      <line x1="24" y1="6" x2="24" y2="14" ${s} stroke-width="0.8" opacity="0.4"/>
      <path d="M 14 6 L 26 6" ${s} stroke-width="0.8" opacity="0.4"/>`;
  }

  // ── NAPPY/DIAPER: small, wide, low shape ──
  if (lower.includes('nappy') || lower.includes('diaper') || lower.includes('skip')) {
    return `
      <path d="M 10 16 L 30 16 L 32 24 C 32 34 24 38 20 38 C 16 38 8 34 8 24 Z" ${s}/>
      <line x1="18" y1="16" x2="18" y2="21" ${s} stroke-width="0.7" opacity="0.35"/>
      <line x1="22" y1="16" x2="22" y2="21" ${s} stroke-width="0.7" opacity="0.35"/>`;
  }

  // ── SINGLET/UNDERSHIRT: narrow straps, deep scoop neck, NO sleeves ──
  if (lower.includes('singlet') || lower.includes('undershirt')) {
    return `
      <path d="M 15 3 L 17 3 L 16 10 L 13 14 L 13 36 L 27 36 L 27 14 L 24 10 L 23 3 L 25 3" ${s}/>
      <path d="M 16 10 C 18 16 22 16 24 10" ${s} stroke-width="1"/>`;
  }

  // ── THERMAL bodysuit: long-sleeve + horizontal lines (warmth) ──
  if (lower.includes('thermal')) {
    return `
      <path d="M 16 5 L 13 5 L 3 15 L 5 17 L 6 16 L 14 9 L 14 36 L 26 36 L 26 9 L 34 16 L 35 17 L 37 15 L 27 5 L 24 5" ${s}/>
      <path d="M 16 5 C 17 8 23 8 24 5" ${s} stroke-width="1"/>
      <line x1="15" y1="16" x2="25" y2="16" stroke="${ink}" stroke-width="0.8" opacity="0.3" stroke-dasharray="1.5 1.5"/>
      <line x1="15" y1="21" x2="25" y2="21" stroke="${ink}" stroke-width="0.8" opacity="0.3" stroke-dasharray="1.5 1.5"/>
      <line x1="15" y1="26" x2="25" y2="26" stroke="${ink}" stroke-width="0.8" opacity="0.3" stroke-dasharray="1.5 1.5"/>
      <line x1="15" y1="31" x2="25" y2="31" stroke="${ink}" stroke-width="0.8" opacity="0.3" stroke-dasharray="1.5 1.5"/>`;
  }

  // ── Default fallback ──
  return `<rect x="12" y="8" width="16" height="28" rx="3" ${s}/>`;
}

const TOG_RANGES = [
  { label: '0.5 TOG', range: '24–27°C', min: 24, max: 27, color: '#fb923c' },
  { label: '1.0 TOG', range: '20–24°C', min: 20, max: 24, color: '#4ade80' },
  { label: '2.5 TOG', range: '17–20°C', min: 17, max: 20, color: '#38bdf8' },
];

@customElement('sketch-tog-card')
export class SketchTogCard extends BaseSketchCard {
  @state() private _expanded = false;

  static styles = [
    ...super.styles,
    css`
      .tog-room-select {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }
      .tog-room-select ha-icon {
        --mdc-icon-size: 18px;
        color: var(--sketch-ink-muted);
      }
      .tog-room-select select {
        flex: 1;
        font-family: var(--sketch-font-body);
        font-size: 0.95em;
        padding: 6px 10px;
        border: 1.5px solid var(--sketch-ink-light);
        border-radius: var(--sketch-radius, 12px);
        background: transparent;
        color: var(--sketch-ink);
        cursor: pointer;
        outline: none;
      }
      .tog-room-select select:focus-visible {
        border-color: var(--sketch-primary);
      }
      .tog-temp-strip {
        width: 100%;
        height: 24px;
        margin: 8px 0 4px;
      }
      .tog-main {
        text-align: center;
        padding: 8px 0;
      }
      .tog-condition {
        font-family: var(--sketch-font);
        font-size: 0.7em;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--sketch-ink-muted);
      }
      .tog-temp {
        font-family: var(--sketch-font);
        font-size: 2.8em;
        font-weight: 700;
        color: var(--sketch-ink);
        line-height: 1;
        margin: 4px 0;
      }
      .tog-temp-unit {
        font-size: 0.4em;
        font-weight: 400;
        color: var(--sketch-ink-muted);
      }
      .tog-rating {
        font-family: var(--sketch-font);
        font-size: 1.8em;
        font-weight: 700;
        line-height: 1;
        margin: 8px 0;
      }
      .tog-headline {
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
      }
      .tog-clothing {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
        margin: 16px 0 8px;
      }
      .tog-clothing-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: 64px;
      }
      .tog-clothing-svg {
        width: 56px;
        height: 60px;
        color: var(--sketch-ink);
      }
      .tog-clothing-label {
        font-family: var(--sketch-font);
        font-size: 0.65em;
        color: var(--sketch-ink-muted);
        text-align: center;
        line-height: 1.2;
      }
      .tog-divider {
        border: none;
        border-top: 1px dashed var(--sketch-ink-light);
        margin: 8px 0;
        opacity: 0.5;
      }
      .tog-pills {
        display: flex;
        gap: 6px;
        margin-top: 8px;
      }
      .tog-pill {
        flex: 1;
        text-align: center;
        padding: 6px 4px;
        border-radius: var(--sketch-radius, 12px);
        border: 1px solid var(--sketch-ink-light);
        opacity: 0.3;
        transition: opacity 0.2s ease, border-color 0.2s ease;
      }
      .tog-pill.active {
        opacity: 1;
      }
      .tog-pill-label {
        font-family: var(--sketch-font);
        font-size: 0.8em;
        font-weight: 700;
      }
      .tog-pill-range {
        font-family: var(--sketch-font);
        font-size: 0.6em;
        color: var(--sketch-ink-muted);
        margin-top: 2px;
      }
      .tog-expand-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        font-family: var(--sketch-font);
        font-size: 0.8em;
        color: var(--sketch-ink-muted);
        cursor: pointer;
        padding: 4px;
        margin-top: 4px;
      }
      .tog-expand-btn ha-icon {
        --mdc-icon-size: 16px;
        transition: transform 0.2s ease;
      }
      .tog-expand-btn.open ha-icon {
        transform: rotate(180deg);
      }
      .tog-all-options {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
      .tog-all-options.open {
        max-height: 400px;
      }
      .tog-option-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 0;
        opacity: 0.4;
      }
      .tog-option-row.active {
        opacity: 1;
      }
      .tog-option-tog {
        font-family: var(--sketch-font);
        font-size: 0.85em;
        font-weight: 700;
        min-width: 55px;
      }
      .tog-option-desc {
        font-family: var(--sketch-font);
        font-size: 0.8em;
        color: var(--sketch-ink-muted);
        flex: 1;
      }
      .tog-edge {
        display: flex;
        justify-content: space-between;
        margin-top: 6px;
        font-family: var(--sketch-font);
        font-size: 0.6em;
        color: var(--sketch-ink-muted);
        opacity: 0.6;
      }
    `,
  ];

  private get _togConfig(): TogCardConfig {
    return this._config as TogCardConfig;
  }

  setConfig(config: TogCardConfig): void {
    if (!config.temperature_entity) throw new Error('Please define temperature_entity');
    this._config = { ...config } as any;
  }

  static getConfigElement() {
    return document.createElement('sketch-tog-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const sensors = Object.keys(hass.states).filter((e) => e.startsWith('sensor.') && hass.states[e].attributes.unit_of_measurement === '°C');
    return { temperature_entity: sensors[0] || 'sensor.temperature', name: 'Baby Sleep Guide' };
  }

  getCardSize() {
    return 6;
  }

  getLayoutOptions() {
    return { grid_columns: 4, grid_rows: 6 };
  }

  private _onRoomChange(ev: Event) {
    const select = ev.target as HTMLSelectElement;
    const entity = this._togConfig.room_select_entity;
    if (!entity) return;
    const domain = entity.split('.')[0];
    this.callService(domain, 'select_option', {
      entity_id: entity,
      option: select.value,
    });
  }

  render() {
    const tempEntity = this.hass?.states[this._togConfig.temperature_entity];
    if (!tempEntity) {
      return html`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content sketch-empty"><ha-icon icon="mdi:baby-face-outline"></ha-icon><span>Temperature entity not found</span></div></ha-card>`;
    }

    const temp = parseFloat(tempEntity.state) || 20;
    const rec = getTogRecommendation(temp);
    const name = this._togConfig.name || 'Baby Sleep Guide';
    const roomEntity = this._togConfig.room_select_entity ? this.hass?.states[this._togConfig.room_select_entity] : null;
    const roomOptions: string[] = roomEntity?.attributes?.options || [];
    const currentRoom = roomEntity?.state || '';

    // Temperature strip position
    const stripPct = clamp(((temp - 14) / (29 - 14)) * 100, 1, 99);

    // Seed for clothing SVG wobble
    let seed = 0;
    const id = this._togConfig.temperature_entity;
    for (let i = 0; i < id.length; i++) {
      seed = ((seed << 5) - seed + id.charCodeAt(i)) | 0;
    }
    seed = Math.abs(seed);

    const allOptions = [
      { tog: '0.2', range: '27°C+', desc: 'Nappy only', risk: 'hot', color: '#f87171' },
      { tog: '0.5', range: '24–27°C', desc: 'Short-sleeve bodysuit', risk: 'warm', color: '#fb923c' },
      { tog: '1.0', range: '22–24°C', desc: 'Long-sleeve bodysuit + sleep bag', risk: 'comfortable', color: '#4ade80' },
      { tog: '1.0–2.5', range: '20–22°C', desc: 'Bodysuit + sleepsuit + sleep bag', risk: 'comfortable', color: '#4ade80' },
      { tog: '2.5', range: '17–20°C', desc: 'Warm sleepsuit + sleep bag', risk: 'cool', color: '#38bdf8' },
      { tog: '3.5', range: '<17°C', desc: 'Thermal + sleepsuit + sleep bag', risk: 'cold', color: '#818cf8' },
    ];

    return html`
      <ha-card>
        ${this.renderSketchBg(400, 300, false)}
        <div class="sketch-card-content">
          <p class="sketch-name">${name}</p>

          ${roomEntity
            ? html`
                <div class="tog-room-select">
                  <ha-icon icon="mdi:door-open"></ha-icon>
                  <select @change=${this._onRoomChange} aria-label="Select room">
                    ${roomOptions.map((opt) => html`<option value="${opt}" ?selected=${opt === currentRoom}>${opt}</option>`)}
                  </select>
                </div>
              `
            : nothing}

          <svg class="tog-temp-strip" viewBox="0 0 200 20" preserveAspectRatio="none">
            <defs>
              <linearGradient id="tog-grad">
                <stop offset="0%" stop-color="#818cf8"/>
                <stop offset="18%" stop-color="#60a5fa"/>
                <stop offset="42%" stop-color="#34d399"/>
                <stop offset="68%" stop-color="#fbbf24"/>
                <stop offset="100%" stop-color="#f87171"/>
              </linearGradient>
            </defs>
            <rect x="4" y="8" width="192" height="4" rx="2" fill="url(#tog-grad)" opacity="0.7"/>
            <circle cx="${4 + stripPct * 1.92}" cy="10" r="6" fill="${rec.color}" stroke="var(--sketch-card-bg, var(--ha-card-background, #faf7f0))" stroke-width="2"/>
          </svg>

          <div class="tog-main">
            <div class="tog-condition">${rec.headline}${currentRoom ? ` · ${currentRoom}` : ''}</div>
            <div class="tog-temp">${temp.toFixed(1)}<span class="tog-temp-unit">°C</span></div>
            <div class="tog-rating" style="color: ${rec.color}">${rec.tog} TOG</div>
          </div>

          <div class="tog-clothing">
            ${rec.clothing.map((item, i) => html`
              <div class="tog-clothing-item">
                <svg class="tog-clothing-svg" viewBox="0 0 40 44">${unsafeSVG(clothingSvg(item, seed + i * 37))}</svg>
                <span class="tog-clothing-label">${item}</span>
              </div>
            `)}
          </div>

          <hr class="tog-divider"/>

          <div class="tog-pills">
            ${TOG_RANGES.map((r) => {
              const active = temp >= r.min && temp < r.max;
              return html`
                <div class="tog-pill ${active ? 'active' : ''}" style="${active ? `border-color: ${r.color}; background: ${r.color}1a;` : ''}">
                  <div class="tog-pill-label" style="${active ? `color: ${r.color}` : ''}">${r.label}</div>
                  <div class="tog-pill-range">${r.range}</div>
                </div>
              `;
            })}
          </div>

          <div class="tog-edge">
            <span>☀ 0.2 TOG · above 27°C</span>
            <span>❄ 3.5 TOG · below 17°C</span>
          </div>

          <div class="tog-expand-btn ${this._expanded ? 'open' : ''}" @click=${() => { this._expanded = !this._expanded; }} role="button" tabindex="0" @keydown=${(ev: KeyboardEvent) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); this._expanded = !this._expanded; } }}>
            <span>${this._expanded ? 'Hide all options' : 'Show all options'}</span>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </div>

          <div class="tog-all-options ${this._expanded ? 'open' : ''}">
            ${allOptions.map((opt) => {
              const isActive = opt.tog === rec.tog;
              return html`
                <div class="tog-option-row ${isActive ? 'active' : ''}">
                  <span class="tog-option-tog" style="color: ${opt.color}">${opt.tog} TOG</span>
                  <span class="tog-option-desc">${opt.range} · ${opt.desc}</span>
                </div>
              `;
            })}
          </div>
        </div>
      </ha-card>
    `;
  }
}

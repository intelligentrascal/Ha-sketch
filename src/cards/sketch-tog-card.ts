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

/* ── Inline SVG clothing illustrations (hand-drawn wobble paths) ── */
function clothingSvg(item: string, seed: number): string {
  const w = (s: number, i: number) => (Math.sin(s * 9301 + i * 49297) * 49297 % 1 - 0.5) * 1.2;
  const ink = 'var(--sketch-ink, #2a2a2a)';
  const sw = 'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
  const lower = item.toLowerCase();

  // ── Short-sleeve bodysuit: T-shirt with SHORT sleeves ending at upper arm ──
  if (lower.includes('short') && (lower.includes('bodysuit') || lower.includes('sleeve') || lower.includes('vest'))) {
    return `<path d="M ${20+w(seed,0)} ${10+w(seed,1)} L ${14+w(seed,2)} ${14+w(seed,3)} L ${8+w(seed,4)} ${12+w(seed,5)} L ${11+w(seed,6)} ${6+w(seed,7)} L ${15+w(seed,8)} ${3+w(seed,9)} L ${25+w(seed,10)} ${3+w(seed,11)} L ${29+w(seed,12)} ${6+w(seed,13)} L ${32+w(seed,14)} ${12+w(seed,15)} L ${26+w(seed,16)} ${14+w(seed,17)} L ${20+w(seed,18)} ${10+w(seed,19)}" fill="none" stroke="${ink}" ${sw}/>
    <path d="M ${14+w(seed,20)} ${14+w(seed,21)} L ${14+w(seed,22)} ${34+w(seed,23)} L ${17+w(seed,24)} ${38+w(seed,25)} L ${23+w(seed,26)} ${38+w(seed,27)} L ${26+w(seed,28)} ${34+w(seed,29)} L ${26+w(seed,30)} ${14+w(seed,31)}" fill="none" stroke="${ink}" ${sw}/>`;
  }

  // ── Long-sleeve bodysuit: T-shirt with LONG sleeves extending to wrists ──
  if (lower.includes('long') && (lower.includes('bodysuit') || lower.includes('sleeve'))) {
    return `<path d="M ${20+w(seed,0)} ${10+w(seed,1)} L ${12+w(seed,2)} ${16+w(seed,3)} L ${4+w(seed,4)} ${14+w(seed,5)} L ${3+w(seed,40)} ${12+w(seed,41)} L ${5+w(seed,42)} ${11+w(seed,43)} L ${10+w(seed,6)} ${14+w(seed,7)} L ${10+w(seed,44)} ${6+w(seed,45)} L ${15+w(seed,8)} ${3+w(seed,9)} L ${25+w(seed,10)} ${3+w(seed,11)} L ${30+w(seed,46)} ${6+w(seed,47)} L ${30+w(seed,12)} ${14+w(seed,13)} L ${35+w(seed,48)} ${11+w(seed,49)} L ${37+w(seed,50)} ${12+w(seed,51)} L ${36+w(seed,14)} ${14+w(seed,15)} L ${28+w(seed,16)} ${16+w(seed,17)} L ${20+w(seed,18)} ${10+w(seed,19)}" fill="none" stroke="${ink}" ${sw}/>
    <path d="M ${12+w(seed,20)} ${16+w(seed,21)} L ${12+w(seed,22)} ${34+w(seed,23)} L ${16+w(seed,24)} ${38+w(seed,25)} L ${24+w(seed,26)} ${38+w(seed,27)} L ${28+w(seed,28)} ${34+w(seed,29)} L ${28+w(seed,30)} ${16+w(seed,31)}" fill="none" stroke="${ink}" ${sw}/>`;
  }

  // ── Generic bodysuit/vest (fallback if no short/long prefix) ──
  if (lower.includes('bodysuit') || lower.includes('vest')) {
    return `<path d="M ${20+w(seed,0)} ${10+w(seed,1)} L ${14+w(seed,2)} ${14+w(seed,3)} L ${8+w(seed,4)} ${12+w(seed,5)} L ${11+w(seed,6)} ${6+w(seed,7)} L ${15+w(seed,8)} ${3+w(seed,9)} L ${25+w(seed,10)} ${3+w(seed,11)} L ${29+w(seed,12)} ${6+w(seed,13)} L ${32+w(seed,14)} ${12+w(seed,15)} L ${26+w(seed,16)} ${14+w(seed,17)} L ${20+w(seed,18)} ${10+w(seed,19)}" fill="none" stroke="${ink}" ${sw}/>
    <path d="M ${14+w(seed,20)} ${14+w(seed,21)} L ${14+w(seed,22)} ${34+w(seed,23)} L ${17+w(seed,24)} ${38+w(seed,25)} L ${23+w(seed,26)} ${38+w(seed,27)} L ${26+w(seed,28)} ${34+w(seed,29)} L ${26+w(seed,30)} ${14+w(seed,31)}" fill="none" stroke="${ink}" ${sw}/>`;
  }

  // ── Sleepsuit (footed): full body with split legs and rounded feet ──
  if (lower.includes('sleepsuit') || lower.includes('romper')) {
    return `<path d="M ${15+w(seed,0)} ${4+w(seed,1)} L ${25+w(seed,2)} ${4+w(seed,3)} L ${28+w(seed,4)} ${7+w(seed,5)} L ${30+w(seed,6)} ${18+w(seed,7)} L ${30+w(seed,8)} ${28+w(seed,9)} L ${29+w(seed,10)} ${34+w(seed,11)} C ${29+w(seed,32)} ${38+w(seed,33)} ${25+w(seed,34)} ${40+w(seed,35)} ${23+w(seed,12)} ${39+w(seed,13)} L ${22+w(seed,14)} ${30+w(seed,15)} L ${20+w(seed,16)} ${28+w(seed,17)} L ${18+w(seed,18)} ${30+w(seed,19)} L ${17+w(seed,36)} ${39+w(seed,37)} C ${15+w(seed,38)} ${40+w(seed,39)} ${11+w(seed,40)} ${38+w(seed,41)} ${11+w(seed,42)} ${34+w(seed,43)} L ${10+w(seed,24)} ${28+w(seed,25)} L ${10+w(seed,26)} ${18+w(seed,27)} L ${12+w(seed,28)} ${7+w(seed,29)} Z" fill="none" stroke="${ink}" ${sw}/>
    <line x1="${10+w(seed,44)}" y1="${28+w(seed,45)}" x2="${30+w(seed,46)}" y2="${28+w(seed,47)}" stroke="${ink}" stroke-width="0.8" opacity="0.4"/>`;
  }

  // ── Sleep bag: sack silhouette with rounded bottom, no legs ──
  if (lower.includes('sleep bag') || lower.includes('tog')) {
    return `<path d="M ${14+w(seed,0)} ${6+w(seed,1)} C ${14+w(seed,2)} ${3+w(seed,3)} ${26+w(seed,4)} ${3+w(seed,5)} ${26+w(seed,6)} ${6+w(seed,7)} L ${28+w(seed,8)} ${12+w(seed,9)} L ${30+w(seed,10)} ${30+w(seed,11)} C ${30+w(seed,12)} ${36+w(seed,13)} ${26+w(seed,14)} ${40+w(seed,15)} ${20+w(seed,16)} ${40+w(seed,17)} C ${14+w(seed,18)} ${40+w(seed,19)} ${10+w(seed,20)} ${36+w(seed,21)} ${10+w(seed,22)} ${30+w(seed,23)} L ${12+w(seed,24)} ${12+w(seed,25)} Z" fill="none" stroke="${ink}" ${sw}/>
    <line x1="${16+w(seed,26)}" y1="${6+w(seed,27)}" x2="${16+w(seed,28)}" y2="${12+w(seed,29)}" stroke="${ink}" stroke-width="0.8" opacity="0.5"/>
    <line x1="${24+w(seed,30)}" y1="${6+w(seed,31)}" x2="${24+w(seed,32)}" y2="${12+w(seed,33)}" stroke="${ink}" stroke-width="0.8" opacity="0.5"/>`;
  }

  // ── Nappy / diaper: small rounded triangle shape ──
  if (lower.includes('nappy') || lower.includes('diaper')) {
    return `<path d="M ${12+w(seed,0)} ${16+w(seed,1)} L ${28+w(seed,2)} ${16+w(seed,3)} L ${30+w(seed,4)} ${22+w(seed,5)} C ${30+w(seed,6)} ${30+w(seed,7)} ${24+w(seed,8)} ${34+w(seed,9)} ${20+w(seed,10)} ${34+w(seed,11)} C ${16+w(seed,12)} ${34+w(seed,13)} ${10+w(seed,14)} ${30+w(seed,15)} ${10+w(seed,16)} ${22+w(seed,17)} Z" fill="none" stroke="${ink}" ${sw}/>
    <path d="M ${18+w(seed,18)} ${16+w(seed,19)} L ${18+w(seed,20)} ${20+w(seed,21)}" stroke="${ink}" stroke-width="0.8" opacity="0.4"/>
    <path d="M ${22+w(seed,22)} ${16+w(seed,23)} L ${22+w(seed,24)} ${20+w(seed,25)}" stroke="${ink}" stroke-width="0.8" opacity="0.4"/>`;
  }

  // ── Singlet / undershirt: tank top with thin straps, NO sleeves ──
  if (lower.includes('singlet') || lower.includes('undershirt')) {
    return `<path d="M ${16+w(seed,0)} ${4+w(seed,1)} L ${17+w(seed,2)} ${2+w(seed,3)} L ${19+w(seed,4)} ${2+w(seed,5)} L ${17+w(seed,6)} ${8+w(seed,7)} L ${14+w(seed,8)} ${12+w(seed,9)} L ${14+w(seed,10)} ${34+w(seed,11)} L ${26+w(seed,12)} ${34+w(seed,13)} L ${26+w(seed,14)} ${12+w(seed,15)} L ${23+w(seed,16)} ${8+w(seed,17)} L ${21+w(seed,18)} ${2+w(seed,19)} L ${23+w(seed,20)} ${2+w(seed,21)} L ${24+w(seed,22)} ${4+w(seed,23)}" fill="none" stroke="${ink}" ${sw}/>
    <path d="M ${17+w(seed,24)} ${8+w(seed,25)} C ${19+w(seed,26)} ${12+w(seed,27)} ${21+w(seed,28)} ${12+w(seed,29)} ${23+w(seed,30)} ${8+w(seed,31)}" fill="none" stroke="${ink}" stroke-width="0.8" opacity="0.5"/>`;
  }

  // ── Thermal bodysuit: long-sleeve with double-line (thick/warm) ──
  if (lower.includes('thermal')) {
    return `<path d="M ${20+w(seed,0)} ${10+w(seed,1)} L ${12+w(seed,2)} ${16+w(seed,3)} L ${4+w(seed,4)} ${14+w(seed,5)} L ${3+w(seed,6)} ${12+w(seed,7)} L ${5+w(seed,8)} ${11+w(seed,9)} L ${10+w(seed,10)} ${14+w(seed,11)} L ${10+w(seed,12)} ${6+w(seed,13)} L ${15+w(seed,14)} ${3+w(seed,15)} L ${25+w(seed,16)} ${3+w(seed,17)} L ${30+w(seed,18)} ${6+w(seed,19)} L ${30+w(seed,20)} ${14+w(seed,21)} L ${35+w(seed,22)} ${11+w(seed,23)} L ${37+w(seed,24)} ${12+w(seed,25)} L ${36+w(seed,26)} ${14+w(seed,27)} L ${28+w(seed,28)} ${16+w(seed,29)} L ${20+w(seed,30)} ${10+w(seed,31)}" fill="none" stroke="${ink}" ${sw}/>
    <path d="M ${12+w(seed,32)} ${16+w(seed,33)} L ${12+w(seed,34)} ${34+w(seed,35)} L ${16+w(seed,36)} ${38+w(seed,37)} L ${24+w(seed,38)} ${38+w(seed,39)} L ${28+w(seed,40)} ${34+w(seed,41)} L ${28+w(seed,42)} ${16+w(seed,43)}" fill="none" stroke="${ink}" ${sw}/>
    <path d="M ${14+w(seed,44)} ${18+w(seed,45)} L ${26+w(seed,46)} ${18+w(seed,47)}" stroke="${ink}" stroke-width="0.8" opacity="0.3" stroke-dasharray="2 2"/>
    <path d="M ${14+w(seed,48)} ${24+w(seed,49)} L ${26+w(seed,50)} ${24+w(seed,51)}" stroke="${ink}" stroke-width="0.8" opacity="0.3" stroke-dasharray="2 2"/>
    <path d="M ${14+w(seed,52)} ${30+w(seed,53)} L ${26+w(seed,54)} ${30+w(seed,55)}" stroke="${ink}" stroke-width="0.8" opacity="0.3" stroke-dasharray="2 2"/>`;
  }

  // ── Default fallback ──
  return `<rect x="${12+w(seed,0)}" y="${8+w(seed,1)}" width="${16+w(seed,2)}" height="${24+w(seed,3)}" rx="3" fill="none" stroke="${ink}" stroke-width="1.5" stroke-linecap="round"/>`;
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
        width: 40px;
        height: 44px;
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

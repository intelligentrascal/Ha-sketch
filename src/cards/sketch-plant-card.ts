import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { BaseSketchCard } from '../shared/base-card';
import { clamp } from '../shared/utils';
import type { HomeAssistant, PlantCardConfig } from '../shared/types';
import '../editors/sketch-plant-card-editor';

/* ── Seeded random for wobble ── */
function wr(seed: number, i: number): number {
  const x = Math.sin(seed * 9301 + i * 49297 + 233280) * 49297;
  return (x - Math.floor(x) - 0.5) * 2;
}

/* ── Health level from status attributes ── */
type HealthLevel = 'thriving' | 'stressed' | 'critical';

interface PlantHealth {
  level: HealthLevel;
  problems: string[];
  moistureLow: boolean;
  moistureHigh: boolean;
  tempLow: boolean;
  tempHigh: boolean;
  lightLow: boolean;
  conductivityLow: boolean;
}

function getPlantHealth(entity: any): PlantHealth {
  const attrs = entity?.attributes || {};
  const problems: string[] = [];
  const check = (key: string, label: string) => {
    const val = attrs[key];
    if (val === 'low') problems.push(`${label} low`);
    if (val === 'high') problems.push(`${label} high`);
    return val;
  };
  const moisture = check('moisture_status', 'Moisture');
  const temp = check('temperature_status', 'Temperature');
  const light = check('illuminance_status', 'Light');
  const conductivity = check('conductivity_status', 'Conductivity');
  check('humidity_status', 'Humidity');

  const level: HealthLevel = problems.length === 0 ? 'thriving' : problems.length === 1 ? 'stressed' : 'critical';
  return {
    level, problems,
    moistureLow: moisture === 'low', moistureHigh: moisture === 'high',
    tempLow: temp === 'low', tempHigh: temp === 'high',
    lightLow: light === 'low', conductivityLow: conductivity === 'low',
  };
}

/* ── Shared pot SVG ── */
function potSvg(seed: number, moisturePct: number): string {
  const w = wr;
  const soilOpacity = clamp(0.15 + moisturePct * 0.004, 0.15, 0.55);
  return `
    <rect x="${30+w(seed,80)*0.5}" y="${98+w(seed,81)*0.3}" width="40" height="3" rx="1.5" fill="var(--sketch-ink, #2a2a2a)" opacity="${soilOpacity}"/>
    <path d="M ${28+w(seed,90)} ${100+w(seed,91)} L ${24+w(seed,92)} ${126+w(seed,93)} L ${76+w(seed,94)} ${126+w(seed,95)} L ${72+w(seed,96)} ${100+w(seed,97)} Z" fill="none" stroke="var(--sketch-ink, #2a2a2a)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${26+w(seed,98)} ${100+w(seed,99)} L ${74+w(seed,100)} ${100+w(seed,101)}" fill="none" stroke="var(--sketch-ink, #2a2a2a)" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="${30+w(seed,102)}" y1="${110+w(seed,103)}" x2="${70+w(seed,104)}" y2="${110+w(seed,105)}" stroke="var(--sketch-ink, #2a2a2a)" stroke-width="0.5" opacity="0.2"/>
    <line x1="${32+w(seed,106)}" y1="${118+w(seed,107)}" x2="${68+w(seed,108)}" y2="${118+w(seed,109)}" stroke="var(--sketch-ink, #2a2a2a)" stroke-width="0.5" opacity="0.15"/>`;
}

/* ── Water droplet doodle ── */
function waterDropSvg(x: number, y: number, seed: number): string {
  return `<path d="M ${x} ${y-4} C ${x-2} ${y} ${x-3} ${y+3} ${x} ${y+4} C ${x+3} ${y+3} ${x+2} ${y} ${x} ${y-4} Z" fill="none" stroke="var(--sketch-primary, #4a6fa5)" stroke-width="1" opacity="0.5"/>`;
}

/* ── Status icon doodles ── */
function snowflakeSvg(x: number, y: number): string {
  let s = '';
  for (let a = 0; a < 6; a++) {
    const rad = (a * 60) * Math.PI / 180;
    const ex = x + Math.cos(rad) * 6;
    const ey = y + Math.sin(rad) * 6;
    s += `<line x1="${x}" y1="${y}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="var(--sketch-primary, #4a6fa5)" stroke-width="0.8" opacity="0.6" stroke-linecap="round"/>`;
  }
  return s;
}

function sunSvg(x: number, y: number): string {
  let s = `<circle cx="${x}" cy="${y}" r="3" fill="none" stroke="var(--sketch-warning, #ff9800)" stroke-width="1" opacity="0.6"/>`;
  for (let a = 0; a < 8; a++) {
    const rad = (a * 45) * Math.PI / 180;
    const sx = x + Math.cos(rad) * 5;
    const sy = y + Math.sin(rad) * 5;
    const ex = x + Math.cos(rad) * 7;
    const ey = y + Math.sin(rad) * 7;
    s += `<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="var(--sketch-warning, #ff9800)" stroke-width="0.7" opacity="0.5" stroke-linecap="round"/>`;
  }
  return s;
}

function cloudSvg(x: number, y: number): string {
  return `<path d="M ${x-6} ${y+2} C ${x-6} ${y-2} ${x-3} ${y-4} ${x} ${y-3} C ${x+2} ${y-5} ${x+5} ${y-3} ${x+6} ${y} C ${x+7} ${y+2} ${x+5} ${y+3} ${x-5} ${y+3} Z" fill="none" stroke="var(--sketch-ink-muted)" stroke-width="0.8" opacity="0.5"/>`;
}

/* ── Snake Plant SVG ── */
function snakePlantSvg(health: PlantHealth, seed: number): string {
  const w = wr;
  const ink = 'var(--sketch-ink, #2a2a2a)';
  const strokeColor = health.level === 'thriving' ? 'var(--sketch-success, #4caf50)' :
    health.level === 'stressed' ? 'var(--sketch-warning, #ff9800)' : 'var(--sketch-danger, #f44336)';
  const leafOpacity = health.lightLow ? '0.4' : '0.8';
  const spread = health.level === 'thriving' ? 6 : health.level === 'stressed' ? 14 : 25;
  const droop = health.moistureLow ? 8 : 0;

  const leaves = [
    { h: 65, angle: -spread * 2 },
    { h: 55, angle: -spread },
    { h: 72, angle: 0 },
    { h: 58, angle: spread },
    { h: 50, angle: spread * 2 },
  ];

  let svg = '';
  leaves.forEach((leaf, i) => {
    const cx = 50 + w(seed, i * 10) * 2;
    const baseY = 98;
    const tipY = baseY - leaf.h + droop;
    const angleRad = (leaf.angle + w(seed, i * 10 + 5) * 2) * Math.PI / 180;
    const tipX = cx + Math.sin(angleRad) * leaf.h * 0.4;
    const bw = 3 + w(seed, i * 10 + 1) * 0.5;

    svg += `<path d="M ${cx - bw} ${baseY} Q ${cx - bw + w(seed, i*10+2)*0.5} ${tipY + leaf.h * 0.3} ${tipX} ${tipY} Q ${cx + bw + w(seed, i*10+3)*0.5} ${tipY + leaf.h * 0.3} ${cx + bw} ${baseY} Z" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" opacity="${leafOpacity}"/>`;

    // Variegation bands
    const bandY1 = baseY - leaf.h * 0.35;
    const bandY2 = baseY - leaf.h * 0.65;
    svg += `<line x1="${cx - 2}" y1="${bandY1}" x2="${cx + 2}" y2="${bandY1}" stroke="${ink}" stroke-width="0.5" opacity="0.2" stroke-dasharray="1.5 1"/>`;
    svg += `<line x1="${cx - 1.5}" y1="${bandY2}" x2="${cx + 1.5}" y2="${bandY2}" stroke="${ink}" stroke-width="0.5" opacity="0.2" stroke-dasharray="1.5 1"/>`;

    // Conductivity low: dashed leaf tips
    if (health.conductivityLow) {
      svg += `<line x1="${tipX - 1}" y1="${tipY}" x2="${tipX + 1}" y2="${tipY + 3}" stroke="${ink}" stroke-width="0.6" opacity="0.3" stroke-dasharray="1 1"/>`;
    }
  });

  return svg;
}

/* ── ZZ Plant SVG ── */
function zzPlantSvg(health: PlantHealth, seed: number): string {
  const w = wr;
  const strokeColor = health.level === 'thriving' ? 'var(--sketch-success, #4caf50)' :
    health.level === 'stressed' ? 'var(--sketch-warning, #ff9800)' : 'var(--sketch-danger, #f44336)';
  const leafOpacity = health.lightLow ? '0.4' : '0.8';
  const archUp = health.level === 'thriving' ? -40 : health.level === 'stressed' ? -20 : 10;

  const stems = [
    { angle: -25, h: 60 },
    { angle: -8, h: 70 },
    { angle: 10, h: 65 },
    { angle: 28, h: 55 },
  ];

  let svg = '';
  stems.forEach((stem, si) => {
    const baseX = 50 + w(seed, si * 20) * 3;
    const baseY = 98;
    const tipAngleRad = (stem.angle + w(seed, si * 20 + 1) * 3) * Math.PI / 180;
    const tipX = baseX + Math.sin(tipAngleRad) * stem.h * 0.5;
    const tipY = baseY - stem.h;
    const cpX = (baseX + tipX) / 2 + Math.sin(tipAngleRad) * 15;
    const cpY = baseY + archUp + w(seed, si * 20 + 2) * 5;

    // Stem
    svg += `<path d="M ${baseX} ${baseY} Q ${cpX.toFixed(1)} ${cpY.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}" fill="none" stroke="${strokeColor}" stroke-width="1.2" stroke-linecap="round" opacity="${leafOpacity}"/>`;

    // Leaflets along stem
    const leafCount = 7;
    for (let li = 1; li <= leafCount; li++) {
      const t = li / (leafCount + 1);
      const lx = baseX * (1-t)*(1-t) + cpX * 2*(1-t)*t + tipX * t*t;
      const ly = baseY * (1-t)*(1-t) + cpY * 2*(1-t)*t + tipY * t*t;
      const side = li % 2 === 0 ? 1 : -1;
      const leafLen = 4 + w(seed, si * 20 + li) * 0.5;
      const perpAngle = tipAngleRad + (Math.PI / 2) * side;
      const lx2 = lx + Math.cos(perpAngle) * leafLen;
      const ly2 = ly + Math.sin(perpAngle) * leafLen;

      const dashArray = (health.level === 'critical' && li <= 2) ? 'stroke-dasharray="1.5 1"' : '';
      svg += `<ellipse cx="${((lx + lx2) / 2).toFixed(1)}" cy="${((ly + ly2) / 2).toFixed(1)}" rx="${(leafLen / 2).toFixed(1)}" ry="1.8" transform="rotate(${(perpAngle * 180 / Math.PI).toFixed(1)} ${((lx + lx2) / 2).toFixed(1)} ${((ly + ly2) / 2).toFixed(1)})" fill="none" stroke="${strokeColor}" stroke-width="0.8" opacity="${leafOpacity}" ${dashArray}/>`;
    }
  });

  return svg;
}

/* ── Rubber Plant SVG ── */
function rubberPlantSvg(health: PlantHealth, seed: number): string {
  const w = wr;
  const ink = 'var(--sketch-ink, #2a2a2a)';
  const strokeColor = health.level === 'thriving' ? 'var(--sketch-success, #4caf50)' :
    health.level === 'stressed' ? 'var(--sketch-warning, #ff9800)' : 'var(--sketch-danger, #f44336)';
  const leafOpacity = health.lightLow ? '0.4' : '0.8';
  const leafAngle = health.level === 'thriving' ? -20 : health.level === 'stressed' ? 0 : 20;
  const visibleLeaves = health.level === 'critical' ? 4 : health.level === 'stressed' ? 5 : 6;

  // Trunk
  let svg = `<path d="M ${50+w(seed,0)*0.5} ${98} Q ${49+w(seed,1)*0.8} ${65} ${50+w(seed,2)*0.5} ${30}" fill="none" stroke="${ink}" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>`;

  // Leaves alternating left/right
  for (let i = 0; i < visibleLeaves; i++) {
    const y = 88 - i * 10;
    const side = i % 2 === 0 ? -1 : 1;
    const size = 10 - i * 0.5;
    const angle = leafAngle + w(seed, i * 5) * 5;
    const angleRad = (angle * side) * Math.PI / 180;
    const lx = 50 + side * (8 + w(seed, i * 5 + 1) * 2);
    const ly = y;
    const tipX = lx + Math.cos(angleRad) * size * side;
    const tipY = ly + Math.sin(angleRad) * size;

    // Leaf oval
    svg += `<path d="M ${50+w(seed,i*5+2)*0.3} ${ly} Q ${lx} ${ly - size * 0.3} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${lx} ${ly + size * 0.3} ${50+w(seed,i*5+3)*0.3} ${ly}" fill="none" stroke="${strokeColor}" stroke-width="1.2" stroke-linecap="round" opacity="${leafOpacity}"/>`;
    // Center vein
    svg += `<line x1="${50+w(seed,i*5+2)*0.3}" y1="${ly}" x2="${tipX.toFixed(1)}" y2="${tipY.toFixed(1)}" stroke="${strokeColor}" stroke-width="0.5" opacity="0.3"/>`;
  }

  // New growth sheath at top
  svg += `<path d="M ${49+w(seed,60)} ${32} Q ${48+w(seed,61)} ${26} ${50+w(seed,62)} ${24}" fill="none" stroke="${strokeColor}" stroke-width="0.8" opacity="0.5"/>`;

  return svg;
}

/* ── Sensor gauge bar (CSS-based, simple) ── */
function sensorRow(icon: string, value: string, pct: number | null, color: string): any {
  // Returns template data — rendered in the card's html
  return { icon, value, pct, color };
}

@customElement('sketch-plant-card')
export class SketchPlantCard extends BaseSketchCard {
  static styles = [
    ...super.styles,
    css`
      .plant-layout {
        display: flex;
        gap: 10px;
        min-height: 140px;
      }
      .plant-svg-col {
        flex: 0 0 55%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }
      .plant-svg {
        width: 100%;
        max-width: 140px;
        height: auto;
      }
      .plant-info-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
      }
      .plant-name {
        font-family: var(--sketch-font);
        font-size: 1.1em;
        font-weight: 600;
        color: var(--sketch-ink);
        line-height: 1.2;
      }
      .plant-species {
        font-family: var(--sketch-font);
        font-size: 0.75em;
        color: var(--sketch-ink-muted);
        font-style: italic;
        margin-bottom: 6px;
      }
      .sensor-row {
        display: flex;
        align-items: center;
        gap: 4px;
        margin: 2px 0;
        font-family: var(--sketch-font);
        font-size: 0.75em;
        color: var(--sketch-ink);
      }
      .sensor-icon {
        font-size: 0.9em;
        flex-shrink: 0;
        width: 16px;
        text-align: center;
      }
      .sensor-value {
        min-width: 38px;
        font-weight: 600;
      }
      .sensor-gauge {
        flex: 1;
        height: 5px;
        border-radius: 3px;
        background: var(--sketch-ink-light);
        overflow: hidden;
      }
      .sensor-gauge-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.5s ease;
      }
      .problem-banner {
        font-family: var(--sketch-font);
        font-size: 0.8em;
        font-style: italic;
        color: var(--sketch-danger, #f44336);
        margin-top: 6px;
        padding-top: 4px;
        border-top: 1px dashed var(--sketch-ink-light);
      }
      .status-icons {
        position: absolute;
        top: 8px;
        left: 8px;
        z-index: 2;
      }
    `,
  ];

  private get _plantConfig(): PlantCardConfig {
    return this._config as PlantCardConfig;
  }

  setConfig(config: PlantCardConfig): void {
    if (!config.entity) throw new Error('Please define a plant entity');
    if (!config.plant_type) throw new Error('Please select a plant type');
    super.setConfig(config as any);
  }

  static getConfigElement() {
    return document.createElement('sketch-plant-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const plants = Object.keys(hass.states).filter((e) => e.startsWith('plant.'));
    return { entity: plants[0] || 'plant.my_plant', plant_type: 'snake_plant' };
  }

  getCardSize() { return 4; }
  getLayoutOptions() { return { grid_columns: 4, grid_rows: 4 }; }

  private _getSlug(): string {
    return (this._config.entity || '').replace('plant.', '');
  }

  private _getThreshold(metric: string, bound: 'min' | 'max'): number | null {
    const slug = this._getSlug();
    const entityId = `number.${slug}_${bound}_${metric}`;
    const entity = this.hass?.states[entityId];
    if (entity && entity.state !== 'unavailable' && entity.state !== 'unknown') {
      return parseFloat(entity.state);
    }
    return null;
  }

  private _getSensorValue(metric: string): { value: number; unit: string } | null {
    const slug = this._getSlug();
    // Try common patterns for sensor entity IDs
    const patterns = [
      `sensor.${slug}_${metric}`,
      `sensor.${slug}_soil_${metric}`,
    ];
    for (const id of patterns) {
      const entity = this.hass?.states[id];
      if (entity && entity.state !== 'unavailable' && entity.state !== 'unknown') {
        const val = parseFloat(entity.state);
        if (!isNaN(val)) {
          return { value: val, unit: entity.attributes?.unit_of_measurement || '' };
        }
      }
    }
    return null;
  }

  private _renderPlantSvg(health: PlantHealth, seed: number): string {
    const type = this._plantConfig.plant_type;
    let plant = '';
    switch (type) {
      case 'snake_plant': plant = snakePlantSvg(health, seed); break;
      case 'zz_plant': plant = zzPlantSvg(health, seed); break;
      case 'rubber_plant': plant = rubberPlantSvg(health, seed); break;
      default: plant = snakePlantSvg(health, seed); break;
    }

    // Moisture level for pot soil
    const moisture = this._getSensorValue('moisture');
    const moisturePct = moisture ? clamp(moisture.value, 0, 100) : 50;

    let extras = '';
    // Water droplets when moisture low
    if (health.moistureLow) {
      extras += waterDropSvg(35 + wr(seed, 200) * 3, 95, seed);
      extras += waterDropSvg(65 + wr(seed, 201) * 3, 92, seed + 10);
    }
    // Waterlogged soil line when moisture high
    if (health.moistureHigh) {
      extras += `<path d="M 30 97 Q 40 95 50 97 Q 60 99 70 97" fill="none" stroke="var(--sketch-primary, #4a6fa5)" stroke-width="0.8" opacity="0.4"/>`;
    }
    // Temperature icons
    if (health.tempLow) extras += snowflakeSvg(15, 40);
    if (health.tempHigh) extras += sunSvg(85, 35);
    // Light icon
    if (health.lightLow) extras += cloudSvg(50, 10);

    return `${plant}${potSvg(seed, moisturePct)}${extras}`;
  }

  render() {
    const entity = this.getEntity();
    if (!entity) {
      return html`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Plant not found</p></div></ha-card>`;
    }

    const health = getPlantHealth(entity);
    const isHealthy = health.level === 'thriving';
    const name = this.getName();
    const species = entity.attributes?.species || '';
    const showSpecies = this._plantConfig.show_species !== false;
    const showGauges = this._plantConfig.show_gauges !== false;

    let seed = 0;
    const id = this._config.entity || '';
    for (let i = 0; i < id.length; i++) {
      seed = ((seed << 5) - seed + id.charCodeAt(i)) | 0;
    }
    seed = Math.abs(seed);

    // Build sensor rows
    const metrics = [
      { key: 'moisture', icon: '💧', label: 'Moisture' },
      { key: 'temperature', icon: '🌡', label: 'Temp' },
      { key: 'illuminance', icon: '☀', label: 'Light' },
      { key: 'conductivity', icon: '🧪', label: 'Soil EC' },
      { key: 'humidity', icon: '💨', label: 'Humidity' },
    ];

    const sensorRows = metrics.map((m) => {
      const sensor = this._getSensorValue(m.key);
      if (!sensor) return null;
      const min = this._getThreshold(m.key, 'min');
      const max = this._getThreshold(m.key, 'max');
      let pct: number | null = null;
      if (min !== null && max !== null && max > min) {
        pct = clamp(((sensor.value - min) / (max - min)) * 100, 0, 100);
      }
      const color = health.level === 'thriving' ? 'var(--sketch-success, #4caf50)' :
        health.level === 'stressed' ? 'var(--sketch-warning, #ff9800)' : 'var(--sketch-danger, #f44336)';
      return { icon: m.icon, value: `${sensor.value}${sensor.unit}`, pct, color };
    }).filter(Boolean);

    return html`
      <ha-card>
        ${this.renderSketchBg(400, 300, isHealthy)}
        <div class="sketch-card-content" style="position:relative">
          <div class="plant-layout">
            <div class="plant-svg-col">
              <svg class="plant-svg" viewBox="0 0 100 130">
                ${unsafeSVG(this._renderPlantSvg(health, seed))}
              </svg>
            </div>
            <div class="plant-info-col">
              <div class="plant-name">${name}</div>
              ${showSpecies && species ? html`<div class="plant-species">${species}</div>` : nothing}

              ${sensorRows.map((row: any) => html`
                <div class="sensor-row">
                  <span class="sensor-icon">${row.icon}</span>
                  <span class="sensor-value">${row.value}</span>
                  ${showGauges && row.pct !== null ? html`
                    <div class="sensor-gauge">
                      <div class="sensor-gauge-fill" style="width:${row.pct}%;background:${row.color}"></div>
                    </div>
                  ` : nothing}
                </div>
              `)}

              ${health.problems.length > 0 ? html`
                <div class="problem-banner">
                  ⚠ ${health.problems.join(' · ')}
                </div>
              ` : nothing}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

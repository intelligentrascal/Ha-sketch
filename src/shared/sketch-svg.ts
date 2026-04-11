/**
 * SVG primitives for the sketch aesthetic.
 * Generates hand-drawn borders, paper textures, and decorative elements.
 * Every card gets unique wobble based on its seed (entity name).
 */

/**
 * Seeded pseudo-random number generator for deterministic wobble.
 * Same entity always gets the same "handwriting" style.
 */
function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed * 9301 + index * 49297 + 233280) * 49297;
  return x - Math.floor(x);
}

/**
 * Generate a hand-drawn line segment between two points.
 * Adds natural wobble perpendicular to the line direction.
 */
function sketchLine(
  x1: number, y1: number,
  x2: number, y2: number,
  seed: number,
  segIndex: number,
  wobbleAmount: number = 4
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len < 8) return `L ${x2.toFixed(1)} ${y2.toFixed(1)}`;

  const segments = Math.max(2, Math.floor(len / 35));
  let path = '';

  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const px = x1 + dx * t;
    const py = y1 + dy * t;

    if (i < segments) {
      const nx = -dy / len;
      const ny = dx / len;
      const w = (seededRandom(seed, segIndex * 13 + i) - 0.5) * wobbleAmount * 2;
      path += `L ${(px + nx * w).toFixed(1)} ${(py + ny * w).toFixed(1)} `;
    } else {
      path += `L ${px.toFixed(1)} ${py.toFixed(1)} `;
    }
  }

  return path;
}

/**
 * Generate a complete hand-drawn rectangle path.
 * Each side has independent wobble for natural look.
 * Supports rounded corners via quadratic bezier curves.
 */
function sketchRect(
  x: number, y: number,
  w: number, h: number,
  seed: number,
  wobble: number = 5,
  inset: number = 0,
  cornerRadius: number = 0
): string {
  const l = x + inset;
  const t = y + inset;
  const r = x + w - inset;
  const b = y + h - inset;
  const cr = Math.min(cornerRadius, (r - l) / 3, (b - t) / 3);

  // Slight offset at corners for imperfect closure
  const co = (i: number) => (seededRandom(seed, i + 50) - 0.5) * wobble * 0.6;

  if (cr <= 1) {
    // No rounding — sharp corners
    let path = `M ${(l + co(0)).toFixed(1)} ${(t + co(1)).toFixed(1)} `;
    path += sketchLine(l + co(0), t + co(1), r + co(2), t + co(3), seed, 0, wobble);
    path += sketchLine(r + co(2), t + co(3), r + co(4), b + co(5), seed, 1, wobble);
    path += sketchLine(r + co(4), b + co(5), l + co(6), b + co(7), seed, 2, wobble);
    path += sketchLine(l + co(6), b + co(7), l + co(0), t + co(1), seed, 3, wobble);
    path += 'Z';
    return path;
  }

  // Rounded corners — Q (quadratic bezier) at each corner with slight wobble
  const cw = (i: number) => (seededRandom(seed, i + 80) - 0.5) * wobble * 0.3;

  let path = `M ${(l + cr + cw(0)).toFixed(1)} ${(t + cw(1)).toFixed(1)} `;
  // Top edge
  path += sketchLine(l + cr + cw(0), t + cw(1), r - cr + cw(2), t + cw(3), seed, 0, wobble);
  // Top-right corner
  path += `Q ${(r + cw(4)).toFixed(1)} ${(t + cw(5)).toFixed(1)} ${(r + cw(6)).toFixed(1)} ${(t + cr + cw(7)).toFixed(1)} `;
  // Right edge
  path += sketchLine(r + cw(6), t + cr + cw(7), r + cw(8), b - cr + cw(9), seed, 1, wobble);
  // Bottom-right corner
  path += `Q ${(r + cw(10)).toFixed(1)} ${(b + cw(11)).toFixed(1)} ${(r - cr + cw(12)).toFixed(1)} ${(b + cw(13)).toFixed(1)} `;
  // Bottom edge
  path += sketchLine(r - cr + cw(12), b + cw(13), l + cr + cw(14), b + cw(15), seed, 2, wobble);
  // Bottom-left corner
  path += `Q ${(l + cw(16)).toFixed(1)} ${(b + cw(17)).toFixed(1)} ${(l + cw(18)).toFixed(1)} ${(b - cr + cw(19)).toFixed(1)} `;
  // Left edge
  path += sketchLine(l + cw(18), b - cr + cw(19), l + cw(20), t + cr + cw(21), seed, 3, wobble);
  // Top-left corner
  path += `Q ${(l + cw(22)).toFixed(1)} ${(t + cw(23)).toFixed(1)} ${(l + cr + cw(0)).toFixed(1)} ${(t + cw(1)).toFixed(1)} `;
  path += 'Z';
  return path;
}

/**
 * Render the sketch SVG overlay for a card.
 * Paper texture + hand-drawn double borders + corner doodles + paper fold.
 */
export function renderSketchOverlay(
  w: number,
  h: number,
  options: {
    bgColor?: string;
    overlayColor?: string;
    strokeColor?: string;
    showBorder?: boolean;
    showTexture?: boolean;
    noiseOpacity?: number;
    seed?: number;
    variant?: 'paper' | 'notebook' | 'sticky';
    cornerRadius?: number;
    active?: boolean;
  } = {}
): string {
  const {
    bgColor = 'var(--sketch-card-bg, var(--ha-card-background, #faf7f0))',
    strokeColor = 'var(--sketch-border-color, var(--primary-text-color, #2a2a2a))',
    showBorder = true,
    showTexture = true,
    noiseOpacity = 0.08,
    seed = 0,
    variant = 'paper',
    cornerRadius = 14,
    active = false,
  } = options;

  const margin = 6;
  const cr = cornerRadius;
  const uid = `sn${seed}${Math.floor(seededRandom(seed, 999) * 10000)}`;

  let svg = `<svg class="sketch-bg-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">`;

  // --- Defs ---
  if (showTexture) {
    svg += `<defs>
      <filter id="${uid}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" seed="${seed}" stitchTiles="stitch" result="noise"/>
        <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
      </filter>
    </defs>`;
  }

  // --- Background fill: hand-drawn rounded rectangle ---
  const bgPath = sketchRect(0, 0, w, h, seed, 3, margin - 3, cr);
  svg += `<path d="${bgPath}" fill="${bgColor}" />`;

  // Active state tint — watercolor wash of accent color over paper
  if (active) {
    svg += `<path d="${bgPath}" fill="var(--sketch-active, var(--sketch-primary, #4a6fa5))" opacity="0.10" />`;
  }

  // Paper grain texture
  if (showTexture) {
    svg += `<rect x="0" y="0" width="${w}" height="${h}" filter="url(#${uid})" opacity="${noiseOpacity}" style="mix-blend-mode:multiply" />`;
  }

  // --- Variant-specific elements ---
  if (variant === 'notebook') {
    svg += renderNotebookLines(w, h, strokeColor);
  } else if (variant === 'sticky') {
    svg += renderStickyTape(w);
  }

  // --- Hand-drawn double border ---
  const borderColor = active
    ? 'var(--sketch-active, var(--sketch-primary, #4a6fa5))'
    : strokeColor;

  if (showBorder) {
    // Primary stroke — visible hand-drawn border with rounded corners
    const bd1 = sketchRect(0, 0, w, h, seed, 5, margin, cr);
    svg += `<path d="${bd1}" fill="none" stroke="${borderColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="${active ? '0.75' : '0.65'}" />`;

    // Secondary stroke — offset, thinner, for "overdrawn pencil" look
    const bd2 = sketchRect(0, 0, w, h, seed + 17, 4, margin + 1.8, cr);
    svg += `<path d="${bd2}" fill="none" stroke="${borderColor}" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round" opacity="${active ? '0.30' : '0.22'}" />`;
  }

  // --- Corner decorations ---
  const cs = Math.max(10, Math.min(w, h) * 0.07);

  // Top-left: small cross mark
  const tlx = margin + 5 + seededRandom(seed, 70) * 2;
  const tly = margin + 5 + seededRandom(seed, 71) * 2;
  svg += `<line x1="${tlx - cs * 0.4}" y1="${tly}" x2="${tlx + cs * 0.4}" y2="${tly}" stroke="${strokeColor}" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>`;
  svg += `<line x1="${tlx}" y1="${tly - cs * 0.4}" x2="${tlx}" y2="${tly + cs * 0.4}" stroke="${strokeColor}" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>`;

  // Bottom-right: small circle doodle with incomplete second arc
  const brx = w - margin - 7 + seededRandom(seed, 72) * 2;
  const bry = h - margin - 7 + seededRandom(seed, 73) * 2;
  const dr = cs * 0.35;
  svg += `<circle cx="${brx}" cy="${bry}" r="${dr}" fill="none" stroke="${strokeColor}" stroke-width="1.1" opacity="0.28" />`;
  svg += `<path d="M ${brx - dr * 0.8} ${bry - dr * 0.3} A ${dr} ${dr} 0 0 1 ${brx + dr * 0.5} ${bry + dr * 0.8}" fill="none" stroke="${strokeColor}" stroke-width="0.7" opacity="0.18" />`;

  // --- Paper fold corner (top-right) ---
  const fs = Math.min(18, w * 0.045, h * 0.09);
  const fx = w - margin - fs;
  const fy = margin;
  svg += `<path d="M ${fx} ${fy} L ${w - margin} ${fy} L ${w - margin} ${fy + fs} Z" fill="${strokeColor}" opacity="0.05" />`;
  svg += `<line x1="${fx}" y1="${fy}" x2="${w - margin}" y2="${fy + fs}" stroke="${strokeColor}" stroke-width="0.8" opacity="0.18" stroke-linecap="round"/>`;

  svg += '</svg>';
  return svg;
}

/**
 * Notebook-variant: ruled lines, red margin, ring holes.
 */
export function renderNotebookLines(w: number, h: number, strokeColor: string): string {
  let svg = '';
  const lineSpacing = 28;
  const marginLeft = 50;

  for (let y = 45; y < h - 15; y += lineSpacing) {
    const wobble = Math.sin(y * 0.1) * 0.5;
    svg += `<line x1="${marginLeft + 5}" y1="${y + wobble}" x2="${w - 15}" y2="${y - wobble * 0.5}" stroke="#90c1d4" stroke-width="0.8" opacity="0.35" />`;
  }

  svg += `<line x1="${marginLeft}" y1="8" x2="${marginLeft + 0.5}" y2="${h - 8}" stroke="#d4626a" stroke-width="1.8" opacity="0.35" />`;
  svg += `<line x1="${marginLeft + 2.5}" y1="8" x2="${marginLeft + 2}" y2="${h - 8}" stroke="#d4626a" stroke-width="0.8" opacity="0.18" />`;

  const holeCount = Math.min(6, Math.floor((h - 40) / 45));
  for (let i = 0; i < holeCount; i++) {
    const cy = 35 + i * 45;
    svg += `<circle cx="22" cy="${cy}" r="5" fill="var(--sketch-card-bg, var(--ha-card-background, #faf7f0))" />`;
    svg += `<circle cx="22" cy="${cy}" r="5" fill="none" stroke="${strokeColor}" stroke-width="1.2" opacity="0.3" />`;
    svg += `<circle cx="22.5" cy="${cy + 0.5}" r="4" fill="none" stroke="${strokeColor}" stroke-width="0.5" opacity="0.15" />`;
  }

  return svg;
}

/**
 * Sticky-note variant: tape strip at top.
 */
export function renderStickyTape(w: number): string {
  const cx = w / 2;
  const tw = Math.min(90, w * 0.3);
  const rot = (Math.sin(cx * 0.1) * 2 - 1).toFixed(1);

  return `<g opacity="0.55" transform="rotate(${rot} ${cx} 6)">
    <rect x="${cx - tw / 2}" y="-4" width="${tw}" height="20" fill="#e8e4c8" rx="1" />
    <line x1="${cx - tw / 2 + 4}" y1="2" x2="${cx + tw / 2 - 4}" y2="2" stroke="#c8c4a8" stroke-width="0.4" opacity="0.4" />
    <line x1="${cx - tw / 2 + 4}" y1="8" x2="${cx + tw / 2 - 4}" y2="8" stroke="#c8c4a8" stroke-width="0.4" opacity="0.4" />
  </g>`;
}

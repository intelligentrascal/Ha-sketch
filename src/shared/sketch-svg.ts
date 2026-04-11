/**
 * SVG primitives for the sketch aesthetic.
 * Ported from sketchbook-ui's SketchPaper/SketchBorder pattern to Lit-compatible SVG strings.
 */

/**
 * Generate wobbly rectangle border paths scaled to dimensions.
 * Returns three paths: background fill, primary border, secondary border (offset).
 * The wobble creates the "hand-drawn" look — no two cards look exactly the same.
 */
export function generateSketchPaths(
  w: number,
  h: number,
  seed: number = 0
): { bg: string; bd1: string; bd2: string } {
  // Wobble factor — small random offsets on control points
  const wo = (base: number, i: number) =>
    base + Math.sin(seed * 7.3 + i * 3.7) * 1.5;

  // Background fill path — slightly irregular rectangle
  const bg = `M ${wo(w * 0.055, 0)} ${wo(h * 0.089, 1)}
    C ${wo(w * 0.064, 2)} ${wo(h * 0.067, 3)}, ${wo(w * 0.082, 4)} ${wo(h * 0.056, 5)}, ${wo(w * 0.1, 6)} ${wo(h * 0.056, 7)}
    L ${wo(w * 0.386, 8)} ${wo(h * 0.044, 9)}
    C ${wo(w * 0.418, 10)} ${wo(h * 0.044, 11)}, ${wo(w * 0.445, 12)} ${wo(h * 0.05, 13)}, ${wo(w * 0.477, 14)} ${wo(h * 0.056, 15)}
    L ${wo(w * 0.75, 16)} ${wo(h * 0.067, 17)}
    C ${wo(w * 0.782, 18)} ${wo(h * 0.072, 19)}, ${wo(w * 0.809, 20)} ${wo(h * 0.078, 21)}, ${wo(w * 0.841, 22)} ${wo(h * 0.089, 23)}
    C ${wo(w * 0.864, 24)} ${wo(h * 0.1, 25)}, ${wo(w * 0.886, 26)} ${wo(h * 0.122, 27)}, ${wo(w * 0.9, 28)} ${wo(h * 0.167, 29)}
    L ${wo(w * 0.932, 30)} ${wo(h * 0.311, 31)}
    C ${wo(w * 0.941, 32)} ${wo(h * 0.389, 33)}, ${wo(w * 0.945, 34)} ${wo(h * 0.467, 35)}, ${wo(w * 0.941, 36)} ${wo(h * 0.533, 37)}
    L ${wo(w * 0.936, 38)} ${wo(h * 0.722, 39)}
    C ${wo(w * 0.932, 40)} ${wo(h * 0.778, 41)}, ${wo(w * 0.923, 42)} ${wo(h * 0.833, 43)}, ${wo(w * 0.9, 44)} ${wo(h * 0.867, 45)}
    L ${wo(w * 0.841, 46)} ${wo(h * 0.911, 47)}
    C ${wo(w * 0.809, 48)} ${wo(h * 0.928, 49)}, ${wo(w * 0.773, 50)} ${wo(h * 0.933, 51)}, ${wo(w * 0.741, 52)} ${wo(h * 0.933, 53)}
    L ${wo(w * 0.445, 54)} ${wo(h * 0.944, 55)}
    C ${wo(w * 0.4, 56)} ${wo(h * 0.944, 57)}, ${wo(w * 0.355, 58)} ${wo(h * 0.939, 59)}, ${wo(w * 0.309, 60)} ${wo(h * 0.933, 61)}
    L ${wo(w * 0.127, 62)} ${wo(h * 0.922, 63)}
    C ${wo(w * 0.1, 64)} ${wo(h * 0.917, 65)}, ${wo(w * 0.073, 66)} ${wo(h * 0.9, 67)}, ${wo(w * 0.055, 68)} ${wo(h * 0.867, 69)}
    C ${wo(w * 0.036, 70)} ${wo(h * 0.833, 71)}, ${wo(w * 0.027, 72)} ${wo(h * 0.778, 73)}, ${wo(w * 0.023, 74)} ${wo(h * 0.722, 75)}
    L ${wo(w * 0.018, 76)} ${wo(h * 0.533, 77)}
    C ${wo(w * 0.016, 78)} ${wo(h * 0.444, 79)}, ${wo(w * 0.018, 80)} ${wo(h * 0.356, 81)}, ${wo(w * 0.023, 82)} ${wo(h * 0.278, 83)}
    L ${wo(w * 0.032, 84)} ${wo(h * 0.167, 85)}
    C ${wo(w * 0.036, 86)} ${wo(h * 0.122, 87)}, ${wo(w * 0.045, 88)} ${wo(h * 0.1, 89)}, ${wo(w * 0.055, 90)} ${wo(h * 0.089, 91)} Z`;

  // Primary border — slightly different wobble offset
  const bd1 = `M ${wo(w * 0.05, 100)} ${wo(h * 0.089, 101)}
    C ${wo(w * 0.059, 102)} ${wo(h * 0.061, 103)}, ${wo(w * 0.077, 104)} ${wo(h * 0.061, 105)}, ${wo(w * 0.095, 106)} ${wo(h * 0.058, 107)}
    L ${wo(w * 0.382, 108)} ${wo(h * 0.05, 109)}
    C ${wo(w * 0.414, 110)} ${wo(h * 0.047, 111)}, ${wo(w * 0.441, 112)} ${wo(h * 0.05, 113)}, ${wo(w * 0.473, 114)} ${wo(h * 0.058, 115)}
    L ${wo(w * 0.745, 116)} ${wo(h * 0.072, 117)}
    C ${wo(w * 0.777, 118)} ${wo(h * 0.078, 119)}, ${wo(w * 0.805, 120)} ${wo(h * 0.083, 121)}, ${wo(w * 0.836, 122)} ${wo(h * 0.094, 123)}
    C ${wo(w * 0.859, 124)} ${wo(h * 0.106, 125)}, ${wo(w * 0.882, 126)} ${wo(h * 0.128, 127)}, ${wo(w * 0.895, 128)} ${wo(h * 0.172, 129)}
    L ${wo(w * 0.927, 130)} ${wo(h * 0.317, 131)}
    C ${wo(w * 0.936, 132)} ${wo(h * 0.394, 133)}, ${wo(w * 0.941, 134)} ${wo(h * 0.472, 135)}, ${wo(w * 0.936, 136)} ${wo(h * 0.539, 137)}
    L ${wo(w * 0.932, 138)} ${wo(h * 0.728, 139)}
    C ${wo(w * 0.927, 140)} ${wo(h * 0.783, 141)}, ${wo(w * 0.918, 142)} ${wo(h * 0.839, 143)}, ${wo(w * 0.895, 144)} ${wo(h * 0.872, 145)}
    L ${wo(w * 0.836, 146)} ${wo(h * 0.917, 147)}
    C ${wo(w * 0.805, 148)} ${wo(h * 0.933, 149)}, ${wo(w * 0.768, 150)} ${wo(h * 0.939, 151)}, ${wo(w * 0.736, 152)} ${wo(h * 0.939, 153)}
    L ${wo(w * 0.441, 154)} ${wo(h * 0.95, 155)}
    C ${wo(w * 0.395, 156)} ${wo(h * 0.95, 157)}, ${wo(w * 0.35, 158)} ${wo(h * 0.944, 159)}, ${wo(w * 0.305, 160)} ${wo(h * 0.939, 161)}
    L ${wo(w * 0.123, 162)} ${wo(h * 0.928, 163)}
    C ${wo(w * 0.095, 164)} ${wo(h * 0.922, 165)}, ${wo(w * 0.068, 166)} ${wo(h * 0.906, 167)}, ${wo(w * 0.05, 168)} ${wo(h * 0.872, 169)}
    C ${wo(w * 0.032, 170)} ${wo(h * 0.839, 171)}, ${wo(w * 0.025, 172)} ${wo(h * 0.783, 173)}, ${wo(w * 0.02, 174)} ${wo(h * 0.728, 175)}
    L ${wo(w * 0.016, 176)} ${wo(h * 0.539, 177)}
    C ${wo(w * 0.014, 178)} ${wo(h * 0.45, 179)}, ${wo(w * 0.016, 180)} ${wo(h * 0.361, 181)}, ${wo(w * 0.02, 182)} ${wo(h * 0.283, 183)}
    L ${wo(w * 0.029, 184)} ${wo(h * 0.172, 185)}
    C ${wo(w * 0.034, 186)} ${wo(h * 0.128, 187)}, ${wo(w * 0.043, 188)} ${wo(h * 0.106, 189)}, ${wo(w * 0.05, 190)} ${wo(h * 0.089, 191)} Z`;

  // Secondary border — offset 0.5-1px from primary for "overdrawn" look
  const off = 0.7;
  const bd2 = `M ${wo(w * 0.057 + off, 200)} ${wo(h * 0.094 + off, 201)}
    C ${wo(w * 0.066 + off, 202)} ${wo(h * 0.072 + off, 203)}, ${wo(w * 0.084 + off, 204)} ${wo(h * 0.064 + off, 205)}, ${wo(w * 0.102 + off, 206)} ${wo(h * 0.061 + off, 207)}
    L ${wo(w * 0.389 + off, 208)} ${wo(h * 0.053 + off, 209)}
    C ${wo(w * 0.42 + off, 210)} ${wo(h * 0.05 + off, 211)}, ${wo(w * 0.448 + off, 212)} ${wo(h * 0.056 + off, 213)}, ${wo(w * 0.48 + off, 214)} ${wo(h * 0.061 + off, 215)}
    L ${wo(w * 0.752 + off, 216)} ${wo(h * 0.078 + off, 217)}
    C ${wo(w * 0.784 + off, 218)} ${wo(h * 0.083 + off, 219)}, ${wo(w * 0.811 + off, 220)} ${wo(h * 0.089 + off, 221)}, ${wo(w * 0.843 + off, 222)} ${wo(h * 0.1 + off, 223)}
    C ${wo(w * 0.866 + off, 224)} ${wo(h * 0.111 + off, 225)}, ${wo(w * 0.889 + off, 226)} ${wo(h * 0.133 + off, 227)}, ${wo(w * 0.902 + off, 228)} ${wo(h * 0.178 + off, 229)}
    L ${wo(w * 0.934 + off, 230)} ${wo(h * 0.322 + off, 231)}
    C ${wo(w * 0.943 + off, 232)} ${wo(h * 0.4 + off, 233)}, ${wo(w * 0.948 + off, 234)} ${wo(h * 0.478 + off, 235)}, ${wo(w * 0.943 + off, 236)} ${wo(h * 0.544 + off, 237)}
    L ${wo(w * 0.939 + off, 238)} ${wo(h * 0.733 + off, 239)}
    C ${wo(w * 0.934 + off, 240)} ${wo(h * 0.789 + off, 241)}, ${wo(w * 0.925 + off, 242)} ${wo(h * 0.844 + off, 243)}, ${wo(w * 0.902 + off, 244)} ${wo(h * 0.878 + off, 245)}
    L ${wo(w * 0.843 + off, 246)} ${wo(h * 0.922 + off, 247)}
    C ${wo(w * 0.811 + off, 248)} ${wo(h * 0.939 + off, 249)}, ${wo(w * 0.775 + off, 250)} ${wo(h * 0.944 + off, 251)}, ${wo(w * 0.743 + off, 252)} ${wo(h * 0.944 + off, 253)}
    L ${wo(w * 0.448 + off, 254)} ${wo(h * 0.956 + off, 255)}
    C ${wo(w * 0.402 + off, 256)} ${wo(h * 0.956 + off, 257)}, ${wo(w * 0.357 + off, 258)} ${wo(h * 0.95 + off, 259)}, ${wo(w * 0.311 + off, 260)} ${wo(h * 0.944 + off, 261)}
    L ${wo(w * 0.129 + off, 262)} ${wo(h * 0.933 + off, 263)}
    C ${wo(w * 0.102 + off, 264)} ${wo(h * 0.928 + off, 265)}, ${wo(w * 0.075 + off, 266)} ${wo(h * 0.911 + off, 267)}, ${wo(w * 0.057 + off, 268)} ${wo(h * 0.878 + off, 269)}
    C ${wo(w * 0.039 + off, 270)} ${wo(h * 0.844 + off, 271)}, ${wo(w * 0.03 + off, 272)} ${wo(h * 0.789 + off, 273)}, ${wo(w * 0.025 + off, 274)} ${wo(h * 0.733 + off, 275)}
    L ${wo(w * 0.02 + off, 276)} ${wo(h * 0.544 + off, 277)}
    C ${wo(w * 0.018 + off, 278)} ${wo(h * 0.456 + off, 279)}, ${wo(w * 0.02 + off, 280)} ${wo(h * 0.367 + off, 281)}, ${wo(w * 0.025 + off, 282)} ${wo(h * 0.289 + off, 283)}
    L ${wo(w * 0.034 + off, 284)} ${wo(h * 0.178 + off, 285)}
    C ${wo(w * 0.039 + off, 286)} ${wo(h * 0.133 + off, 287)}, ${wo(w * 0.048 + off, 288)} ${wo(h * 0.111 + off, 289)}, ${wo(w * 0.057 + off, 290)} ${wo(h * 0.094 + off, 291)} Z`;

  return { bg, bd1, bd2 };
}

/**
 * Render the SVG overlay for a card — paper texture + double borders + corner doodle.
 * Returns an SVG string to be placed inside <ha-card> via Lit's unsafeHTML or svg``.
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
  } = {}
): string {
  const {
    bgColor = 'var(--sketch-card-bg, #faf7f0)',
    overlayColor = 'var(--sketch-bg-overlay, #f5f1e8)',
    strokeColor = 'var(--sketch-border-color, #2a2a2a)',
    showBorder = true,
    showTexture = true,
    noiseOpacity = 0.12,
    seed = 0,
  } = options;

  const paths = generateSketchPaths(w, h, seed);

  let svg = `<svg class="sketch-bg-svg" width="100%" height="100%" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;overflow:visible">`;

  // Paper texture: base fill + overlay
  svg += `<path d="${paths.bg}" fill="${bgColor}" />`;
  svg += `<path d="${paths.bg}" fill="${overlayColor}" opacity="0.5" />`;

  // Noise grain texture
  if (showTexture) {
    svg += `<defs><filter id="sn${seed}"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter></defs>`;
    svg += `<rect width="${w}" height="${h}" filter="url(#sn${seed})" opacity="${noiseOpacity}" style="mix-blend-mode:multiply" />`;
  }

  // Double-stroke border (overdrawn pencil effect)
  if (showBorder) {
    svg += `<path d="${paths.bd1}" fill="none" stroke="${strokeColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.85" stroke-dasharray="1,0.5" />`;
    svg += `<path d="${paths.bd2}" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.3" />`;
  }

  // Corner doodle (small circle — replaces geometric L-marks)
  svg += `<circle cx="${w * 0.94}" cy="${h * 0.12}" r="3" stroke="${strokeColor}" stroke-width="1" fill="none" opacity="0.5" />`;

  // Paper fold corner
  svg += `<path d="M ${w - 15} ${1} L ${w - 1} ${1} L ${w - 1} ${15} Z" fill="${overlayColor}" opacity="0.4" />`;

  svg += '</svg>';
  return svg;
}

/**
 * Generate notebook-variant background lines + margin.
 */
export function renderNotebookLines(w: number, h: number, strokeColor: string): string {
  let svg = '';
  // Ruled lines
  const lineSpacing = 30;
  for (let y = 50; y < h - 20; y += lineSpacing) {
    svg += `<line x1="60" y1="${y}" x2="${w - 20}" y2="${y}" stroke="#a8d5e2" stroke-width="1" opacity="0.3" stroke-dasharray="2,1" />`;
  }
  // Red margin line
  svg += `<line x1="55" y1="10" x2="55" y2="${h - 10}" stroke="#e85d75" stroke-width="2" opacity="0.4" />`;
  svg += `<line x1="56" y1="10" x2="56" y2="${h - 10}" stroke="#e85d75" stroke-width="1" opacity="0.2" />`;
  // Ring holes
  for (let i = 0; i < Math.min(8, Math.floor(h / 40)); i++) {
    const y = 40 + i * 40;
    svg += `<circle cx="25" cy="${y}" r="4" fill="#e8e4db" opacity="0.7" />`;
    svg += `<circle cx="25" cy="${y}" r="3" fill="none" stroke="${strokeColor}" stroke-width="1" opacity="0.4" />`;
  }
  return svg;
}

/**
 * Generate sticky-note variant tape strip.
 */
export function renderStickyTape(w: number): string {
  const cx = w / 2;
  return `<g opacity="0.6">
    <rect x="${cx - 40}" y="-3" width="80" height="18" fill="#f5f5dc" rx="2" />
    <rect x="${cx - 40}" y="-3" width="80" height="18" fill="#e8e8d0" opacity="0.4" rx="2" />
    <line x1="${cx - 35}" y1="3" x2="${cx + 35}" y2="3" stroke="#d0d0b8" stroke-width="0.5" opacity="0.5" />
    <line x1="${cx - 35}" y1="9" x2="${cx + 35}" y2="9" stroke="#d0d0b8" stroke-width="0.5" opacity="0.5" />
  </g>`;
}

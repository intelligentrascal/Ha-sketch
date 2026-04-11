# Ha-Sketch — Project Context for Continuation

## Rules

- **Always update documentation**: Every code change MUST include corresponding updates to `README.md` and `CLAUDE.md`. Never skip documentation — it is a mandatory part of every commit.
- **README.md**: User-facing docs — card list, config options, CSS vars, design description, troubleshooting.
- **CLAUDE.md**: Developer context — architecture, design system details, file inventory, version, completed features.
- When adding/removing cards, features, config options, or visual changes: update both files in the same commit.

---

## What This Is

**Ha-Sketch** is a collection of 21 hand-drawn, sketchbook-style custom cards for Home Assistant dashboards. Inspired by [sketchbook-ui](https://github.com/SarthakRawat-1/sketchbook-ui).

- **Repo**: `intelligentrascal/Ha-sketch` (GitHub)
- **Version**: 1.3.7
- **Bundle**: `dist/ha-sketchbook-cards.js` (~150 KB, single ES module)
- **Tech**: Lit 3 + TypeScript, bundled with Rollup, HACS-ready

---

## Architecture

```
src/
├── index.ts                  # Entry point — imports all cards, registers window.customCards
├── shared/
│   ├── base-card.ts          # Abstract LitElement base (hass, setConfig, getEntity, handleAction,
│   │                         #   callService, toggleEntity, fireEvent, renderSketchBg, dark mode detection)
│   ├── styles.ts             # Shared CSS (design tokens, ha-card styling, dark mode, font injection)
│   ├── sketch-svg.ts         # SVG generators: sketchRect(), renderSketchOverlay(), notebook/sticky variants
│   ├── sketch-slider.ts      # Shared <sketch-slider> component
│   ├── types.ts              # All TypeScript interfaces (HomeAssistant, HassEntity, CardConfig, per-card configs)
│   └── utils.ts              # stateIcon(), formatState(), timeAgo(), clamp(), applyAppearance()
├── cards/
│   ├── sketch-entity-card.ts
│   ├── sketch-button-card.ts
│   ├── sketch-light-card.ts
│   ├── sketch-thermostat-card.ts
│   ├── sketch-weather-card.ts
│   ├── sketch-sensor-card.ts
│   ├── sketch-media-player-card.ts
│   ├── sketch-cover-card.ts
│   ├── sketch-alarm-panel-card.ts
│   ├── sketch-clock-card.ts
│   ├── sketch-chip-card.ts
│   ├── sketch-person-card.ts
│   ├── sketch-tile-card.ts
│   ├── sketch-camera-card.ts
│   ├── sketch-popup-card.ts
│   ├── sketch-horizontal-buttons-stack.ts
│   ├── sketch-sub-button-card.ts
│   ├── sketch-separator-card.ts
│   ├── sketch-fan-card.ts
│   ├── sketch-lock-card.ts
│   └── sketch-number-card.ts
├── editors/
│   ├── base-editor.ts              # Shared ha-form editor base (entitySchema, appearanceSchema)
│   └── sketch-*-card-editor.ts     # 21 card editors (one per card)
dist/
└── ha-sketchbook-cards.js          # Built bundle (committed for HACS)
tests/
└── utils.test.ts                   # 14 unit tests (vitest)
```

### Key Patterns

- **Cards extending `BaseSketchCard`** (16 cards): Entity, Button, Light, Thermostat, Weather, Sensor, Media Player, Cover, Alarm Panel, Person, Tile, Camera, Sub-Button, Fan, Lock, Number. These get `hass`, `_config`, `getEntity()`, `getName()`, `handleAction()`, `callService()`, `toggleEntity()`, `fireEvent()`, `renderSketchBg()` for free.
- **Cards extending `LitElement` directly** (5 cards): Clock (no entity), Chip (multiple entities), Popup (modal overlay), Horizontal Buttons Stack (navigation), Separator (pure visual). These import `sharedStyles` manually.
- **SVG overlay rendering**: `BaseSketchCard.renderSketchBg()` injects an SVG overlay inside `<ha-card>` with hand-drawn wobbly borders, paper texture (feTurbulence noise), corner doodles, and paper fold. Each card gets unique wobble via a DJB2 hash of the entity ID as the PRNG seed.
- **Dark mode detection**: `base-card.ts` reads `hass.themes.darkMode` in `updated()` and toggles a `.dark-mode` CSS class for shadow depth adjustments.
- **Visual editors**: All 21 cards have `getConfigElement()` returning ha-form-based editors with entity picker, appearance controls (color, background, border, variant, rotation), and card-specific fields.
- **Popup card**: Uses `window.addEventListener('hashchange')` + `loadCardHelpers()` to dynamically render child HA cards inside a modal panel.
- **Horizontal Buttons Stack**: `position: fixed` footer with torn-paper SVG edge, auto-reorders based on motion sensor entities.

---

## Design System (from sketchbook-ui)

### SVG Overlay (defined in `sketch-svg.ts`)

Every entity card renders an SVG overlay inside `<ha-card>` via `renderSketchBg()`:

1. **Background fill** — hand-drawn rounded rectangle path via `sketchRect()` with 3px wobble and configurable corner radius (default 14, range 0–30, quadratic bezier curves at corners)
2. **Paper texture** — `feTurbulence` fractal noise filter at 8% opacity (`mix-blend-mode: multiply`)
3. **Double-stroke border** — two `sketchRect()` paths with different seeds (5px and 4px wobble), creating an "overdrawn pencil" effect, both with rounded corners
4. **Corner doodles** — cross mark (top-left) and circle with incomplete arc (bottom-right)
5. **Paper fold** — triangular fold with diagonal line (top-right)
6. **Card variants** — `paper` (default), `notebook` (ruled lines + red margin + ring holes), `sticky` (tape strip)
7. **Clean icons** — icon wrappers have no borders or backgrounds; active state uses icon color change only

The `sketchLine()` function splits each edge into segments and displaces midpoints perpendicular to the line direction using a seeded PRNG. Default wobble is 4-5px on a 400x200 viewBox. The `sketchRect()` function supports a `cornerRadius` parameter (configurable via `corner_radius` in card config, 0–30 slider in editor) that draws Q (quadratic bezier) curves at each corner with slight wobble for a natural hand-drawn rounded look.

### CSS Custom Properties (defined in `styles.ts`)
```css
--sketch-bg: var(--ha-card-background, #faf7f0)    /* paper background */
--sketch-ink: var(--primary-text-color, #2a2a2a)    /* primary text */
--sketch-ink-muted: var(--secondary-text-color, ...)
--sketch-ink-light: var(--divider-color, #e8e0d0)
--sketch-primary: var(--primary-color, #4a6fa5)     /* accent color */
--sketch-active: var(--sketch-primary)               /* active/on state */
--sketch-font: 'Caveat', cursive                     /* heading font */
--sketch-font-body: 'Patrick Hand', 'Caveat', cursive
--sketch-card-rotate: -0.5deg                        /* card tilt */
--sketch-card-bg: var(--sketch-bg)                   /* SVG bg fill */
--sketch-border-color: var(--sketch-border)          /* SVG border stroke */
--sketch-radius: 12px                                /* inner element corners */
--sketch-icon-sm/md/lg: 20px / 28px / 44px           /* icon scale */
```

### Visual Effects
- `rotate: var(--sketch-card-rotate)` on `ha-card`
- Stacked drop-shadows (deeper in dark mode via `:host(.dark-mode)`)
- Hover: `translate(-2px,-2px) rotate(-1.5deg)` + `saturate(1.1)`
- SVG hand-drawn rounded borders via `sketchRect()` with double-stroke overlay and Q-curve corners
- Corner doodles via SVG cross marks and circles
- Paper texture via `feTurbulence` noise filter
- Caveat + Patrick Hand fonts injected into `document.head`
- `@media (prefers-reduced-motion: reduce)` disables rotation/transitions
- Entrance animation: `sketch-enter` keyframe (fade up + scale)
- State-change pulse: `sketch-state-pulse` keyframe on entity state diff

---

## 21 Cards Summary

### Core Cards (10)
| Card | Tag | Entity Domain | Key Features |
|------|-----|--------------|--------------|
| Entity | `sketch-entity-card` | any | Icon, name, state badge, last-changed |
| Button | `sketch-button-card` | any | Press animation, icon circle, tap action |
| Light | `sketch-light-card` | `light.*` | Toggle, brightness slider, color temp (kelvin) |
| Thermostat | `sketch-thermostat-card` | `climate.*` | Current/target temp, +/- buttons, HVAC mode buttons |
| Weather | `sketch-weather-card` | `weather.*` | Temp, condition icon, humidity/wind/pressure, 5-day forecast |
| Sensor | `sketch-sensor-card` | `sensor.*` | Value + unit, SVG sparkline (real history via recorder) |
| Media Player | `sketch-media-player-card` | `media_player.*` | Artwork, title/artist, prev/play/next, volume slider, source |
| Cover | `sketch-cover-card` | `cover.*` | Open/stop/close buttons, position slider, tilt slider |
| Alarm Panel | `sketch-alarm-panel-card` | `alarm_control_panel.*` | Numeric keypad, code display, arm/disarm buttons |
| Clock | `sketch-clock-card` | none | SVG analog clock + digital time, date, seconds hand |

### Mobile Cards (4)
| Card | Tag | Key Features |
|------|-----|--------------|
| Chip | `sketch-chip-card` | Array of compact pill buttons, entity/action/template types |
| Person | `sketch-person-card` | Avatar image, home/away status dot, GPS accuracy, battery bar |
| Tile | `sketch-tile-card` | Single-line row with inline toggle switch for toggleable entities |
| Camera | `sketch-camera-card` | Image snapshot, tape-corner decoration, refresh/fullscreen buttons |

### Bubble-Card Inspired (4)
| Card | Tag | Key Features |
|------|-----|--------------|
| Pop-up | `sketch-popup-card` | Hash-triggered modal (`#kitchen`), renders child cards via `loadCardHelpers`, backdrop blur, auto-close |
| Horizontal Buttons Stack | `sketch-horizontal-buttons-stack` | Fixed footer nav, torn-paper SVG edge, scrollable, motion-sensor reorder |
| Sub-Button | `sketch-sub-button-card` | Entity row + collapsible grid of action buttons, per-button entity state |
| Separator | `sketch-separator-card` | SVG wavy line with optional centered label + icon |

### Additional Cards (3)
| Card | Tag | Entity Domain | Key Features |
|------|-----|--------------|--------------|
| Fan | `sketch-fan-card` | `fan.*` | Speed control, on/off toggle |
| Lock | `sketch-lock-card` | `lock.*` | Lock/unlock with optional keypad |
| Number | `sketch-number-card` | `input_number.*` | Slider or +/- buttons for numeric values |

---

## Build & Dev

```bash
npm install          # Install Lit, Rollup, TypeScript
npm run dev          # Watch mode (rollup -c --watch)
npm run build        # Production build → dist/ha-sketchbook-cards.js
npm test             # Run 14 unit tests (vitest)
```

### Build Config
- `rollup.config.mjs`: resolve + commonjs + typescript + terser
- `tsconfig.json`: ES2022 target, experimentalDecorators, useDefineForClassFields: false
- Output: single ES module (`format: 'es'`)

---

## Completed Features

All items from the original roadmap (Priorities 1-5) are done:

- Card editors (all 21 cards, ha-form-based)
- Automation actions (tap, hold 500ms, double-tap 250ms, URL, haptic feedback)
- Dark mode (CSS vars map to HA theme, `hass.themes.darkMode` detection, adjusted shadows)
- Unavailable entity handling (dimmed, disabled controls, "Unavailable" label)
- GitHub Actions CI (build on push, auto-release on version bump in `package.json`)
- Real sensor history (recorder/statistics_during_period with fallback)
- Service call error feedback (red flash animation)
- Confirmation dialog (`confirmation: true`)
- Tap ripple (`.sketch-tap-target`)
- Responsive sizing (`clamp(12px, 3vw, 20px)`)
- Unified active palette (`--sketch-active`)
- Icon sizing scale (`--sketch-icon-sm/md/lg`)
- getLayoutOptions/getCardSize on all cards
- Card-mod theming support
- Entrance animations (sketch-enter keyframe)
- Shared slider component (`<sketch-slider>`)
- Type safety (callWS, WeatherForecast, loadCardHelpers)
- Accessibility (role, tabindex, aria-label, :focus-visible, keyboard support)
- Empty & loading states
- State-change highlight (pulse animation)
- Localization (formatEntityState)
- Unit tests (14 tests for utils.ts)
- SVG sketch aesthetic (wobbly borders, paper texture, corner doodles, variants)
- Entity picture support (`.sketch-entity-picture`)
- Troubleshooting docs

---

## Future — Nice to Have

1. **README Screenshots**: Add card previews, dashboard example, interaction GIF.
2. **Additional Cards**: Vacuum, History Graph, Area/Room summary, Battery overview.
3. **Shared Timer Manager**: Global timer for clock cards to avoid per-card intervals.

---

## HACS Distribution

### Current Files
- `hacs.json` — `{"name": "HA Sketchbook Cards", "render_readme": true, "filename": "ha-sketchbook-cards.js"}`
- `info.md` — HACS listing description
- `dist/ha-sketchbook-cards.js` — committed bundle

### To Publish
1. Create a GitHub Release (tag `v1.3.4`) with `ha-sketchbook-cards.js` attached
2. Add GitHub topics: `home-assistant`, `hacs`, `lovelace`
3. Users add `https://github.com/intelligentrascal/Ha-sketch` as custom repo in HACS → Lovelace

### Manual Install
```yaml
# configuration.yaml or Dashboard Resources
lovelace:
  resources:
    - url: /local/ha-sketchbook-cards.js
      type: module
```

---

## Repos

| Repo | Purpose | Branch |
|------|---------|--------|
| `intelligentrascal/Ha-sketch` | **Primary** — dedicated HACS repo | `main` |
| `intelligentrascal/Alarm_motivate` | Original dev repo | `claude/homeassistant-custom-cards-UCiKN`, `ha-sketch-migrate` |

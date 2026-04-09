# Ha-Sketch — Project Context for Continuation

## What This Is

**Ha-Sketch** is a collection of 18 hand-drawn, sketchbook-style custom cards for Home Assistant dashboards. Inspired by [sketchbook-ui](https://github.com/SarthakRawat-1/sketchbook-ui).

- **Repo**: `intelligentrascal/Ha-sketch` (GitHub)
- **Version**: 1.2.0
- **Bundle**: `dist/ha-sketchbook-cards.js` (111 KB, single ES module)
- **Tech**: Lit 3 + TypeScript, bundled with Rollup, HACS-ready

---

## Architecture

```
src/
├── index.ts                  # Entry point — imports all cards, registers window.customCards
├── shared/
│   ├── base-card.ts          # Abstract LitElement base (hass, setConfig, getEntity, handleAction, fireEvent, callService, toggleEntity)
│   ├── styles.ts             # Shared CSS (design tokens, ha-card styling, font injection into document.head)
│   ├── svg-borders.ts        # roughRect(), roughCircle(), roughUnderline() SVG generators
│   ├── types.ts              # All TypeScript interfaces (HomeAssistant, HassEntity, CardConfig, per-card configs)
│   └── utils.ts              # stateIcon(), formatState(), timeAgo(), clamp()
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
│   └── sketch-separator-card.ts
└── editors/                   # (empty — card editors not yet implemented)
dist/
└── ha-sketchbook-cards.js     # Built bundle (committed for HACS)
```

### Key Patterns

- **Cards extending `BaseSketchCard`**: Entity, Button, Light, Thermostat, Weather, Sensor, Media Player, Cover, Alarm Panel, Person, Tile, Camera, Sub-Button. These get `hass`, `_config`, `getEntity()`, `getName()`, `handleAction()`, `callService()`, `toggleEntity()`, `fireEvent()` for free.
- **Cards extending `LitElement` directly**: Clock (no entity), Chip (multiple entities), Popup (modal overlay), Horizontal Buttons Stack (navigation), Separator (pure visual). These import `sharedStyles` manually.
- **Popup card**: Uses `window.addEventListener('hashchange')` + `loadCardHelpers()` to dynamically render child HA cards inside a modal panel.
- **Horizontal Buttons Stack**: `position: fixed` footer with torn-paper SVG edge, auto-reorders based on motion sensor entities.

---

## Design System (from sketchbook-ui)

### CSS Custom Properties (defined in `styles.ts`)
```css
--sketch-bg: var(--ha-card-background, #faf7f0)    /* cream/paper */
--sketch-ink: var(--primary-text-color, #2a2a2a)    /* near-black */
--sketch-ink-muted: var(--secondary-text-color, rgba(42,42,42,0.5))
--sketch-ink-light: #e8e0d0                          /* warm light gray */
--sketch-primary: var(--primary-color, #4a6fa5)      /* blue accent */
--sketch-success: #4caf50
--sketch-warning: #ff9800
--sketch-danger: #f44336
--sketch-border: var(--divider-color, #2a2a2a)
--sketch-font: 'Caveat', cursive                     /* handwriting */
--sketch-font-body: 'Patrick Hand', 'Caveat', cursive
```

### Visual Effects
- `rotate: -0.5deg` on `ha-card`
- Stacked drop-shadows: `drop-shadow(3px 4px 0px rgba(0,0,0,0.12)) drop-shadow(5px 7px 8px rgba(0,0,0,0.08))`
- Hover: `translate(-1px,-1px) rotate(-0.8deg)` + stronger shadows
- SVG `border-image` with `stroke-dasharray='8 3 2 3'` for hand-drawn borders
- Decorative corner marks via `::before`/`::after` pseudo-elements
- Caveat + Patrick Hand fonts injected into `document.head`
- `@media (prefers-reduced-motion: reduce)` disables rotation/transitions

---

## 18 Cards Summary

### Core Cards (10)
| Card | Tag | Entity Domain | Key Features |
|------|-----|--------------|--------------|
| Entity | `sketch-entity-card` | any | Icon, name, state badge, last-changed |
| Button | `sketch-button-card` | any | Press animation, icon circle, tap action |
| Light | `sketch-light-card` | `light.*` | Toggle, brightness slider, color temp slider |
| Thermostat | `sketch-thermostat-card` | `climate.*` | Current/target temp, +/- buttons, HVAC mode buttons |
| Weather | `sketch-weather-card` | `weather.*` | Temp, condition icon, humidity/wind/pressure, 5-day forecast |
| Sensor | `sketch-sensor-card` | `sensor.*` | Value + unit, SVG sparkline graph (mock history) |
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

---

## Build & Dev

```bash
npm install          # Install Lit, Rollup, TypeScript
npm run dev          # Watch mode (rollup -c --watch)
npm run build        # Production build → dist/ha-sketchbook-cards.js
```

### Build Config
- `rollup.config.mjs`: resolve + commonjs + typescript + terser
- `tsconfig.json`: ES2022 target, experimentalDecorators, useDefineForClassFields: false
- Output: single ES module (`format: 'es'`)

---

## UX/UI Design Review

### Visual Consistency Issues
- **Active state colors are fragmented**: Light card uses `#ffc107` (amber) for "on", button/tile use `var(--sketch-success)` green, thermostat uses custom heating/cooling colors. Need a unified active-state palette.
- **Icon sizes vary**: Shared `.sketch-icon` is `28px`, but light card icon-wrap is `52px`, button card uses `48px`, thermostat mode icons are `20px`. No consistent scale.
- **Slider thumb too small for touch**: `18px` diameter (`styles.ts:154`) — below the 44px minimum for mobile touch targets. Should be at least `24px` with a `44px` tap area.
- **No visual feedback on service calls**: Tapping a toggle or button gives no immediate confirmation. Need a brief ripple, color flash, or scale pulse.

### Interaction Design Gaps
- **Sliders fire on every drag pixel**: Light brightness, cover position, and media volume all call HA services per-pixel. Extremely wasteful — need debounce or `@change` instead of `@input`.
- **No haptic feedback**: Cards don't use HA's `fireEvent('haptic')` on tap. Mobile users get no tactile confirmation.
- **Popup dismissal is click-only**: No ESC key, no swipe-down gesture, no focus trapping. Desktop and accessibility users are stuck.
- **Alarm keypad has no backspace**: Users can only clear the entire code, not fix a single digit.
- **Camera card lacks gesture support**: No pinch-to-zoom, no swipe for PTZ cameras.

### Layout & Spacing Problems
- **Fixed 16px padding everywhere** (`styles.ts:47`): Not responsive. On 320px screens, cards feel cramped. On tablets, too much wasted space.
- **Weather forecast overflows**: `forecast-row` uses `display: flex` + `overflow-x: auto` — horizontal scroll on mobile is poor UX. Should collapse to 3-day or stack vertically.
- **Thermostat buttons overflow narrow cards**: +/- buttons + mode buttons can exceed card width on small grid columns.
- **Person card avatar fixed at 56px**: Doesn't scale with card size.

### Missing States & Feedback
- **No "unavailable" visual treatment**: Entity state `'unavailable'` or `'unknown'` renders the same as "off". Need dashed borders + muted icon + "Unavailable" label.
- **No loading state**: Camera image refresh, popup card loading child cards — zero loading indicators.
- **No empty/error states**: Sensor card with no history data shows nothing. Weather card with no forecast shows nothing. Should show a sketched placeholder ("No data yet").
- **No "just changed" indicator**: When an entity state just changed (e.g., light turned on), there's no brief highlight to draw the user's eye.

### Dark Mode
- Cream palette (`#faf7f0`) is hardcoded. Looks broken on any dark HA theme.
- `--sketch-ink-light: #e8e0d0` is not mapped to an HA theme variable — won't adapt.
- SVG border stroke color is hardcoded `#2a2a2a` in the `border-image` data URI — invisible on dark backgrounds.
- **Fix**: Detect `hass.themes.darkMode` → swap to dark tokens (`--sketch-bg: #1e1e1e`, `--sketch-ink: #e0d8c8`, warm-tinted shadows).

### Config/Documentation UX
- **6 config options declared in types but never implemented**: `hours_to_show`, `detail` (sensor), `camera_view`, `url_path` (action), `compact` (tile), `time_zone` (clock). Users who set these get silent no-ops.
- **Sensor sparkline shows fake data**: `_generateMockHistory()` uses `Math.random()`. Users expect real HA history. This is undocumented — misleading.
- **Zero screenshots in README**: The sketchbook aesthetic is the entire selling point but users can't see it before installing.
- **No troubleshooting section**: No guidance for "cards don't show up" (the most common HA custom card issue).

---

## What's NOT Done Yet (Potential Next Steps)

### Priority 1 — Critical for HACS Release

1. **Card Editors**: `src/editors/` is empty. Each card needs a visual config editor (`-editor` suffix element) implementing `LovelaceCardEditor` with `ha-form`/`ha-selector`. Register via `static getConfigElement()`. Without these, users must write YAML manually — major adoption barrier.
2. **Dark Mode**: Cream palette only works on light backgrounds. Detect `hass.themes.darkMode` and switch to a dark sketch palette (e.g., `--sketch-bg: #1e1e1e`, warm-tinted ink colors, light SVG border strokes). Also fix hardcoded `#2a2a2a` in SVG border-image data URIs. Critical for any user with dark theme.
3. **Unavailable Entity Handling**: Cards don't handle `'unavailable'` / `'unknown'` entity states. A light card with state `'unavailable'` renders as "Off" with no visual distinction. All cards should show a dashed-border "unavailable" state with muted styling + "Unavailable" label.
4. **GitHub Actions CI**: No automated build/release workflow. Need a workflow that builds on push, creates tagged GitHub Releases with the JS bundle attached (required by HACS).
5. **Remove Dead Config Options**: 6 declared but unimplemented config properties (`hours_to_show`, `detail`, `camera_view`, `url_path`, `compact`, `time_zone`) silently no-op. Either implement them or remove from types to avoid user confusion.

### Priority 2 — UX & Robustness

6. **Slider Debouncing**: Light (brightness/color-temp), Cover (position/tilt), and Media Player (volume) sliders fire a service call on every pixel drag — can trigger 100+ calls. Add debounce (~250ms) or switch to `@change` instead of `@input`.
7. **Slider Touch Targets**: Slider thumb is 18px (`styles.ts:154`) — below the 44px mobile minimum. Increase to 24px visible + 44px tap area.
8. **Hold & Double-Tap Actions**: `base-card.ts` `handleAction()` only handles `tap_action`. Config types already declare `hold_action` and `double_tap_action` but they're ignored. Need pointer timing logic + HA `fireEvent('haptic')`.
9. **Haptic Feedback**: No card uses HA's haptic API. Add `fireEvent('haptic', 'light')` on taps and `'medium'` on toggles for tactile mobile feedback.
10. **Real Sensor History**: `sketch-sensor-card.ts` generates fake sparkline data with `Math.random()`. Subscribe to `recorder/statistics` via `hass.connection.subscribeMessage()` for real history.
11. **Service Call Error Feedback**: `base-card.ts` `callService()` is fire-and-forget with no error handling. Add try/catch with a brief visual error indicator (red flash or toast) so users know when actions fail.
12. **Popup Keyboard + Gesture Support**: `sketch-popup-card.ts` modal has no ESC-to-close, no focus trapping, no keyboard navigation, and no swipe-down-to-dismiss. Desktop and accessibility users can't dismiss without clicking backdrop.
13. **Confirmation for Dangerous Actions**: Alarm disarm and cover open trigger immediately on tap. Add optional `confirmation: true` config flag that shows a sketch-styled "Are you sure?" prompt.
14. **Interaction Feedback (Tap Ripple)**: No visual feedback when tapping buttons/toggles. Add a brief scale pulse or ripple animation on tap to confirm the action registered.

### Priority 3 — Polish & Standards

15. **Accessibility (ARIA + Keyboard)**: No ARIA labels on any interactive element. Buttons, sliders, toggles all need `aria-label`, `role`, and keyboard event handlers. Popup needs `role="dialog"` + `aria-modal="true"`. Sliders need `<label for>` association.
16. **Responsive Sizing**: All cards use fixed `padding: 16px` and fixed button sizes (`width: 52px`). Use relative units or container queries for mobile/tablet scaling. Weather forecast should collapse to 3-day on narrow screens. Thermostat buttons overflow on small columns.
17. **Unified Active-State Palette**: Light card uses amber `#ffc107`, button/tile use green `var(--sketch-success)`, thermostat uses custom heating/cooling colors. Define a single `--sketch-active` color (or per-domain overrides) in `styles.ts`.
18. **Consistent Icon Sizing Scale**: Icons range from 20px (thermostat modes) to 52px (light icon-wrap). Define a sizing scale: `--sketch-icon-sm: 20px`, `--sketch-icon-md: 28px`, `--sketch-icon-lg: 44px`.
19. **Empty & Loading States**: Add sketch-styled placeholders for missing data (sensor with no history, weather with no forecast, camera loading). Show a pencil-sketch spinner or "No data yet" illustration.
20. **"Just Changed" Highlight**: Brief glow or pulse when an entity state changes — draws the user's eye to what updated on the dashboard.
21. **`getLayoutOptions()` on All Cards**: No card exposes `getLayoutOptions()` — the HA standard for grid layout hints. Each card should return appropriate `grid_columns` and `grid_rows` based on config.
22. **`getCardSize()` Improvements**: Current values are static. Weather card should return 5 with forecast, 3 without. Popup should return 0. Sub-button should vary by button count.
23. **Card-Mod Theming**: Expose more CSS custom properties (e.g., `--sketch-card-rotate`, `--sketch-shadow-intensity`, `--sketch-border-style`) so users can customize without card-mod.
24. **Animations**: Add sketchbook-ui-style entrance animations (scale-bounce, draw-in, pencil-stroke reveal). Respect `prefers-reduced-motion` — currently only partially handled (rotation/transitions disabled, but scale transforms and timer animations still run).
25. **Localization**: No i18n — all UI strings are English. Could use HA's `hass.localize()` for standard strings.

### Priority 4 — Code Quality

26. **Shared Slider Component**: Same slider pattern (label + range input + service call) is duplicated across light, cover, and media-player cards. Extract to a `<sketch-slider>` shared component.
27. **Centralize Active-State Logic**: "Is entity active?" check (`['on','open','playing','home'].includes(state)`) is copy-pasted in button, sub-button, and tile cards. Move to `utils.ts`.
28. **Deduplicate Icon Maps**: Weather icon mapping exists in both `utils.ts` (`stateIcon()`) and `sketch-weather-card.ts` (`_weatherIconName()`). Single source of truth.
29. **Memoize Sparkline SVG**: `sketch-sensor-card.ts` recalculates `Math.min/max` over the history array on every render. Memoize or compute in `updated()`.
30. **Fix Double Font Loading**: `styles.ts` loads Caveat/Patrick Hand via both `@import` in CSS and a `<link>` tag appended to `document.head`. Remove one.
31. **Type Safety**: `sketch-popup-card.ts` casts `(window as any).loadCardHelpers()`. Weather forecast typed as `any`. Add proper interfaces.
32. **Tests**: No tests exist. Start with unit tests for `utils.ts` (pure functions) and snapshot tests for card rendering.

### Priority 5 — Future Cards, Features & Documentation

33. **README Screenshots**: Zero visuals currently. Add card preview images (one per card type), a dashboard example, and an interaction GIF. The sketchbook aesthetic is the selling point — users need to see it before installing.
34. **Troubleshooting Section**: Add common issues (cards not showing, blank cards, font loading failures) and fixes (clear cache, check resources, HA restart).
35. **Additional Cards**: Vacuum (with map/zones), History Graph (real recorder data), Area/Room summary, Battery overview, Fan card, Lock card, Number/Input card.
36. **Card Presets/Templates**: Allow users to define reusable style presets (e.g., "compact", "large", "minimal") that override default sizing/spacing.
37. **Sketch Intensity Setting**: A global config option to control how "sketchy" cards look — from subtle (slight rotation, light borders) to full sketchbook (heavy rotation, thick dashed borders, paper texture).
38. **Entity Picture Support**: Cards that show entities with `entity_picture` (person, camera) could use a sketch-styled frame (torn edges, tape corners) consistently.

---

## HACS Distribution

### Current Files
- `hacs.json` — `{"name": "HA Sketchbook Cards", "render_readme": true, "filename": "ha-sketchbook-cards.js"}`
- `info.md` — HACS listing description
- `dist/ha-sketchbook-cards.js` — committed bundle

### To Publish
1. Create a GitHub Release (tag `v1.2.0`) with `ha-sketchbook-cards.js` attached
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

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

### Priority 1 — Completed (v1.3.0)

~~1. Card Editors~~ — Done. All 18 cards have ha-form-based visual editors.
~~2. Automation Actions~~ — Done. Hold (500ms), double-tap (250ms), URL, haptic feedback on all 13 entity cards.
~~3. Dark Mode~~ — Done. All CSS vars map to HA theme. Removed hardcoded SVG borders.
~~4. Unavailable Entity Handling~~ — Done. Dotted border, dimmed, disabled controls, "Unavailable" label.
~~5. GitHub Actions CI~~ — Done. Build on push, release on tag.
~~6. Dead Config Options~~ — Done. Removed 5 unused type properties.

### Priority 2 — Completed (v1.3.1)

~~7. Real Sensor History~~ — Done. Fetches from recorder/statistics_during_period, falls back to generated data.
~~8. Service Call Error Feedback~~ — Done. Async try/catch with red flash animation.
~~9. Confirmation Dialog~~ — Done. `confirmation: true` flag on any action config.
~~10. Tap Ripple~~ — Done. `.sketch-tap-target` class with active-state overlay.

### Priority 3 — Completed (v1.3.1)

~~11. Responsive Sizing~~ — Done. Padding uses `clamp(10px, 3vw, 20px)`.
~~12. Unified Active Palette~~ — Done. `--sketch-active` CSS variable.
~~13. Icon Sizing Scale~~ — Done. `--sketch-icon-sm/md/lg` (20/28/44px).
~~14. getLayoutOptions~~ — Done. All 18 cards return grid_columns and grid_rows.
~~15. getCardSize~~ — Done. Weather returns 5 with forecast, 3 without.
~~16. Card-Mod Theming~~ — Done. `--sketch-card-rotate`, `--sketch-border-style`, `--sketch-shadow-intensity`.
~~17. Entrance Animations~~ — Done. `sketch-enter` keyframe, disabled by `prefers-reduced-motion`.

### Priority 4 — Completed (v1.3.1)

~~18. Shared Slider Component~~ — Done. `<sketch-slider>` in `src/shared/sketch-slider.ts`.
~~19. Type Safety~~ — Done. Added `callWS` to HomeAssistant, `WeatherForecast` type, proper `loadCardHelpers` interface.

### Remaining — Completed (v1.3.2)

~~20. Accessibility~~ — Done. `role="button"`, `tabindex="0"`, `aria-label`, `@keydown` (Enter/Space) on all 13 entity cards. `:focus-visible` styles. Popup has `role="dialog"` + `aria-modal`.
~~21. Empty & Loading States~~ — Done. `.sketch-empty` and `.sketch-loading` CSS classes with spinner animation.
~~22. Just-Changed Highlight~~ — Done. State-change pulse animation triggered on entity state diff in `updated()`.
~~23. Localization~~ — Done. `formatState()` uses `hass.formatEntityState()` when available.
~~24. Tests~~ — Done. 14 unit tests for utils.ts (isEntityActive, formatState, timeAgo, clamp, weatherConditionIcon) via vitest.

### Future — Nice to Have

25. **README Screenshots**: Add card previews, dashboard example, interaction GIF.
26. **Troubleshooting Section**: Common issues and fixes.
27. **Additional Cards**: Vacuum, History Graph, Area/Room summary, Battery, Fan, Lock, Number/Input.
28. **Card Presets/Templates**: Reusable style presets ("compact", "large", "minimal").
29. **Sketch Intensity Setting**: Global config for how "sketchy" cards look.
30. **Entity Picture Support**: Sketch-styled frame for entity_picture.

### Priority 5 — Future Cards, Features & Documentation

25. **README Screenshots**: Zero visuals. Add card previews, dashboard example, interaction GIF.
26. **Troubleshooting Section**: Common issues (cards not showing, blank cards, font failures) and fixes.
27. **Additional Cards**: Vacuum, History Graph, Area/Room summary, Battery overview, Fan, Lock, Number/Input.
28. **Card Presets/Templates**: Reusable style presets ("compact", "large", "minimal").
29. **Sketch Intensity Setting**: Global config for how "sketchy" cards look.
30. **Entity Picture Support**: Sketch-styled frame (torn edges, tape corners) for entity_picture.

---

## Card Editor Implementation Plan

Every card needs a `static getConfigElement()` that returns a custom element registered as `sketch-<card>-editor`. HA calls this to render the visual config UI in the dashboard editor. All 18 cards already have `getStubConfig()` but zero have `getConfigElement()`.

### Architecture

```
src/editors/
├── base-editor.ts              # Shared LitElement base for all editors
│                                  - hass property, setConfig(), configChanged() helper
│                                  - Fires 'config-changed' CustomEvent on every edit
│                                  - Shared editor styles (sketch font, spacing)
├── action-editor.ts            # Reusable <sketch-action-editor> for tap/hold/double-tap
│                                  - Dropdown: toggle | call-service | navigate | more-info | url | none
│                                  - Conditional fields: service picker, navigation_path, url_path
├── sketch-entity-card-editor.ts
├── sketch-button-card-editor.ts
├── sketch-light-card-editor.ts
├── ... (one per card)
└── sketch-separator-card-editor.ts
```

### Editor Field Mapping per Card

**Cards extending CardConfig (13 cards)** — all share this base editor form:
| Field | HA Element | Notes |
|-------|-----------|-------|
| `entity` | `ha-entity-picker` | Filter by domain where applicable (light.*, climate.*, etc.) |
| `name` | `ha-textfield` | Optional override of friendly_name |
| `icon` | `ha-icon-picker` | Optional override of entity icon |
| `show_name` | `ha-switch` | Default: true |
| `show_state` | `ha-switch` | Default: true |
| `show_icon` | `ha-switch` | Default: true |
| `tap_action` | `<sketch-action-editor>` | Expandable section |
| `hold_action` | `<sketch-action-editor>` | Expandable section |
| `double_tap_action` | `<sketch-action-editor>` | Expandable section |

**Card-specific extra fields:**

| Card | Extra Fields | Element |
|------|-------------|---------|
| Light | `show_brightness`, `show_color_temp` | `ha-switch` x2 |
| Thermostat | `show_current_as_primary` | `ha-switch` |
| Weather | `show_forecast`, `num_forecasts` | `ha-switch`, `ha-textfield` (number) |
| Sensor | `graph` | `ha-switch` |
| Media Player | `show_artwork`, `show_source` | `ha-switch` x2 |
| Cover | `show_position`, `show_tilt` | `ha-switch` x2 |
| Alarm Panel | `states` | Multi-select checkboxes (arm_home, arm_away, arm_night, arm_custom_bypass) |
| Person | `show_location`, `show_battery`, `battery_entity` | `ha-switch` x2, `ha-entity-picker` (sensor.*) |
| Tile | `hide_icon` | `ha-switch` |
| Camera | `show_controls`, `aspect_ratio` | `ha-switch`, `ha-textfield` |
| Sub-Button | `columns`, `collapsible`, `sub_buttons[]` | `ha-textfield` (number), `ha-switch`, repeating list editor |

**Standalone cards (5 cards)** — custom editors, no shared base form:

| Card | Fields | Element |
|------|--------|---------|
| Clock | `mode`, `show_date`, `show_seconds`, `name` | `ha-select` (analog/digital/both), `ha-switch` x2, `ha-textfield` |
| Chip | `chips[]` array | Repeating list: each chip gets type dropdown + entity picker + icon + name + tap_action |
| Popup | `hash`, `name`, `icon`, `auto_close`, `width`, `cards[]` | `ha-textfield` x3, `ha-textfield` (number), card list editor (advanced) |
| Horizontal Buttons Stack | `style`, `buttons[]` | `ha-select` (fixed/inline), repeating list: name + icon + hash/navigation_path |
| Separator | `name`, `icon` | `ha-textfield`, `ha-icon-picker` |

### Implementation Order (complexity low → high)
1. **Base editor + simple cards**: Separator, Clock, Entity, Button, Tile (least fields)
2. **Toggle-heavy cards**: Light, Cover, Media Player, Sensor, Thermostat, Weather, Person, Camera (boolean toggles + entity picker)
3. **Alarm Panel**: Multi-select states array
4. **Action editor component**: Reusable `<sketch-action-editor>` for tap/hold/double-tap
5. **Array editors**: Sub-Button (sub_buttons[]), Chip (chips[]), Horizontal Buttons Stack (buttons[])
6. **Popup card editor**: Most complex — needs nested card list editor (may use `ha-code-editor` as fallback for `cards[]`)

### Registration Pattern
Each card needs this added:
```typescript
// In the card file (e.g., sketch-light-card.ts)
import '../editors/sketch-light-card-editor';

static getConfigElement() {
  return document.createElement('sketch-light-card-editor');
}
```

---

## Automation / Action Handling Plan

### Current State
`base-card.ts` `handleAction()` (line 58-81) is a basic switch on `tap_action.action`. It only fires on click/tap. 13 cards support action configs but only `tap_action` actually works.

### What Needs to Change

#### 1. Replace custom handleAction() with HA's built-in action handler
HA provides `fireEvent(this, 'hass-action', { config, action })` which handles all action types natively, including haptic feedback. This is simpler and more reliable than reimplementing.

#### 2. Add pointer event handling for hold + double-tap
In `base-card.ts`, add a `handleClick(ev, config)` method:
```
- pointerdown: start hold timer (500ms)
- pointerup before 500ms: count as tap
- pointerup after 500ms: fire hold_action
- Two taps within 250ms: fire double_tap_action
- Single tap after 250ms: fire tap_action
```
This is the same pattern used by HA's official `handle-click.ts` utility.

#### 3. Wire up all 13 entity-based cards
Replace direct `@click` handlers that call `handleAction()` or `toggleEntity()` with the new pointer-aware handler. Cards that have their own primary action (light toggle, thermostat +/-) keep those — the hold/double-tap applies to the card header/icon tap area.

#### 4. Haptic feedback
Add `fireEvent('haptic', 'light')` on tap, `'medium'` on hold, `'success'` on toggle completion.

#### 5. URL action support
Add missing `case 'url'` to open `config.url_path` in a new tab via `window.open()`.

### Cards Affected
| Card | Current tap behavior | hold/double-tap target area |
|------|---------------------|----------------------------|
| Entity | `handleAction()` → more-info | Entire card |
| Button | `handleAction()` → toggle | Entire card |
| Light | `_toggleLight()` on header | Header row (sliders keep own behavior) |
| Thermostat | `fireEvent('hass-more-info')` on header | Header row |
| Weather | `handleAction()` | Entire card |
| Sensor | `handleAction()` | Entire card |
| Media Player | `handleAction()` | Header/artwork area |
| Cover | `handleAction()` | Header row (buttons keep own behavior) |
| Alarm Panel | None (keypad-driven) | Header only |
| Person | `handleAction()` → more-info | Entire card |
| Tile | `handleAction()` → more-info | Row (toggle keeps own behavior) |
| Camera | `handleAction()` → more-info | Image area |
| Sub-Button | `handleAction()` → more-info | Primary row (sub_buttons have own actions) |

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

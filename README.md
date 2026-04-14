# HA Sketchbook Cards

Hand-drawn, sketchbook-style custom cards for Home Assistant dashboards. Inspired by [sketchbook-ui](https://github.com/SarthakRawat-1/sketchbook-ui).

## Cards Included

| Card | Tag | Description |
|------|-----|-------------|
| Entity Card | `sketch-entity-card` | Generic entity state display with icon, name, and state badge |
| Button Card | `sketch-button-card` | Toggle/script/scene activation with tap actions |
| Light Card | `sketch-light-card` | Light on/off with brightness and color temp sliders |
| Thermostat Card | `sketch-thermostat-card` | Climate control with temperature and HVAC mode |
| Weather Card | `sketch-weather-card` | Current conditions and 5-day forecast |
| Sensor Card | `sketch-sensor-card` | Sensor value with sparkline graph |
| Media Player Card | `sketch-media-player-card` | Play/pause/volume with artwork display |
| Cover Card | `sketch-cover-card` | Blinds/cover controls with position slider |
| Alarm Panel Card | `sketch-alarm-panel-card` | Alarm keypad with arm/disarm controls |
| Clock Card | `sketch-clock-card` | Analog/digital clock with date (no entity required) |
| **Chip Card** | `sketch-chip-card` | Compact pills for quick actions and status (mobile top bar) |
| **Person Card** | `sketch-person-card` | Presence card with avatar, location, and device battery |
| **Tile Card** | `sketch-tile-card` | Ultra-compact single-line entity with toggle (mobile-first) |
| **Camera Card** | `sketch-camera-card` | Camera snapshot with refresh and fullscreen controls |
| **Pop-up Card** | `sketch-popup-card` | Hash-triggered slide-up modal for organizing cards |
| **Horizontal Buttons Stack** | `sketch-horizontal-buttons-stack` | Sticky footer nav bar with room buttons |
| **Sub-Button Card** | `sketch-sub-button-card` | Entity card with expandable action button grid |
| **Separator Card** | `sketch-separator-card` | Hand-drawn wavy line divider with optional label |
| **Fan Card** | `sketch-fan-card` | Fan speed control with on/off toggle |
| **Lock Card** | `sketch-lock-card` | Lock/unlock with optional keypad |
| **Number Card** | `sketch-number-card` | Input number/slider for adjustable values |
| **Template Card** | `sketch-template-card` | Dynamic content with Jinja2 templates for text, icons, colors |
| **History Graph Card** | `sketch-history-graph-card` | Mini graph with color thresholds and configurable time range |
| **Room Card** | `sketch-room-card` | Room summary with occupancy and sensor readouts |
| **Select Card** | `sketch-select-card` | Dropdown picker for input_select and select entities |
| **Progress Card** | `sketch-progress-card` | Radial progress ring with hand-drawn wobble |
| **Timeline Card** | `sketch-timeline-card` | Hand-drawn activity journal of recent entity events |
| **TOG Card** | `sketch-tog-card` | Baby sleep TOG recommendation with clothing illustrations |
| **Step Battle Card** | `sketch-step-battle-card` | Fitness competition with VS layout, progress bars, 7-day chart |
| **Plant Card** | `sketch-plant-card` | Living plant illustration with health indicators and sensor gauges |

## Design

All cards feature the sketchbook-ui aesthetic:
- **Caveat + Patrick Hand** handwriting fonts
- **SVG hand-drawn borders** — wobbly double-stroke rounded borders with unique wobble per entity (seeded PRNG)
- **Configurable rounded corners** — SVG borders use quadratic bezier curves with adjustable radius (0–30px via editor slider or YAML)
- **Paper texture** — feTurbulence noise grain overlay for a real paper feel
- **Corner doodles** — cross mark (top-left) and circle sketch (bottom-right) on every card
- **Paper fold** — subtle folded corner detail (top-right)
- **Clean icons** — icons render without borders or backgrounds, state indicated by color change
- **Rotation + drop-shadows** — slight tilt with stacked shadows for depth
- **Hover lift** — cards lift and rotate on hover with stronger shadows
- **Active state tint** — cards with entities that are on/active get a subtle watercolor wash of the accent color on the paper background, with colored SVG borders
- **Dark mode support** — auto-detects `hass.themes.darkMode` and adjusts shadow depth and colors
- **Card variants** — paper (default), notebook (ruled lines + red margin), sticky note (tape strip)
- Fully respects HA theme variables (`--ha-card-background`, `--primary-text-color`, etc.)

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant
2. Go to **Frontend** > **Custom repositories**
3. Add this repository URL and select **Lovelace** category
4. Click **Install**
5. Refresh your browser

### Manual

1. Download `ha-sketchbook-cards.js` from the [latest release](../../releases/latest)
2. Copy to your `config/www/` directory
3. Add the resource in **Settings > Dashboards > Resources**:
   ```
   URL: /local/ha-sketchbook-cards.js
   Type: JavaScript Module
   ```

## Usage

Add cards to your dashboard via YAML or the visual editor:

### Entity Card
```yaml
type: custom:sketch-entity-card
entity: light.living_room
name: Living Room
icon: mdi:lamp
```

### Button Card
```yaml
type: custom:sketch-button-card
entity: switch.porch_light
name: Porch Light
tap_action:
  action: toggle
```

### Light Card
```yaml
type: custom:sketch-light-card
entity: light.bedroom
show_brightness: true
show_color_temp: true
```

### Thermostat Card
```yaml
type: custom:sketch-thermostat-card
entity: climate.living_room
name: Living Room
```

### Weather Card
```yaml
type: custom:sketch-weather-card
entity: weather.home
show_forecast: true
num_forecasts: 5
```

### Sensor Card
```yaml
type: custom:sketch-sensor-card
entity: sensor.temperature
graph: true
```

### Media Player Card
```yaml
type: custom:sketch-media-player-card
entity: media_player.living_room
show_artwork: true
show_source: true
```

### Cover Card
```yaml
type: custom:sketch-cover-card
entity: cover.garage_door
show_position: true
```

### Alarm Panel Card
```yaml
type: custom:sketch-alarm-panel-card
entity: alarm_control_panel.home
states:
  - arm_home
  - arm_away
  - arm_night
```

### Clock Card
```yaml
type: custom:sketch-clock-card
mode: both
show_date: true
show_seconds: true
name: My Clock
```

### Chip Card (Mobile Top Bar)
```yaml
type: custom:sketch-chip-card
chips:
  - type: entity
    entity: light.living_room
    tap_action:
      action: toggle
  - type: entity
    entity: alarm_control_panel.home
  - type: action
    icon: mdi:home
    name: Home
    tap_action:
      action: navigate
      navigation_path: /lovelace/0
```

### Person Card
```yaml
type: custom:sketch-person-card
entity: person.john
show_location: true
show_battery: true
battery_entity: sensor.johns_phone_battery
```

### Tile Card (Compact)
```yaml
type: custom:sketch-tile-card
entity: switch.porch_light
```

### Camera Card
```yaml
type: custom:sketch-camera-card
entity: camera.front_door
show_controls: true
```

### Pop-up Card (Bubble-style Modal)
```yaml
type: custom:sketch-popup-card
hash: kitchen
name: Kitchen
icon: mdi:silverware-fork-knife
auto_close: 30
cards:
  - type: custom:sketch-light-card
    entity: light.kitchen
  - type: custom:sketch-sensor-card
    entity: sensor.kitchen_temperature
  - type: custom:sketch-tile-card
    entity: switch.kitchen_fan
```
Open with `#kitchen` in URL or via navigate action from any card/chip.

### Horizontal Buttons Stack (Footer Nav)
```yaml
type: custom:sketch-horizontal-buttons-stack
style: fixed
buttons:
  - name: Home
    icon: mdi:home
    hash: home
  - name: Lights
    icon: mdi:lightbulb-group
    hash: lights
  - name: Climate
    icon: mdi:thermostat
    hash: climate
  - name: Security
    icon: mdi:shield-home
    hash: security
  - name: Media
    icon: mdi:speaker
    hash: media
```

### Sub-Button Card (Expandable Actions)
```yaml
type: custom:sketch-sub-button-card
entity: light.living_room
collapsible: true
columns: 3
sub_buttons:
  - entity: light.lamp
    name: Lamp
  - icon: mdi:movie
    name: Movie Mode
    tap_action:
      action: call-service
      service: scene.turn_on
      service_data:
        entity_id: scene.movie
  - icon: mdi:power
    name: All Off
    tap_action:
      action: call-service
      service: light.turn_off
      service_data:
        entity_id: all
```

### Separator Card
```yaml
type: custom:sketch-separator-card
name: Lighting
icon: mdi:lightbulb
```

### Fan Card
```yaml
type: custom:sketch-fan-card
entity: fan.bedroom
show_speed: true
```

### Lock Card
```yaml
type: custom:sketch-lock-card
entity: lock.front_door
```

### Number Card
```yaml
type: custom:sketch-number-card
entity: input_number.volume
show_slider: true
```

### Template Card (Jinja2)
```yaml
type: custom:sketch-template-card
primary: "{% if now().hour < 12 %}Good morning{% else %}Good evening{% endif %}"
secondary: "{{ now().strftime('%A, %B %-d') }}"
icon: mdi:home
icon_color: "{% if now().hour < 6 %}deep-purple{% else %}amber{% endif %}"
layout: horizontal
multiline_secondary: true
```

### History Graph Card
```yaml
type: custom:sketch-history-graph-card
name: Temperature
entities:
  - sensor.living_room_temperature
hours_to_show: 24
fill: fade
color_thresholds:
  - value: 18
    color: "#42A5F5"
  - value: 22
    color: "#66BB6A"
  - value: 26
    color: "#FFA726"
```

### Room Card
```yaml
type: custom:sketch-room-card
entity: binary_sensor.living_room_occupancy
name: Living Room
icon: mdi:sofa
tap_action:
  action: navigate
  navigation_path: "#living-room"
sub_entities:
  - entity: sensor.living_room_temperature
    icon: mdi:thermometer
  - entity: sensor.living_room_humidity
    icon: mdi:water-percent
```

### Select Card
```yaml
type: custom:sketch-select-card
entity: input_select.baby_sleep_room
name: Sleep Room
```

### Progress Card
```yaml
type: custom:sketch-progress-card
entity: sensor.daily_steps
name: Steps Today
max: 10000
icon: mdi:walk
```

### Timeline Card
```yaml
type: custom:sketch-timeline-card
name: Recent Activity
entities:
  - binary_sensor.front_door
  - light.living_room
  - switch.coffee_machine
hours_to_show: 4
max_entries: 8
variant: notebook
```

### TOG Card (Baby Sleep)
```yaml
type: custom:sketch-tog-card
temperature_entity: sensor.bedroom_temperature
room_select_entity: input_select.baby_sleep_room
name: Baby Sleep Guide
```

### Plant Card
```yaml
type: custom:sketch-plant-card
entity: plant.snake_plant
plant_type: snake_plant
sensors:
  - moisture
  - temperature
show_species: true
show_gauges: true
```

**Plant Card Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Plant entity ID (`plant.*`) |
| `plant_type` | string | **required** | `snake_plant`, `zz_plant`, or `rubber_plant` |
| `sensors` | string[] | auto-detect | Which sensors to show: `moisture`, `temperature`, `illuminance`, `conductivity`, `humidity`. Empty = auto-detect from plant entity |
| `show_species` | boolean | `true` | Show species name (italic, from entity attributes) |
| `show_gauges` | boolean | `true` | Show sensor gauge bars alongside values |

**Sensor selection:** By default, the card auto-detects which sensors are configured on the plant entity (by checking which `_status` attributes are present). You can override this with the `sensors` list to show only specific sensors. Problems are only flagged for sensors in the active list.

**Sensor icons & units:**

| Sensor | Icon | Unit | Entity pattern |
|--------|------|------|----------------|
| Moisture | 💧 | % | `sensor.<slug>_soil_moisture` |
| Temperature | 🌡 | °C | `sensor.<slug>_temperature` |
| Illuminance | ☀ | lx | `sensor.<slug>_illuminance` |
| Conductivity | 🧪 | µS/cm | `sensor.<slug>_conductivity` |
| Humidity | 💨 | % | `sensor.<slug>_air_humidity` |

**Health indicators:**

| Indicator | Thriving (OK) | Stressed (1 issue) | Critical (2+ issues) |
|-----------|---------------|--------------------|-----------------------|
| **Plant SVG color** | Green (`--sketch-success`) | Orange (`--sketch-warning`) | Red (`--sketch-danger`) |
| **Name badge** | None | **(!)** circle | **(!!)** pulsing circle |
| **Gauge bar** | Green fill | Red fill (per sensor) | Red fill (per sensor) |
| **Sensor value text** | Normal | Red for out-of-range sensors | Red for out-of-range sensors |
| **Problem banner** | Hidden | Shows issue (e.g. "Moisture low") | Shows all issues |
| **Paper tint** | Active accent wash | None | None |

**SVG plant reactions:**

| Condition | Snake Plant | ZZ Plant | Rubber Plant |
|-----------|------------|----------|--------------|
| **Moisture low** | Leaves droop 18px, 3 water drop doodles near leaves | Stems arch outward | Leaves angle down 35° |
| **Low light** | Leaf opacity 40%, cloud doodle above | Leaf opacity 40%, cloud doodle | Leaf opacity 40%, cloud doodle |
| **Cold** | Snowflake doodle (left side) | Snowflake doodle | Snowflake doodle |
| **Hot** | Sun doodle (right side) | Sun doodle | Sun doodle |
| **Stressed** | Leaves spread wider (18°) | Stems shorter (85%), arch flatter | Only 5 leaves, slight droop |
| **Critical** | Leaves spread wide (30°), 75% height | Stems 70% height, arch outward | Only 3 leaves, 35° droop |

**Threshold auto-discovery:** Sensor thresholds are auto-discovered from `number.<slug>_min_soil_moisture`, `number.<slug>_max_temperature`, etc. (matches Olen's Plant integration naming). When threshold entities don't exist, fallback ranges are used: moisture 15–65%, temperature 10–35°C, illuminance 500–30,000 lx, conductivity 100–2,000 µS/cm, humidity 30–70%.

### Step Battle Card
```yaml
type: custom:sketch-step-battle-card
player1_name: Player 1
player1_entity: sensor.player1_daily_steps
player2_name: Player 2
player2_entity: sensor.player2_daily_steps
goal: 10000
name: Step Battle
```

## Configuration Options

### Common Options (all entity cards)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity ID |
| `name` | string | entity friendly name | Display name |
| `icon` | string | auto-detected | MDI icon override |
| `show_name` | boolean | `true` | Show entity name |
| `show_state` | boolean | `true` | Show entity state |
| `show_icon` | boolean | `true` | Show icon |
| `tap_action` | object | `more-info` | Action on tap |
| `hold_action` | object | none | Action on long press (500ms) |
| `double_tap_action` | object | none | Action on double tap |

### Appearance Options (all entity cards)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `color` | string | theme primary | Accent color for icons and active states |
| `card_background` | string | theme card bg | Card background color |
| `border_color` | string | theme text | SVG border stroke color |
| `card_rotation` | string | `-0.5deg` | Card tilt (e.g. `0deg`, `-1deg`) |
| `corner_radius` | number | `14` | Corner roundness (0 = sharp, 30 = very round) |
| `show_border` | boolean | `true` | Show hand-drawn SVG borders |
| `show_texture` | boolean | `true` | Show paper grain noise texture |
| `variant` | string | `paper` | Card style: `paper`, `notebook`, or `sticky` |

### Clock Card Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | string | `both` | `analog`, `digital`, or `both` |
| `show_date` | boolean | `true` | Show date below clock |
| `show_seconds` | boolean | `true` | Show seconds hand/digits |
| `name` | string | none | Optional label above clock |

## Customizing Appearance

Every card exposes CSS custom properties you can override per-card using [card-mod](https://github.com/thomasloven/lovelace-card-mod) or globally via your HA theme.

### Per-Card Styling (card-mod)

```yaml
type: custom:sketch-light-card
entity: light.bedroom
card_mod:
  style: |
    :host {
      --sketch-card-rotate: 0deg;          /* no rotation */
      --sketch-border-style: solid;        /* solid instead of dashed */
      --sketch-border-width: 1px;          /* thinner border */
      --sketch-border-color: #888;         /* custom border color */
      --sketch-card-bg: #f0f0f0;           /* custom background */
      --sketch-corner-opacity: 0;          /* hide corner marks */
      --sketch-radius: 16px;               /* rounder corners */
    }
```

### Available CSS Custom Properties

Card borders are drawn via SVG (not CSS borders), so `show_border` in the card config is the primary way to control them. These CSS properties control other visual aspects:

| Property | Default | Description |
|----------|---------|-------------|
| `--sketch-card-rotate` | `-0.5deg` | Card rotation. Set `0deg` for straight cards |
| `--sketch-card-bg` | theme card bg | Card background fill color (SVG) |
| `--sketch-border-color` | theme text | SVG border stroke color |
| `--sketch-radius` | `12px` | Border radius for inner elements |
| `--sketch-ink` | theme text | Primary text color |
| `--sketch-ink-muted` | theme secondary | Muted text color |
| `--sketch-primary` | theme primary | Accent color (icons, sliders, active states) |
| `--sketch-active` | `--sketch-primary` | Active/on state color |
| `--sketch-font` | `Caveat` | Heading font family |
| `--sketch-font-body` | `Patrick Hand` | Body font family |
| `--sketch-icon-sm` | `20px` | Small icon size |
| `--sketch-icon-md` | `28px` | Medium icon size (default) |
| `--sketch-icon-lg` | `44px` | Large icon size |
| `--sketch-border-style` | `dashed` | Border style for buttons and inner elements |
| `--sketch-border-width` | `2px` | Border width for buttons and inner elements |

### Global Theme Override

Apply to all sketch cards at once via your HA theme (`configuration.yaml`):

```yaml
frontend:
  themes:
    sketch-minimal:
      sketch-card-rotate: "0deg"
      sketch-border-style: "solid"
      sketch-border-width: "1px"
      sketch-corner-opacity: "0"
```

### Preset Examples

**Minimal (no sketch rotation):**
```yaml
type: custom:sketch-entity-card
entity: light.bedroom
card_rotation: "0deg"
show_border: false
show_texture: false
```

**Notebook style:**
```yaml
type: custom:sketch-entity-card
entity: light.bedroom
variant: notebook
```

**Sticky note:**
```yaml
type: custom:sketch-entity-card
entity: light.bedroom
variant: sticky
card_background: "#fff9c4"
```

**Custom colors via card-mod:**
```yaml
type: custom:sketch-light-card
entity: light.bedroom
card_mod:
  style: |
    :host {
      --sketch-card-rotate: -1.2deg;
      --sketch-primary: #e91e63;
    }
```

## Troubleshooting

### Cards don't appear in the card picker
- Clear your browser cache (Ctrl+Shift+R)
- Check **Settings > Dashboards > Resources** — the JS file must be registered as type **JavaScript Module**
- Restart Home Assistant if you just installed via HACS

### Cards show "Custom element doesn't exist"
- The resource URL is wrong. For manual install: `/local/ha-sketchbook-cards.js`
- For HACS: the resource is auto-registered — try removing and re-adding the integration

### Cards look broken on dark theme
- Cards auto-detect dark mode via `hass.themes.darkMode` and adjust shadow depth accordingly
- SVG borders and backgrounds use HA theme CSS variables (`--ha-card-background`, `--primary-text-color`) which adapt to any theme
- If colors still look off, ensure your theme defines `--ha-card-background` and `--primary-text-color`
- After updating, always clear your browser cache (Ctrl+Shift+R)

### Visual editor toggles don't work
- Make sure you're on Ha-sketch v1.3.0+. Earlier versions had editor bugs
- If switches still don't respond, try switching to YAML mode and back

### Fonts not loading (plain text instead of handwriting)
- The Caveat and Patrick Hand fonts load from Google Fonts. Check your network/firewall allows `fonts.googleapis.com`
- If behind a proxy, the fonts won't load — cards will fall back to system cursive fonts

### Card actions not firing (tap/hold/double-tap)
- `tap_action` defaults to `more-info` for most cards, `toggle` for light and button cards
- `hold_action` and `double_tap_action` only fire if explicitly configured
- For `call-service` action, use format: `service: domain.service_name`

### Sensor sparkline shows generated data
- Real history requires the `recorder` integration with statistics enabled for your sensor
- If your sensor doesn't have `state_class` configured, the card falls back to generated data

## Development

```bash
npm install
npm run dev    # Watch mode
npm run build  # Production build
npm test       # Run unit tests
```

## License

MIT

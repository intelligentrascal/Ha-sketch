## Ha-Sketch Showcase Dashboard

Copy this YAML into a new HA dashboard view (raw config editor) to see every card at its best.

> **Note:** Replace entity IDs with your own. If an entity doesn't exist, the card will show "unavailable" — that's fine, you'll still see the visual styling.

```yaml
views:
  - title: Sketch Showcase
    path: sketch-showcase
    type: sections
    max_columns: 4
    sections:

      # ── Quick Controls ──────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-chip-card
            chips:
              - type: entity
                entity: light.living_room
                icon: mdi:sofa
                name: Living
                tap_action:
                  action: toggle
              - type: entity
                entity: light.kitchen
                icon: mdi:silverware-fork-knife
                name: Kitchen
                tap_action:
                  action: toggle
              - type: entity
                entity: alarm_control_panel.home
                icon: mdi:shield-home
                name: Alarm
              - type: action
                icon: mdi:weather-night
                name: Goodnight
                tap_action:
                  action: call-service
                  service: scene.turn_on
                  service_data:
                    entity_id: scene.goodnight

      # ── Lighting ─────────────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: Lighting
            icon: mdi:lightbulb-group

          - type: custom:sketch-light-card
            entity: light.living_room
            name: Living Room
            show_brightness: true
            show_color_temp: true
            color: "#e8a87c"
            corner_radius: 16

          - type: custom:sketch-light-card
            entity: light.bedroom
            name: Bedroom
            show_brightness: true
            show_color_temp: true
            color: "#7c77b9"
            corner_radius: 16

          - type: custom:sketch-button-card
            entity: switch.porch_light
            name: Porch Light
            icon: mdi:coach-lamp
            color: "#d4a574"
            corner_radius: 18
            tap_action:
              action: toggle

          - type: custom:sketch-button-card
            entity: light.kitchen
            name: Kitchen
            icon: mdi:ceiling-light
            color: "#85cdca"
            corner_radius: 18
            tap_action:
              action: toggle

      # ── Climate ──────────────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: Climate
            icon: mdi:thermostat

          - type: custom:sketch-thermostat-card
            entity: climate.living_room
            name: Living Room
            show_current_as_primary: true
            color: "#e27d60"
            corner_radius: 14

          - type: custom:sketch-weather-card
            entity: weather.home
            name: Local Weather
            show_forecast: true
            num_forecasts: 5
            corner_radius: 14
            variant: notebook

      # ── Sensors ──────────────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: Environment
            icon: mdi:thermometer

          - type: custom:sketch-sensor-card
            entity: sensor.living_room_temperature
            name: Temperature
            graph: true
            color: "#e8a87c"
            corner_radius: 12

          - type: custom:sketch-sensor-card
            entity: sensor.living_room_humidity
            name: Humidity
            graph: true
            color: "#41b3a3"
            corner_radius: 12

          - type: custom:sketch-sensor-card
            entity: sensor.power_consumption
            name: Power
            icon: mdi:flash
            graph: true
            color: "#f6d55c"
            corner_radius: 12

      # ── People ───────────────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: People
            icon: mdi:account-group

          - type: custom:sketch-person-card
            entity: person.john
            name: John
            show_location: true
            show_battery: true
            battery_entity: sensor.johns_phone_battery
            color: "#4a6fa5"
            corner_radius: 16

          - type: custom:sketch-person-card
            entity: person.jane
            name: Jane
            show_location: true
            show_battery: true
            battery_entity: sensor.janes_phone_battery
            color: "#e27d60"
            corner_radius: 16

      # ── Media ────────────────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: Media
            icon: mdi:speaker

          - type: custom:sketch-media-player-card
            entity: media_player.living_room
            name: Living Room Speaker
            show_artwork: true
            show_source: true
            color: "#7c77b9"
            corner_radius: 14

          - type: custom:sketch-media-player-card
            entity: media_player.bedroom
            name: Bedroom Speaker
            show_artwork: true
            color: "#e8a87c"
            corner_radius: 14

      # ── Security ─────────────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: Security
            icon: mdi:shield-lock

          - type: custom:sketch-alarm-panel-card
            entity: alarm_control_panel.home
            name: Home Alarm
            states:
              - arm_home
              - arm_away
              - arm_night
            color: "#e27d60"
            corner_radius: 14

          - type: custom:sketch-lock-card
            entity: lock.front_door
            name: Front Door
            icon: mdi:door
            color: "#41b3a3"
            corner_radius: 16

          - type: custom:sketch-lock-card
            entity: lock.back_door
            name: Back Door
            icon: mdi:door-sliding
            color: "#d4a574"
            corner_radius: 16

          - type: custom:sketch-camera-card
            entity: camera.front_door
            name: Front Door Cam
            show_controls: true
            aspect_ratio: "16/9"
            corner_radius: 14

      # ── Covers & Fans ───────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: Covers & Fans
            icon: mdi:blinds

          - type: custom:sketch-cover-card
            entity: cover.living_room_blinds
            name: Living Room Blinds
            show_position: true
            show_tilt: true
            color: "#85cdca"
            corner_radius: 14

          - type: custom:sketch-fan-card
            entity: fan.bedroom
            name: Bedroom Fan
            show_speed: true
            color: "#4a6fa5"
            corner_radius: 16

          - type: custom:sketch-number-card
            entity: input_number.volume
            name: Speaker Volume
            show_slider: true
            icon: mdi:volume-high
            color: "#7c77b9"
            corner_radius: 14

      # ── Quick Tiles ─────────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: Quick Toggles
            icon: mdi:toggle-switch

          - type: custom:sketch-tile-card
            entity: switch.porch_light
            name: Porch Light
            color: "#d4a574"
            corner_radius: 20

          - type: custom:sketch-tile-card
            entity: light.hallway
            name: Hallway
            color: "#e8a87c"
            corner_radius: 20

          - type: custom:sketch-tile-card
            entity: switch.coffee_maker
            name: Coffee Maker
            icon: mdi:coffee
            color: "#85cdca"
            corner_radius: 20

          - type: custom:sketch-tile-card
            entity: fan.office
            name: Office Fan
            color: "#4a6fa5"
            corner_radius: 20

      # ── Expandable Controls ─────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: Scene Controls
            icon: mdi:palette

          - type: custom:sketch-sub-button-card
            entity: light.living_room
            name: Living Room Scenes
            collapsible: true
            columns: 3
            color: "#e8a87c"
            corner_radius: 14
            sub_buttons:
              - icon: mdi:white-balance-sunny
                name: Bright
                tap_action:
                  action: call-service
                  service: scene.turn_on
                  service_data:
                    entity_id: scene.bright
              - icon: mdi:movie
                name: Movie
                tap_action:
                  action: call-service
                  service: scene.turn_on
                  service_data:
                    entity_id: scene.movie
              - icon: mdi:weather-night
                name: Night
                tap_action:
                  action: call-service
                  service: scene.turn_on
                  service_data:
                    entity_id: scene.night
              - icon: mdi:book-open-variant
                name: Reading
                tap_action:
                  action: call-service
                  service: scene.turn_on
                  service_data:
                    entity_id: scene.reading
              - icon: mdi:party-popper
                name: Party
                tap_action:
                  action: call-service
                  service: scene.turn_on
                  service_data:
                    entity_id: scene.party
              - icon: mdi:power
                name: All Off
                tap_action:
                  action: call-service
                  service: light.turn_off
                  service_data:
                    entity_id: all

      # ── Clock & Entity ──────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-clock-card
            mode: both
            show_date: true
            show_seconds: true
            name: Home

          - type: custom:sketch-entity-card
            entity: sun.sun
            name: Sun
            icon: mdi:weather-sunny
            color: "#f6d55c"
            corner_radius: 16

          - type: custom:sketch-entity-card
            entity: sensor.processor_use
            name: CPU Usage
            icon: mdi:chip
            color: "#41b3a3"
            corner_radius: 16

      # ── Variant Showcase ────────────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: Card Styles
            icon: mdi:draw

          - type: custom:sketch-entity-card
            entity: light.living_room
            name: Paper (default)
            variant: paper
            corner_radius: 14
            color: "#4a6fa5"

          - type: custom:sketch-entity-card
            entity: light.bedroom
            name: Notebook
            variant: notebook
            corner_radius: 14
            color: "#e27d60"

          - type: custom:sketch-entity-card
            entity: light.kitchen
            name: Sticky Note
            variant: sticky
            corner_radius: 8
            color: "#85cdca"

      # ── Corner Radius Showcase ──────────────────────
      - title: ""
        cards:
          - type: custom:sketch-separator-card
            name: Corner Roundness
            icon: mdi:rounded-corner

          - type: custom:sketch-button-card
            entity: switch.porch_light
            name: Sharp (0)
            corner_radius: 0
            color: "#e27d60"
            tap_action:
              action: toggle

          - type: custom:sketch-button-card
            entity: light.kitchen
            name: Medium (14)
            corner_radius: 14
            color: "#7c77b9"
            tap_action:
              action: toggle

          - type: custom:sketch-button-card
            entity: light.bedroom
            name: Round (25)
            corner_radius: 25
            color: "#41b3a3"
            tap_action:
              action: toggle

      # ── Pop-up (hash triggered) ─────────────────────
      - title: ""
        cards:
          - type: custom:sketch-popup-card
            hash: kitchen-popup
            name: Kitchen Controls
            icon: mdi:silverware-fork-knife
            auto_close: 60
            cards:
              - type: custom:sketch-light-card
                entity: light.kitchen
                show_brightness: true
                color: "#85cdca"
                corner_radius: 14
              - type: custom:sketch-sensor-card
                entity: sensor.kitchen_temperature
                name: Kitchen Temp
                graph: true
                color: "#e8a87c"
                corner_radius: 14
              - type: custom:sketch-tile-card
                entity: switch.coffee_maker
                name: Coffee
                icon: mdi:coffee
                color: "#d4a574"
                corner_radius: 18

  # ── Footer Navigation ────────────────────────────
  - title: Nav
    path: nav
    type: panel
    cards:
      - type: custom:sketch-horizontal-buttons-stack
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

### Tips
- **Open the popup**: Navigate to `#kitchen-popup` in the URL bar
- **Active state tint**: Toggle a light or switch — the card background will glow with the accent color
- **Dark mode**: All cards auto-adapt — try switching your HA theme
- **Customise colors**: Each card has its own `color` — change them to match your room themes
- **Corner radius**: Drag the slider in the editor (0 = sharp, 30 = pill-shaped)

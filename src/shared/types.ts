export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(domain: string, service: string, data?: Record<string, any>): Promise<void>;
  callWS(msg: Record<string, any>): Promise<any>;
  themes: { darkMode: boolean };
  language: string;
  localize(key: string, ...args: any[]): string;
  formatEntityState(entity: HassEntity): string;
  formatEntityAttributeValue(entity: HassEntity, attribute: string): string;
  connection: {
    subscribeMessage(callback: (msg: any) => void, msg: Record<string, any>): Promise<() => void>;
  };
}

export interface WeatherForecast {
  datetime: string;
  condition: string;
  temperature: number;
  templow?: number;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
  context: { id: string };
}

export interface CardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  show_name?: boolean;
  show_state?: boolean;
  show_icon?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  /* Appearance overrides */
  color?: string;
  card_background?: string;
  border_color?: string;
  card_rotation?: string;
  corner_radius?: number;
  show_border?: boolean;
  show_texture?: boolean;
  variant?: 'paper' | 'notebook' | 'sticky';
}

export interface ActionConfig {
  action: 'toggle' | 'call-service' | 'navigate' | 'more-info' | 'none' | 'url';
  service?: string;
  service_data?: Record<string, any>;
  navigation_path?: string;
  url_path?: string;
}

export interface LightCardConfig extends CardConfig {
  show_brightness?: boolean;
  show_color_temp?: boolean;
}

export interface ThermostatCardConfig extends CardConfig {
  show_current_as_primary?: boolean;
}

export interface WeatherCardConfig extends CardConfig {
  show_forecast?: boolean;
  num_forecasts?: number;
}

export interface SensorCardConfig extends CardConfig {
  graph?: boolean;
}

export interface MediaPlayerCardConfig extends CardConfig {
  show_artwork?: boolean;
  show_source?: boolean;
}

export interface CoverCardConfig extends CardConfig {
  show_position?: boolean;
  show_tilt?: boolean;
}

export interface AlarmPanelCardConfig extends CardConfig {
  states?: string[];
}

export interface ClockCardConfig {
  type: string;
  name?: string;
  mode?: 'analog' | 'digital' | 'both';
  time_format?: '12h' | '24h';
  show_date?: boolean;
  show_seconds?: boolean;
  /* appearance */
  color?: string;
  card_background?: string;
  border_color?: string;
  card_rotation?: string;
  corner_radius?: number;
  show_border?: boolean;
  show_texture?: boolean;
  variant?: 'paper' | 'notebook' | 'sticky';
}

export interface ChipCardConfig {
  type: string;
  chips: ChipConfig[];
}

export interface ChipConfig {
  type: 'entity' | 'action' | 'template';
  entity?: string;
  icon?: string;
  name?: string;
  content?: string;
  tap_action?: ActionConfig;
}

export interface PersonCardConfig extends CardConfig {
  show_location?: boolean;
  show_battery?: boolean;
  battery_entity?: string;
}

export interface TileCardConfig extends CardConfig {
  hide_icon?: boolean;
}

export interface CameraCardConfig extends CardConfig {
  show_controls?: boolean;
  aspect_ratio?: string;
}

export interface PopupCardConfig {
  type: string;
  hash: string;
  name?: string;
  icon?: string;
  auto_close?: number;
  width?: string;
  cards?: any[];
}

export interface HorizontalButtonsStackConfig {
  type: string;
  buttons: NavButton[];
  style?: 'fixed' | 'inline';
}

export interface NavButton {
  name: string;
  icon: string;
  hash?: string;
  navigation_path?: string;
  entity?: string;
}

export interface SubButtonCardConfig extends CardConfig {
  sub_buttons: SubButton[];
  columns?: number;
  collapsible?: boolean;
}

export interface SubButton {
  entity?: string;
  icon?: string;
  name?: string;
  show_state?: boolean;
  tap_action?: ActionConfig;
}

export interface FanCardConfig extends CardConfig {
  show_speed?: boolean;
}

export interface LockCardConfig extends CardConfig {
  show_keypad?: boolean;
}

export interface NumberCardConfig extends CardConfig {
  show_slider?: boolean;
}

export interface SeparatorCardConfig {
  type: string;
  name?: string;
  icon?: string;
}

/* ── New cards ── */

export interface TemplateCardConfig extends CardConfig {
  primary?: string;
  secondary?: string;
  icon_color?: string;
  badge_icon?: string;
  badge_color?: string;
  layout?: 'horizontal' | 'vertical';
  multiline_secondary?: boolean;
}

export interface HistoryGraphCardConfig {
  type: string;
  name?: string;
  entities: string[];
  hours_to_show?: number;
  color_thresholds?: Array<{ value: number; color: string }>;
  fill?: 'fade' | 'solid' | 'none';
  line_width?: number;
  show_labels?: boolean;
  /* appearance */
  color?: string;
  card_background?: string;
  border_color?: string;
  card_rotation?: string;
  corner_radius?: number;
  show_border?: boolean;
  show_texture?: boolean;
  variant?: 'paper' | 'notebook' | 'sticky';
}

export interface RoomCardConfig extends CardConfig {
  sub_entities?: Array<{ entity: string; icon?: string }>;
}

export interface SelectCardConfig extends CardConfig {}

export interface ProgressCardConfig extends CardConfig {
  max?: number;
  color_thresholds?: Array<{ value: number; color: string }>;
}

export interface TimelineCardConfig {
  type: string;
  name?: string;
  entities: string[];
  hours_to_show?: number;
  max_entries?: number;
  /* appearance */
  color?: string;
  card_background?: string;
  border_color?: string;
  card_rotation?: string;
  corner_radius?: number;
  show_border?: boolean;
  show_texture?: boolean;
  variant?: 'paper' | 'notebook' | 'sticky';
}

export interface TogCardConfig extends CardConfig {
  temperature_entity: string;
  room_select_entity?: string;
}

export interface PlantCardConfig extends CardConfig {
  plant_type: 'snake_plant' | 'zz_plant' | 'rubber_plant' | 'cactus' | 'pothos';
  show_species?: boolean;
  show_gauges?: boolean;
}

export interface StepBattleCardConfig {
  type: string;
  name?: string;
  player1_name?: string;
  player1_entity: string;
  player1_person?: string;
  player1_picture?: string;
  player2_name?: string;
  player2_entity: string;
  player2_person?: string;
  player2_picture?: string;
  goal?: number;
  /* appearance */
  color?: string;
  card_background?: string;
  border_color?: string;
  card_rotation?: string;
  corner_radius?: number;
  show_border?: boolean;
  show_texture?: boolean;
  variant?: 'paper' | 'notebook' | 'sticky';
}

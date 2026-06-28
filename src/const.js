export const CARD_VERSION = '0.1.0';
export const CARD_NAME = 'midea-thermostat-card';
export const EDITOR_NAME = 'midea-thermostat-card-editor';

// Child component element names.
export const DIAL_NAME = 'mt-dial';
export const MODE_CHIPS_NAME = 'mt-mode-chips';
export const TOGGLE_DROPDOWN_NAME = 'mt-toggle-dropdown';
export const COLLAPSIBLE_ROW_NAME = 'mt-collapsible-row';
export const SENSOR_CHIPS_NAME = 'mt-sensor-chips';

// Default config sections (merged over by user config in core/config.js).
export const DEFAULT_FEATURES = {
  hvac_modes: true,
  quick_toggles: ['eco_mode', 'boost_mode', 'sleep_mode'],
  fan: 'auto',
  swing: 'auto',
  preset: 'auto',
  sensors: [], // opt-in, hidden by default
  extra_switches: [],
};

export const DEFAULT_DIAL = {
  draggable: true,
  step: 1,
};

// Known midea_ac_lan attribute keys per domain (device type AC), with mdi icons.
export const MIDEA_KEYS = {
  switch: {
    aux_heating: 'mdi:heat-wave',
    boost_mode: 'mdi:turbine',
    breezeless: 'mdi:tailwind',
    comfort_mode: 'mdi:alpha-c-circle',
    dry: 'mdi:air-filter',
    eco_mode: 'mdi:leaf-circle',
    frost_protect: 'mdi:snowflake-alert',
    indirect_wind: 'mdi:tailwind',
    natural_wind: 'mdi:tailwind',
    prompt_tone: 'mdi:bell',
    power: 'mdi:power',
    screen_display: 'mdi:television-ambient-light',
    screen_display_alternate: 'mdi:television-ambient-light',
    sleep_mode: 'mdi:power-sleep',
    out_silent: 'mdi:hvac-off',
    smart_eye: 'mdi:eye',
    swing_horizontal: 'mdi:arrow-split-vertical',
    swing_vertical: 'mdi:arrow-split-horizontal',
    anion: 'mdi:vanish',
    sound: 'mdi:volume-high',
    self_clean: 'mdi:air-filter',
  },
  sensor: {
    indoor_humidity: 'mdi:water-percent',
    indoor_temperature: 'mdi:thermometer',
    outdoor_temperature: 'mdi:thermometer',
    total_energy_consumption: 'mdi:lightning-bolt',
    current_energy_consumption: 'mdi:lightning-bolt',
    realtime_power: 'mdi:flash',
    pmv: 'mdi:thermometer-lines',
    error_code: 'mdi:alert-box',
  },
  select: {
    wind_lr_angle: 'mdi:pan-horizontal',
    wind_ud_angle: 'mdi:pan-vertical',
  },
  number: {
    fan_speed: 'mdi:fan',
  },
};

// Switch keys that map to "swing"-like controls (used when climate has no swing_modes).
export const SWING_SWITCH_KEYS = ['swing_vertical', 'swing_horizontal'];
// Select keys that map to wind angle controls.
export const WIND_ANGLE_SELECT_KEYS = ['wind_ud_angle', 'wind_lr_angle'];
// Switch keys that map to "preset"-like controls (used when climate has no preset_modes).
export const PRESET_SWITCH_KEYS = ['comfort_mode', 'breezeless'];

// HVAC mode -> mdi icon.
export const HVAC_MODE_ICONS = {
  off: 'mdi:power',
  cool: 'mdi:snowflake',
  heat: 'mdi:white-balance-sunny',
  dry: 'mdi:water-percent',
  fan_only: 'mdi:fan',
  auto: 'mdi:autorenew',
  heat_cool: 'mdi:sun-snowflake-variant',
};

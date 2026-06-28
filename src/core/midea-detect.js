import {
  SWING_SWITCH_KEYS,
  WIND_ANGLE_SELECT_KEYS,
  PRESET_SWITCH_KEYS,
} from '../const.js';

function domainOf(entityId) {
  return entityId.split('.')[0];
}

function isOn(stateObj) {
  return stateObj?.state === 'on';
}

const EMPTY = () => ({
  climate: undefined,
  deviceId: undefined,
  hvacModes: [],
  quickToggles: [],
  fan: { source: null },
  swing: { source: null },
  preset: { source: null },
  sensors: [],
  extraSwitches: [],
});

/**
 * Inspect the device that owns config.entity and resolve which controls the
 * card should render. Never throws: a missing device/entity yields empties.
 */
export function detectFeatures(hass, config) {
  if (!hass || !config || !config.entity) return EMPTY();

  const states = hass.states || {};
  const entities = hass.entities || {};
  const climate = states[config.entity];
  const reg = entities[config.entity];
  const deviceId = reg?.device_id;

  const siblings = deviceId
    ? Object.values(entities).filter((e) => e && e.device_id === deviceId)
    : [];

  // Resolve a sibling entity_id by domain + midea attribute key.
  const findEntity = (domain, key) => {
    const match = siblings.find((e) => {
      const id = e.entity_id;
      if (!id || domainOf(id) !== domain) return false;
      if (e.translation_key === key) return true;
      return id.endsWith(`_${key}`);
    });
    return match && match.entity_id;
  };

  const features = config.features || {};
  const attrs = (climate && climate.attributes) || {};

  // --- HVAC modes ---
  const hvacModes =
    features.hvac_modes === false ? [] : attrs.hvac_modes || [];

  // --- Quick toggles (switches) ---
  const mapSwitches = (keys) =>
    (keys || [])
      .map((key) => {
        const entityId = findEntity('switch', key);
        if (!entityId || !states[entityId]) return null;
        return { key, entityId, isOn: isOn(states[entityId]) };
      })
      .filter(Boolean);

  const quickToggles = mapSwitches(features.quick_toggles);
  const extraSwitches = mapSwitches(features.extra_switches);

  // --- Fan ---
  let fan = { source: null };
  const fanPref = features.fan ?? 'auto';
  if (fanPref !== 'hidden') {
    const wantClimate = fanPref === 'climate' || fanPref === 'auto';
    const wantNumber = fanPref === 'number' || fanPref === 'auto';
    if (wantClimate && Array.isArray(attrs.fan_modes) && attrs.fan_modes.length) {
      fan = {
        source: 'climate',
        entityId: config.entity,
        modes: attrs.fan_modes,
        current: attrs.fan_mode,
      };
    } else if (wantNumber) {
      const entityId = findEntity('number', 'fan_speed');
      const s = entityId && states[entityId];
      if (s) {
        fan = {
          source: 'number',
          entityId,
          min: Number(s.attributes?.min ?? 1),
          max: Number(s.attributes?.max ?? 100),
          step: Number(s.attributes?.step ?? 1),
          current: Number(s.state),
        };
      }
    }
  }

  // --- Swing ---
  let swing = { source: null };
  const swingPref = features.swing ?? 'auto';
  if (swingPref !== 'hidden') {
    const wantClimate = swingPref === 'climate' || swingPref === 'auto';
    const wantSwitches = swingPref === 'switches' || swingPref === 'auto';
    if (
      wantClimate &&
      Array.isArray(attrs.swing_modes) &&
      attrs.swing_modes.length
    ) {
      swing = {
        source: 'climate',
        entityId: config.entity,
        modes: attrs.swing_modes,
        current: attrs.swing_mode,
      };
    } else if (wantSwitches) {
      const switches = mapSwitches(SWING_SWITCH_KEYS);
      const selects = WIND_ANGLE_SELECT_KEYS.map((key) => {
        const entityId = findEntity('select', key);
        const s = entityId && states[entityId];
        if (!s) return null;
        return {
          key,
          entityId,
          options: s.attributes?.options || [],
          current: s.state,
        };
      }).filter(Boolean);
      if (switches.length || selects.length) {
        swing = { source: 'switches', switches, selects };
      }
    }
  }

  // --- Preset ---
  let preset = { source: null };
  const presetPref = features.preset ?? 'auto';
  if (presetPref !== 'hidden') {
    const wantClimate = presetPref === 'climate' || presetPref === 'auto';
    const wantSwitches = presetPref === 'switches' || presetPref === 'auto';
    if (
      wantClimate &&
      Array.isArray(attrs.preset_modes) &&
      attrs.preset_modes.length
    ) {
      preset = {
        source: 'climate',
        entityId: config.entity,
        modes: attrs.preset_modes,
        current: attrs.preset_mode,
      };
    } else if (wantSwitches) {
      const switches = mapSwitches(PRESET_SWITCH_KEYS);
      if (switches.length) preset = { source: 'switches', switches };
    }
  }

  // --- Sensors (opt-in) ---
  const sensors = (features.sensors || [])
    .map((key) => {
      const entityId = findEntity('sensor', key);
      if (!entityId || !states[entityId]) return null;
      return { key, entityId, stateObj: states[entityId] };
    })
    .filter(Boolean);

  return {
    climate,
    deviceId,
    hvacModes,
    quickToggles,
    fan,
    swing,
    preset,
    sensors,
    extraSwitches,
  };
}

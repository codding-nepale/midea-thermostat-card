import { describe, it, expect } from 'vitest';
import { detectFeatures } from '../src/core/midea-detect.js';
import { normalizeConfig } from '../src/core/config.js';

// Build a hass-like fixture for one midea_ac_lan AC device (device_id 'dev1').
function buildHass(overrides = {}) {
  const climateAttrs = {
    hvac_modes: ['off', 'cool', 'heat', 'dry', 'fan_only', 'auto'],
    fan_modes: ['auto', 'low', 'medium', 'high'],
    fan_mode: 'high',
    swing_modes: ['off', 'vertical', 'horizontal', 'both'],
    swing_mode: 'off',
    current_temperature: 25.5,
    temperature: 19,
    min_temp: 16,
    max_temp: 30,
    ...(overrides.climateAttrs || {}),
  };

  const reg = (entity_id, extra = {}) => ({
    entity_id,
    device_id: 'dev1',
    ...extra,
  });

  const entities = {
    'climate.clim': reg('climate.clim'),
    'switch.clim_eco_mode': reg('switch.clim_eco_mode'),
    'switch.clim_boost_mode': reg('switch.clim_boost_mode'),
    'switch.clim_sleep_mode': reg('switch.clim_sleep_mode'),
    'switch.clim_swing_vertical': reg('switch.clim_swing_vertical'),
    'switch.clim_comfort_mode': reg('switch.clim_comfort_mode'),
    'number.clim_fan_speed': reg('number.clim_fan_speed'),
    'sensor.clim_indoor_humidity': reg('sensor.clim_indoor_humidity'),
    // a sibling on a different device should be ignored
    'switch.other_eco_mode': reg('switch.other_eco_mode', { device_id: 'dev2' }),
  };

  const st = (state, attributes = {}) => ({ state, attributes });
  const states = {
    'climate.clim': st('cool', climateAttrs),
    'switch.clim_eco_mode': st('on'),
    'switch.clim_boost_mode': st('off'),
    'switch.clim_sleep_mode': st('off'),
    'switch.clim_swing_vertical': st('off'),
    'switch.clim_comfort_mode': st('off'),
    'number.clim_fan_speed': st('60', { min: 1, max: 100, step: 1 }),
    'sensor.clim_indoor_humidity': st('55', { unit_of_measurement: '%' }),
  };

  return { states, entities };
}

describe('detectFeatures', () => {
  it('reads hvac modes from the climate entity', () => {
    const hass = buildHass();
    const cfg = normalizeConfig({ entity: 'climate.clim' });
    const f = detectFeatures(hass, cfg);
    expect(f.deviceId).toBe('dev1');
    expect(f.hvacModes).toEqual([
      'off',
      'cool',
      'heat',
      'dry',
      'fan_only',
      'auto',
    ]);
  });

  it('returns only requested quick toggles that exist, with on-state', () => {
    const hass = buildHass();
    const cfg = normalizeConfig({ entity: 'climate.clim' });
    const f = detectFeatures(hass, cfg);
    const keys = f.quickToggles.map((t) => t.key);
    expect(keys).toEqual(['eco_mode', 'boost_mode', 'sleep_mode']);
    expect(f.quickToggles.find((t) => t.key === 'eco_mode').isOn).toBe(true);
    expect(f.quickToggles.find((t) => t.key === 'boost_mode').isOn).toBe(false);
    // does not pick the switch from the other device
    expect(f.quickToggles.every((t) => t.entityId.startsWith('switch.clim_'))).toBe(true);
  });

  it('prefers the climate fan_modes over the number entity', () => {
    const hass = buildHass();
    const cfg = normalizeConfig({ entity: 'climate.clim' });
    const f = detectFeatures(hass, cfg);
    expect(f.fan.source).toBe('climate');
    expect(f.fan.modes).toContain('high');
  });

  it('falls back to the number fan_speed when climate has no fan_modes', () => {
    const hass = buildHass({ climateAttrs: { fan_modes: undefined } });
    const cfg = normalizeConfig({ entity: 'climate.clim' });
    const f = detectFeatures(hass, cfg);
    expect(f.fan.source).toBe('number');
    expect(f.fan.entityId).toBe('number.clim_fan_speed');
    expect(f.fan.max).toBe(100);
  });

  it('falls back to swing switches when climate has no swing_modes', () => {
    const hass = buildHass({ climateAttrs: { swing_modes: undefined } });
    const cfg = normalizeConfig({ entity: 'climate.clim' });
    const f = detectFeatures(hass, cfg);
    expect(f.swing.source).toBe('switches');
    expect(f.swing.switches.map((s) => s.key)).toContain('swing_vertical');
  });

  it('uses preset switches when climate has no preset_modes', () => {
    const hass = buildHass();
    const cfg = normalizeConfig({ entity: 'climate.clim' });
    const f = detectFeatures(hass, cfg);
    expect(f.preset.source).toBe('switches');
    expect(f.preset.switches.map((s) => s.key)).toContain('comfort_mode');
  });

  it('hides sensors by default and shows them when opted in', () => {
    const hass = buildHass();
    const def = detectFeatures(hass, normalizeConfig({ entity: 'climate.clim' }));
    expect(def.sensors).toEqual([]);

    const opted = detectFeatures(
      hass,
      normalizeConfig({
        entity: 'climate.clim',
        features: { sensors: ['indoor_humidity'] },
      })
    );
    expect(opted.sensors).toHaveLength(1);
    expect(opted.sensors[0].entityId).toBe('sensor.clim_indoor_humidity');
  });

  it('honors hidden overrides', () => {
    const hass = buildHass();
    const f = detectFeatures(
      hass,
      normalizeConfig({ entity: 'climate.clim', features: { fan: 'hidden' } })
    );
    expect(f.fan.source).toBe(null);
  });

  it('never throws for an unknown device', () => {
    const hass = { states: {}, entities: {} };
    const f = detectFeatures(hass, normalizeConfig({ entity: 'climate.ghost' }));
    expect(f.hvacModes).toEqual([]);
    expect(f.fan.source).toBe(null);
    expect(f.quickToggles).toEqual([]);
  });
});

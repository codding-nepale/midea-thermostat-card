import { describe, it, expect, vi } from 'vitest';
import {
  setTemperature,
  setHvacMode,
  setFanMode,
  setSwingMode,
  setPresetMode,
  setNumber,
  selectOption,
  toggleSwitch,
} from '../src/core/ha-actions.js';

function spyHass() {
  return { callService: vi.fn() };
}

describe('ha-actions', () => {
  it('setTemperature calls climate.set_temperature', () => {
    const h = spyHass();
    setTemperature(h, 'climate.x', 21);
    expect(h.callService).toHaveBeenCalledWith('climate', 'set_temperature', {
      entity_id: 'climate.x',
      temperature: 21,
    });
  });

  it('setHvacMode calls climate.set_hvac_mode', () => {
    const h = spyHass();
    setHvacMode(h, 'climate.x', 'cool');
    expect(h.callService).toHaveBeenCalledWith('climate', 'set_hvac_mode', {
      entity_id: 'climate.x',
      hvac_mode: 'cool',
    });
  });

  it('setFanMode / setSwingMode / setPresetMode use the right services', () => {
    const h = spyHass();
    setFanMode(h, 'climate.x', 'high');
    setSwingMode(h, 'climate.x', 'both');
    setPresetMode(h, 'climate.x', 'eco');
    expect(h.callService).toHaveBeenNthCalledWith(1, 'climate', 'set_fan_mode', {
      entity_id: 'climate.x',
      fan_mode: 'high',
    });
    expect(h.callService).toHaveBeenNthCalledWith(2, 'climate', 'set_swing_mode', {
      entity_id: 'climate.x',
      swing_mode: 'both',
    });
    expect(h.callService).toHaveBeenNthCalledWith(3, 'climate', 'set_preset_mode', {
      entity_id: 'climate.x',
      preset_mode: 'eco',
    });
  });

  it('setNumber calls number.set_value', () => {
    const h = spyHass();
    setNumber(h, 'number.fan', 60);
    expect(h.callService).toHaveBeenCalledWith('number', 'set_value', {
      entity_id: 'number.fan',
      value: 60,
    });
  });

  it('selectOption calls select.select_option', () => {
    const h = spyHass();
    selectOption(h, 'select.angle', 'Up');
    expect(h.callService).toHaveBeenCalledWith('select', 'select_option', {
      entity_id: 'select.angle',
      option: 'Up',
    });
  });

  it('toggleSwitch picks turn_on / turn_off', () => {
    const h = spyHass();
    toggleSwitch(h, 'switch.eco', true);
    toggleSwitch(h, 'switch.eco', false);
    expect(h.callService).toHaveBeenNthCalledWith(1, 'switch', 'turn_on', {
      entity_id: 'switch.eco',
    });
    expect(h.callService).toHaveBeenNthCalledWith(2, 'switch', 'turn_off', {
      entity_id: 'switch.eco',
    });
  });
});

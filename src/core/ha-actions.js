// Thin wrappers around hass.callService for the services this card uses.

export function setTemperature(hass, entity, temperature) {
  return hass.callService('climate', 'set_temperature', {
    entity_id: entity,
    temperature,
  });
}

export function setHvacMode(hass, entity, hvac_mode) {
  return hass.callService('climate', 'set_hvac_mode', {
    entity_id: entity,
    hvac_mode,
  });
}

export function setFanMode(hass, entity, fan_mode) {
  return hass.callService('climate', 'set_fan_mode', {
    entity_id: entity,
    fan_mode,
  });
}

export function setSwingMode(hass, entity, swing_mode) {
  return hass.callService('climate', 'set_swing_mode', {
    entity_id: entity,
    swing_mode,
  });
}

export function setPresetMode(hass, entity, preset_mode) {
  return hass.callService('climate', 'set_preset_mode', {
    entity_id: entity,
    preset_mode,
  });
}

export function setNumber(hass, entity, value) {
  return hass.callService('number', 'set_value', { entity_id: entity, value });
}

export function selectOption(hass, entity, option) {
  return hass.callService('select', 'select_option', {
    entity_id: entity,
    option,
  });
}

export function toggleSwitch(hass, entity, on) {
  return hass.callService('switch', on ? 'turn_on' : 'turn_off', {
    entity_id: entity,
  });
}

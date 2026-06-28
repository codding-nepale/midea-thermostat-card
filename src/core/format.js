// Display helpers. Entity/state strings prefer HA's own localized formatters
// (so they follow the user's HA language) and degrade gracefully.
import { localize } from '../localize/localize.js';

export function formatEntityState(hass, stateObj) {
  if (hass && typeof hass.formatEntityState === 'function' && stateObj) {
    try {
      return hass.formatEntityState(stateObj);
    } catch (e) {
      /* fall through */
    }
  }
  return stateObj ? stateObj.state : '';
}

export function formatAttributeValue(hass, stateObj, attribute) {
  if (
    hass &&
    typeof hass.formatEntityAttributeValue === 'function' &&
    stateObj
  ) {
    try {
      return hass.formatEntityAttributeValue(stateObj, attribute);
    } catch (e) {
      /* fall through */
    }
  }
  const value = stateObj && stateObj.attributes && stateObj.attributes[attribute];
  return humanize(value);
}

/** Prettify a raw value/option: "fan_only" -> "Fan only". */
export function humanize(value) {
  if (value == null) return '';
  const s = String(value).replace(/_/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Localize one possible value of an entity attribute (e.g. a single fan_mode
 * option) using Home Assistant's own component translation keys, so option
 * lists follow the user's HA language. Falls back to a humanized value.
 */
export function localizeAttrValue(hass, domain, attribute, value) {
  if (hass && typeof hass.localize === 'function') {
    const key = `component.${domain}.entity_component._.state_attributes.${attribute}.state.${value}`;
    const s = hass.localize(key);
    if (s) return s;
  }
  return humanize(value);
}

/** Localize one possible entity state value (e.g. an hvac mode). */
export function localizeStateValue(hass, domain, value) {
  if (hass && typeof hass.localize === 'function') {
    const s = hass.localize(`component.${domain}.entity_component._.state.${value}`);
    if (s) return s;
  }
  return humanize(value);
}

/**
 * Label for a Midea attribute key (eco_mode, boost_mode, swing_vertical…).
 * Uses the card's own translations (attr.<key>) so toggle/preset chips are
 * localized; falls back to a humanized key.
 */
export function attrLabel(hass, key) {
  const k = `attr.${key}`;
  const v = localize(hass, k);
  return v === k ? humanize(key) : v;
}

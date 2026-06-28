// Display helpers. Entity/state strings prefer HA's own localized formatters
// (so they follow the user's HA language) and degrade gracefully.

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

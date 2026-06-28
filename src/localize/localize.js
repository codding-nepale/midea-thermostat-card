import { LANGUAGES } from './languages/index.js';

/** Resolve the active HA UI language, defaulting to English. */
export function resolveLanguage(hass) {
  return (hass && (hass.locale?.language || hass.language)) || 'en';
}

/**
 * Translate a card-chrome key for the active HA language.
 * Falls back to English, then to the key itself. Entity/state strings should
 * use hass.formatEntityState instead — they are localized by HA directly.
 */
export function localize(hass, key) {
  const lang = resolveLanguage(hass);
  const table = LANGUAGES[lang] || {};
  const en = LANGUAGES.en || {};
  return table[key] ?? en[key] ?? key;
}

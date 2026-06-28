import { describe, it, expect } from 'vitest';
import {
  localizeAttrValue,
  localizeStateValue,
  attrLabel,
} from '../src/core/format.js';

const haStrings = {
  'component.climate.entity_component._.state_attributes.fan_mode.state.high': 'Élevée',
  'component.climate.entity_component._.state_attributes.swing_mode.state.both': 'Les deux',
  'component.climate.entity_component._.state.cool': 'Climatisation',
};
const hass = {
  locale: { language: 'fr' },
  localize: (k) => haStrings[k] || '',
};

describe('format i18n helpers', () => {
  it('localizes an attribute option via HA component keys', () => {
    expect(localizeAttrValue(hass, 'climate', 'fan_mode', 'high')).toBe('Élevée');
    expect(localizeAttrValue(hass, 'climate', 'swing_mode', 'both')).toBe('Les deux');
  });

  it('falls back to a humanized value when HA has no translation', () => {
    expect(localizeAttrValue(hass, 'climate', 'fan_mode', 'turbo_x')).toBe('Turbo x');
  });

  it('localizes an entity state value', () => {
    expect(localizeStateValue(hass, 'climate', 'cool')).toBe('Climatisation');
  });

  it('attrLabel uses the card translations (fr)', () => {
    const fr = { locale: { language: 'fr' } };
    expect(attrLabel(fr, 'eco_mode')).toBe('Éco');
    expect(attrLabel(fr, 'sleep_mode')).toBe('Sommeil');
  });

  it('attrLabel falls back to a humanized key when unknown', () => {
    expect(attrLabel({ locale: { language: 'en' } }, 'weird_key')).toBe('Weird key');
  });
});

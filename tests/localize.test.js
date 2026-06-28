import { describe, it, expect } from 'vitest';
import { localize, resolveLanguage } from '../src/localize/localize.js';

describe('localize', () => {
  it('returns French when the locale is fr', () => {
    expect(localize({ locale: { language: 'fr' } }, 'fan')).toBe('Ventilateur');
  });

  it('returns English when the locale is en', () => {
    expect(localize({ locale: { language: 'en' } }, 'fan')).toBe('Fan');
  });

  it('falls back to English for a non-seeded HA language', () => {
    expect(localize({ locale: { language: 'ta' } }, 'fan')).toBe('Fan');
  });

  it('returns the key itself when unknown', () => {
    expect(localize({ locale: { language: 'en' } }, 'nope.nope')).toBe('nope.nope');
  });

  it('resolves language from hass.language when no locale', () => {
    expect(resolveLanguage({ language: 'de' })).toBe('de');
    expect(resolveLanguage(undefined)).toBe('en');
  });
});

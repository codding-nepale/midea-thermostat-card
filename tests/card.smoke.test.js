import { describe, it, expect } from 'vitest';
import { MideaThermostatCard } from '../src/midea-thermostat-card.js';

describe('midea-thermostat-card registration', () => {
  it('defines the custom element', () => {
    expect(customElements.get('midea-thermostat-card')).toBeDefined();
  });

  it('provides a stub config object', () => {
    const stub = MideaThermostatCard.getStubConfig();
    expect(stub).toBeTypeOf('object');
    expect(stub.type).toContain('midea-thermostat-card');
  });

  it('throws when no entity is configured', () => {
    const el = new MideaThermostatCard();
    expect(() => el.setConfig({})).toThrow();
  });

  it('stores config and exposes a card size', () => {
    const el = new MideaThermostatCard();
    el.setConfig({ entity: 'climate.test' });
    expect(el.getCardSize()).toBeGreaterThan(0);
  });
});

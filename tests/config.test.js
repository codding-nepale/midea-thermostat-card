import { describe, it, expect } from 'vitest';
import { normalizeConfig } from '../src/core/config.js';

describe('normalizeConfig', () => {
  it('throws when entity is missing', () => {
    expect(() => normalizeConfig({})).toThrow();
  });

  it('throws when entity is not a climate.* entity', () => {
    expect(() => normalizeConfig({ entity: 'switch.foo' })).toThrow();
  });

  it('fills sensible defaults from a minimal config', () => {
    const c = normalizeConfig({ entity: 'climate.x' });
    expect(c.entity).toBe('climate.x');
    expect(c.show_current_as_secondary).toBe(true);
    expect(c.dial.step).toBe(1);
    expect(c.dial.draggable).toBe(true);
    expect(c.features.sensors).toEqual([]);
    expect(c.features.fan).toBe('auto');
    expect(c.features.swing).toBe('auto');
    expect(c.features.preset).toBe('auto');
  });

  it('merges user feature overrides over defaults (per key)', () => {
    const c = normalizeConfig({
      entity: 'climate.x',
      features: { sensors: ['indoor_humidity'], fan: 'number' },
    });
    expect(c.features.sensors).toEqual(['indoor_humidity']);
    expect(c.features.fan).toBe('number');
    // untouched feature keys keep their defaults
    expect(c.features.swing).toBe('auto');
    expect(c.features.quick_toggles).toContain('eco_mode');
  });

  it('does not share array references with the defaults', () => {
    const a = normalizeConfig({ entity: 'climate.a' });
    a.features.quick_toggles.push('mutated');
    const b = normalizeConfig({ entity: 'climate.b' });
    expect(b.features.quick_toggles).not.toContain('mutated');
  });

  it('honors dial overrides', () => {
    const c = normalizeConfig({ entity: 'climate.x', dial: { step: 2, draggable: false } });
    expect(c.dial.step).toBe(2);
    expect(c.dial.draggable).toBe(false);
  });
});

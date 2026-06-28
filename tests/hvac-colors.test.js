import { describe, it, expect } from 'vitest';
import { hvacColor } from '../src/core/hvac-colors.js';

describe('hvacColor', () => {
  it('maps each known mode to its color token', () => {
    expect(hvacColor('off')).toBe('var(--state-climate-off-color, #8a8a8a)');
    expect(hvacColor('cool')).toBe('var(--state-climate-cool-color, #2196F3)');
    expect(hvacColor('heat')).toBe('var(--state-climate-heat-color, #FF8100)');
    expect(hvacColor('dry')).toBe('var(--state-climate-dry-color, #FFCE49)');
    expect(hvacColor('fan_only')).toBe('var(--state-climate-fan_only-color, #00BCD4)');
    expect(hvacColor('auto')).toBe('var(--state-climate-auto-color, #43A047)');
    expect(hvacColor('heat_cool')).toBe('var(--state-climate-heat_cool-color, #43A047)');
  });

  it('falls back to the off color for unknown modes', () => {
    expect(hvacColor('banana')).toBe('var(--state-climate-off-color, #8a8a8a)');
    expect(hvacColor(undefined)).toBe('var(--state-climate-off-color, #8a8a8a)');
  });
});

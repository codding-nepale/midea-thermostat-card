import { describe, it, expect } from 'vitest';
import {
  clamp,
  roundToStep,
  valueToFraction,
  fractionToAngle,
  angleToFraction,
  polarToCartesian,
  describeArc,
  ARC_START,
  ARC_SWEEP,
} from '../src/core/dial-geometry.js';

describe('dial-geometry', () => {
  it('clamps values', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });

  it('rounds to step offset from min', () => {
    expect(roundToStep(19.2, 0.5, 16)).toBeCloseTo(19.0, 5);
    expect(roundToStep(19.3, 0.5, 16)).toBeCloseTo(19.5, 5);
    expect(roundToStep(19.74, 0.5, 16)).toBeCloseTo(19.5, 5);
  });

  it('maps value to fraction', () => {
    expect(valueToFraction(16, 16, 30)).toBeCloseTo(0, 5);
    expect(valueToFraction(30, 16, 30)).toBeCloseTo(1, 5);
    expect(valueToFraction(23, 16, 30)).toBeCloseTo(0.5, 5);
    expect(valueToFraction(40, 16, 30)).toBeCloseTo(1, 5); // clamped
  });

  it('round-trips fraction <-> angle', () => {
    expect(fractionToAngle(0)).toBeCloseTo(ARC_START, 5);
    expect(fractionToAngle(1)).toBeCloseTo(ARC_START + ARC_SWEEP, 5);
    expect(angleToFraction(fractionToAngle(0.42))).toBeCloseTo(0.42, 5);
  });

  it('converts polar to cartesian', () => {
    const a = polarToCartesian(0, 0, 10, 0);
    expect(a.x).toBeCloseTo(10, 5);
    expect(a.y).toBeCloseTo(0, 5);
    const b = polarToCartesian(0, 0, 10, 90);
    expect(b.x).toBeCloseTo(0, 5);
    expect(b.y).toBeCloseTo(10, 5);
  });

  it('describes an SVG arc path', () => {
    const d = describeArc(50, 50, 40, 0, 1);
    expect(d.startsWith('M')).toBe(true);
    expect(d).toContain('A 40 40');
  });
});

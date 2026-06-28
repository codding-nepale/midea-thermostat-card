// Dial arc: 270° sweep with the gap at the bottom.
// Angles are in degrees, measured clockwise with y pointing down (SVG convention).
export const ARC_START = 135;
export const ARC_SWEEP = 270;

export function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/** Snap a value to the nearest `step` offset from `min`. */
export function roundToStep(v, step, min = 0) {
  const steps = Math.round((v - min) / step);
  return min + steps * step;
}

/** Map a value within [min,max] to a 0..1 fraction (clamped). */
export function valueToFraction(v, min, max) {
  if (max === min) return 0;
  return clamp((v - min) / (max - min), 0, 1);
}

/** Map a 0..1 fraction to an absolute angle on the arc. */
export function fractionToAngle(f) {
  return ARC_START + clamp(f, 0, 1) * ARC_SWEEP;
}

/** Map an absolute angle back to a 0..1 fraction (clamped). */
export function angleToFraction(angleDeg) {
  return clamp((angleDeg - ARC_START) / ARC_SWEEP, 0, 1);
}

/** Convert polar coordinates to cartesian (x = cx + r·cosθ, y = cy + r·sinθ). */
export function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** Build an SVG arc path `d` between two fractions of the dial. */
export function describeArc(cx, cy, r, startFrac, endFrac) {
  const startAngle = fractionToAngle(startFrac);
  const endAngle = fractionToAngle(endFrac);
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  // sweep-flag 1 = clockwise in SVG's y-down space.
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

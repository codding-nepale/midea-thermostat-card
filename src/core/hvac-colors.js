// HVAC mode -> CSS color, reusing HA state-color tokens with hex fallbacks.
const COLORS = {
  off: 'var(--state-climate-off-color, #8a8a8a)',
  cool: 'var(--state-climate-cool-color, #2196F3)',
  heat: 'var(--state-climate-heat-color, #FF8100)',
  dry: 'var(--state-climate-dry-color, #FFCE49)',
  fan_only: 'var(--state-climate-fan_only-color, #00BCD4)',
  auto: 'var(--state-climate-auto-color, #43A047)',
  heat_cool: 'var(--state-climate-heat_cool-color, #43A047)',
};

/** Return the CSS color string for a given HVAC mode (off-grey fallback). */
export function hvacColor(mode) {
  return COLORS[mode] || COLORS.off;
}

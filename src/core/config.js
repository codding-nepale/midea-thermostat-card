import { DEFAULT_FEATURES, DEFAULT_DIAL } from '../const.js';

/**
 * Normalize a raw Lovelace card config into a complete, defaulted object.
 * Throws when no valid climate entity is provided.
 */
export function normalizeConfig(raw) {
  if (!raw || typeof raw !== 'object' || !raw.entity) {
    throw new Error('entity (climate.*) is required');
  }
  if (!String(raw.entity).startsWith('climate.')) {
    throw new Error('entity must be a climate.* entity');
  }

  const features = { ...DEFAULT_FEATURES, ...(raw.features || {}) };
  // Clone arrays so callers never mutate the shared DEFAULT_FEATURES.
  features.quick_toggles = [...(features.quick_toggles || [])];
  features.sensors = [...(features.sensors || [])];
  features.extra_switches = [...(features.extra_switches || [])];

  return {
    entity: raw.entity,
    name: raw.name,
    icon: raw.icon,
    show_current_as_secondary:
      raw.show_current_as_secondary !== undefined
        ? !!raw.show_current_as_secondary
        : true,
    dial: { ...DEFAULT_DIAL, ...(raw.dial || {}) },
    features,
  };
}

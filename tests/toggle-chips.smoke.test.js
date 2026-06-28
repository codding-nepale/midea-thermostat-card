import { describe, it, expect } from 'vitest';
import '../src/components/toggle-chips.js';

async function mount(props) {
  const el = document.createElement('mt-toggle-chips');
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('mt-toggle-chips', () => {
  it('marks the on toggle as pressed', async () => {
    const el = await mount({
      hass: { states: {} },
      toggles: [
        { key: 'eco_mode', entityId: 'switch.a_eco_mode', isOn: true },
        { key: 'boost_mode', entityId: 'switch.a_boost_mode', isOn: false },
      ],
    });
    const chips = [...el.renderRoot.querySelectorAll('button.chip')];
    expect(chips).toHaveLength(2);
    expect(chips[0].classList.contains('pressed')).toBe(true);
    expect(chips[1].classList.contains('pressed')).toBe(false);
  });

  it('emits toggle-changed with the inverted state', async () => {
    const el = await mount({
      hass: { states: {} },
      toggles: [{ key: 'boost_mode', entityId: 'switch.a_boost_mode', isOn: false }],
    });
    let detail = null;
    el.addEventListener('toggle-changed', (e) => (detail = e.detail));
    el.renderRoot.querySelector('button.chip').click();
    expect(detail).toEqual({ entityId: 'switch.a_boost_mode', on: true });
  });

  it('renders nothing when empty', async () => {
    const el = await mount({ hass: { states: {} }, toggles: [] });
    expect(el.renderRoot.querySelector('button.chip')).toBeNull();
  });
});

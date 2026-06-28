import { describe, it, expect } from 'vitest';
import '../src/components/toggle-dropdown.js';

async function mount(props) {
  const el = document.createElement('mt-toggle-dropdown');
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const TOGGLES = [
  { key: 'eco_mode', entityId: 'switch.a_eco_mode', isOn: true },
  { key: 'boost_mode', entityId: 'switch.a_boost_mode', isOn: false },
  { key: 'sleep_mode', entityId: 'switch.a_sleep_mode', isOn: false },
];

describe('mt-toggle-dropdown', () => {
  it('renders nothing when there are no toggles', async () => {
    const el = await mount({ hass: { locale: { language: 'en' } }, toggles: [] });
    expect(el.renderRoot.querySelector('.trigger')).toBeNull();
  });

  it('summarizes active toggles in the trigger label', async () => {
    const el = await mount({ hass: { locale: { language: 'en' } }, toggles: TOGGLES });
    expect(el.renderRoot.querySelector('.trigger .label').textContent.trim()).toBe('Eco');
  });

  it('is collapsed by default and opens on click', async () => {
    const el = await mount({ hass: { locale: { language: 'en' } }, toggles: TOGGLES });
    expect(el.renderRoot.querySelector('.menu')).toBeNull();
    el.renderRoot.querySelector('.trigger').click();
    await el.updateComplete;
    expect(el.renderRoot.querySelectorAll('.menu .item')).toHaveLength(3);
  });

  it('emits toggle-changed with inverted state and stays open (multi-select)', async () => {
    const el = await mount({ hass: { locale: { language: 'en' } }, toggles: TOGGLES });
    el.renderRoot.querySelector('.trigger').click();
    await el.updateComplete;
    let detail = null;
    el.addEventListener('toggle-changed', (e) => (detail = e.detail));
    const items = [...el.renderRoot.querySelectorAll('.menu .item')];
    items[1].click(); // boost_mode (off -> on)
    await el.updateComplete;
    expect(detail).toEqual({ entityId: 'switch.a_boost_mode', on: true });
    expect(el.renderRoot.querySelector('.menu')).toBeTruthy(); // still open
  });
});

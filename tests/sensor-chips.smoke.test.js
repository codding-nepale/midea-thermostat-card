import { describe, it, expect } from 'vitest';
import '../src/components/sensor-chips.js';

async function mount(props) {
  const el = document.createElement('mt-sensor-chips');
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('mt-sensor-chips', () => {
  it('renders nothing when there are no sensors', async () => {
    const el = await mount({ hass: {}, sensors: [] });
    expect(el.renderRoot.querySelector('.chip')).toBeNull();
  });

  it('renders one chip per sensor with its state', async () => {
    const stateObj = { state: '55', attributes: { unit_of_measurement: '%' } };
    const el = await mount({
      hass: { states: { 'sensor.h': stateObj } },
      sensors: [{ key: 'indoor_humidity', entityId: 'sensor.h', stateObj }],
    });
    const chips = el.renderRoot.querySelectorAll('.chip');
    expect(chips).toHaveLength(1);
    expect(chips[0].textContent).toContain('55');
  });

  it('emits more-info when a chip is clicked', async () => {
    const stateObj = { state: '55', attributes: {} };
    const el = await mount({
      hass: { states: { 'sensor.h': stateObj } },
      sensors: [{ key: 'indoor_humidity', entityId: 'sensor.h', stateObj }],
    });
    let detail = null;
    el.addEventListener('more-info', (e) => (detail = e.detail));
    el.renderRoot.querySelector('.chip').click();
    expect(detail).toEqual({ entityId: 'sensor.h' });
  });
});

import { describe, it, expect } from 'vitest';
import '../src/components/mode-chips.js';

async function mount(props) {
  const el = document.createElement('mt-mode-chips');
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('mt-mode-chips', () => {
  it('renders one chip per hvac mode', async () => {
    const el = await mount({ hvacModes: ['off', 'cool', 'heat'], active: 'cool' });
    expect(el.renderRoot.querySelectorAll('button.chip')).toHaveLength(3);
  });

  it('marks the active mode', async () => {
    const el = await mount({ hvacModes: ['off', 'cool', 'heat'], active: 'cool' });
    const chips = [...el.renderRoot.querySelectorAll('button.chip')];
    const active = chips.filter((c) => c.classList.contains('active'));
    expect(active).toHaveLength(1);
    expect(active[0].getAttribute('title')).toBe('Cool');
  });

  it('emits hvac-mode-changed on click', async () => {
    const el = await mount({ hvacModes: ['off', 'cool', 'heat'], active: 'cool' });
    let detail = null;
    el.addEventListener('hvac-mode-changed', (e) => (detail = e.detail));
    const chips = [...el.renderRoot.querySelectorAll('button.chip')];
    chips[2].click(); // heat
    expect(detail).toEqual({ mode: 'heat' });
  });
});

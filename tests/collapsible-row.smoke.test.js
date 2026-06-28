import { describe, it, expect } from 'vitest';
import '../src/components/collapsible-row.js';

async function mount(props) {
  const el = document.createElement('mt-collapsible-row');
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const OPTS = [
  { value: 'low', label: 'Low' },
  { value: 'high', label: 'High', selected: true },
];

describe('mt-collapsible-row', () => {
  it('is collapsed by default (no options shown)', async () => {
    const el = await mount({ title: 'Fan', options: OPTS });
    expect(el.renderRoot.querySelector('.options')).toBeNull();
  });

  it('emits toggle-open when the header is clicked', async () => {
    const el = await mount({ title: 'Fan', options: OPTS });
    let fired = false;
    el.addEventListener('toggle-open', () => (fired = true));
    el.renderRoot.querySelector('.header').click();
    expect(fired).toBe(true);
  });

  it('shows options when open and emits option-selected', async () => {
    const el = await mount({ title: 'Fan', options: OPTS, open: true });
    const opts = [...el.renderRoot.querySelectorAll('button.opt')];
    expect(opts).toHaveLength(2);
    let detail = null;
    el.addEventListener('option-selected', (e) => (detail = e.detail));
    opts[0].click();
    expect(detail).toEqual({ value: 'low' });
  });
});

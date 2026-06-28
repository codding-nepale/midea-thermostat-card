import { describe, it, expect } from 'vitest';
import '../src/components/dial.js';

async function mountDial(props = {}) {
  const el = document.createElement('mt-dial');
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('mt-dial', () => {
  it('renders an SVG and the target temperature', async () => {
    const el = await mountDial({ mode: 'cool', value: 19, current: 25.5, min: 16, max: 30, step: 0.5 });
    const svg = el.renderRoot.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(el.renderRoot.querySelector('.target-value').textContent.trim()).toBe('19.0');
  });

  it('emits value-changed with value+step when + is clicked', async () => {
    const el = await mountDial({ mode: 'cool', value: 19, min: 16, max: 30, step: 0.5 });
    let detail = null;
    el.addEventListener('value-changed', (e) => (detail = e.detail));
    el.renderRoot.querySelector('button[aria-label="increase"]').click();
    expect(detail).toEqual({ value: 19.5 });
  });

  it('clamps at max when stepping up', async () => {
    const el = await mountDial({ mode: 'cool', value: 30, min: 16, max: 30, step: 0.5 });
    let detail = null;
    el.addEventListener('value-changed', (e) => (detail = e.detail));
    el.renderRoot.querySelector('button[aria-label="increase"]').click();
    expect(detail).toEqual({ value: 30 });
  });

  it('hides the drag handle when not draggable', async () => {
    const el = await mountDial({ mode: 'heat', value: 20, draggable: false });
    const handle = el.renderRoot.querySelector('.handle');
    expect(handle.style.opacity).toBe('0');
  });
});

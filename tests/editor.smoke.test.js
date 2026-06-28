import { describe, it, expect } from 'vitest';
import '../src/editor.js';

async function mountEditor() {
  const el = document.createElement('midea-thermostat-card-editor');
  el.setConfig({ type: 'custom:midea-thermostat-card', entity: 'climate.clim' });
  el.hass = { locale: { language: 'en' } };
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('midea-thermostat-card-editor', () => {
  it('is defined', () => {
    expect(customElements.get('midea-thermostat-card-editor')).toBeDefined();
  });

  it('emits config-changed when a field changes', async () => {
    const el = await mountEditor();
    let detail = null;
    el.addEventListener('config-changed', (e) => (detail = e.detail));
    const input = el.renderRoot.querySelector('#name');
    expect(input).toBeTruthy();
    input.value = 'Salon';
    input.dispatchEvent(new Event('input'));
    expect(detail.config.name).toBe('Salon');
    expect(detail.config.entity).toBe('climate.clim');
  });
});

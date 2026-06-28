import { describe, it, expect, vi } from 'vitest';
import '../src/midea-thermostat-card.js';

function buildHass() {
  const reg = (entity_id, device_id = 'dev1') => ({ entity_id, device_id });
  const climateAttrs = {
    hvac_modes: ['off', 'cool', 'heat', 'dry', 'fan_only', 'auto'],
    fan_modes: ['auto', 'low', 'high'],
    fan_mode: 'high',
    swing_modes: ['off', 'both'],
    swing_mode: 'off',
    current_temperature: 25.5,
    temperature: 19,
    min_temp: 16,
    max_temp: 30,
    friendly_name: 'Clim Salon',
  };
  return {
    language: 'en',
    locale: { language: 'en' },
    config: { unit_system: { temperature: '°C' } },
    callService: vi.fn(),
    entities: {
      'climate.clim': reg('climate.clim'),
      'switch.clim_eco_mode': reg('switch.clim_eco_mode'),
      'number.clim_fan_speed': reg('number.clim_fan_speed'),
    },
    states: {
      'climate.clim': { state: 'cool', attributes: climateAttrs },
      'switch.clim_eco_mode': { state: 'on', attributes: {} },
      'number.clim_fan_speed': { state: '60', attributes: { min: 1, max: 100, step: 1 } },
    },
  };
}

async function mountCard() {
  const el = document.createElement('midea-thermostat-card');
  el.setConfig({ type: 'custom:midea-thermostat-card', entity: 'climate.clim' });
  el.hass = buildHass();
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('midea-thermostat-card (integration)', () => {
  it('renders the dial with the target temperature', async () => {
    const el = await mountCard();
    const dial = el.renderRoot.querySelector('mt-dial');
    expect(dial).toBeTruthy();
    await dial.updateComplete;
    expect(dial.renderRoot.querySelector('.target-value').textContent.trim()).toBe('19.0');
  });

  it('renders one mode chip per hvac mode', async () => {
    const el = await mountCard();
    const chips = el.renderRoot.querySelector('mt-mode-chips');
    expect(chips).toBeTruthy();
    await chips.updateComplete;
    expect(chips.renderRoot.querySelectorAll('button.chip')).toHaveLength(6);
  });

  it('calls climate.set_temperature when the dial emits value-changed', async () => {
    const el = await mountCard();
    const dial = el.renderRoot.querySelector('mt-dial');
    dial.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { value: 21 },
        bubbles: true,
        composed: true,
      })
    );
    expect(el.hass.callService).toHaveBeenCalledWith('climate', 'set_temperature', {
      entity_id: 'climate.clim',
      temperature: 21,
    });
  });

  it('calls climate.set_hvac_mode when a mode is chosen', async () => {
    const el = await mountCard();
    const chips = el.renderRoot.querySelector('mt-mode-chips');
    chips.dispatchEvent(
      new CustomEvent('hvac-mode-changed', {
        detail: { mode: 'heat' },
        bubbles: true,
        composed: true,
      })
    );
    expect(el.hass.callService).toHaveBeenCalledWith('climate', 'set_hvac_mode', {
      entity_id: 'climate.clim',
      hvac_mode: 'heat',
    });
  });

  it('exposes a config element for the GUI editor', () => {
    const editor = customElements.get('midea-thermostat-card').getConfigElement();
    expect(editor.tagName.toLowerCase()).toBe('midea-thermostat-card-editor');
  });
});

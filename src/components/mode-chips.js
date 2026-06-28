import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles.js';
import { MODE_CHIPS_NAME, HVAC_MODE_ICONS } from '../const.js';
import { hvacColor } from '../core/hvac-colors.js';
import { localizeStateValue } from '../core/format.js';

export class MtModeChips extends LitElement {
  static properties = {
    hass: { attribute: false },
    hvacModes: { attribute: false },
    active: {},
  };

  static styles = [
    sharedStyles,
    css`
      /* segmented control: equal cells on a single row, never wraps */
      .chip-row {
        flex-wrap: nowrap;
        gap: 6px;
      }
      button.chip {
        flex: 1 1 0;
        min-width: 0;
        padding: 0;
      }
      ha-icon {
        --mdc-icon-size: 22px;
      }
    `,
  ];

  _select(mode) {
    this.dispatchEvent(
      new CustomEvent('hvac-mode-changed', {
        detail: { mode },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const modes = this.hvacModes || [];
    return html`
      <div class="chip-row">
        ${modes.map((mode) => {
          const color = hvacColor(mode);
          const isActive = mode === this.active;
          return html`
            <button
              class="chip ${isActive ? 'active' : ''}"
              style=${isActive ? `background:${color};color:white;` : ''}
              title=${localizeStateValue(this.hass, 'climate', mode)}
              @click=${() => this._select(mode)}
            >
              <ha-icon icon=${HVAC_MODE_ICONS[mode] || 'mdi:thermostat'}></ha-icon>
            </button>
          `;
        })}
      </div>
    `;
  }
}

if (!customElements.get(MODE_CHIPS_NAME)) {
  customElements.define(MODE_CHIPS_NAME, MtModeChips);
}

import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles.js';
import { SENSOR_CHIPS_NAME, MIDEA_KEYS } from '../const.js';
import { formatEntityState } from '../core/format.js';

export class MtSensorChips extends LitElement {
  static properties = {
    hass: { attribute: false },
    sensors: { attribute: false },
  };

  static styles = [
    sharedStyles,
    css`
      .chip {
        cursor: pointer;
        font-size: 0.85rem;
      }
      ha-icon {
        --mdc-icon-size: 18px;
        color: var(--mt-fg-secondary);
      }
    `,
  ];

  _moreInfo(entityId) {
    this.dispatchEvent(
      new CustomEvent('more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const sensors = this.sensors || [];
    if (!sensors.length) return html``;
    return html`
      <div class="chip-row">
        ${sensors.map(
          (s) => html`
            <button class="chip" @click=${() => this._moreInfo(s.entityId)}>
              <ha-icon icon=${MIDEA_KEYS.sensor[s.key] || 'mdi:gauge'}></ha-icon>
              <span>${formatEntityState(this.hass, s.stateObj)}</span>
            </button>
          `
        )}
      </div>
    `;
  }
}

if (!customElements.get(SENSOR_CHIPS_NAME)) {
  customElements.define(SENSOR_CHIPS_NAME, MtSensorChips);
}

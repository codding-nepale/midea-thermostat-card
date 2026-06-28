import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles.js';
import { TOGGLE_CHIPS_NAME, MIDEA_KEYS } from '../const.js';
import { humanize } from '../core/format.js';

export class MtToggleChips extends LitElement {
  static properties = {
    hass: { attribute: false },
    toggles: { attribute: false },
  };

  static styles = [
    sharedStyles,
    css`
      button.chip.pressed {
        background: var(--mt-accent);
        color: white;
      }
      .label {
        font-size: 0.85rem;
      }
      ha-icon {
        --mdc-icon-size: 20px;
      }
    `,
  ];

  _toggle(t) {
    this.dispatchEvent(
      new CustomEvent('toggle-changed', {
        detail: { entityId: t.entityId, on: !t.isOn },
        bubbles: true,
        composed: true,
      })
    );
  }

  _label(t) {
    const stateObj = this.hass?.states?.[t.entityId];
    const name = stateObj?.attributes?.friendly_name;
    return name || humanize(t.key);
  }

  render() {
    const toggles = this.toggles || [];
    if (!toggles.length) return html``;
    return html`
      <div class="chip-row">
        ${toggles.map(
          (t) => html`
            <button
              class="chip ${t.isOn ? 'pressed' : ''}"
              title=${this._label(t)}
              @click=${() => this._toggle(t)}
            >
              <ha-icon icon=${MIDEA_KEYS.switch[t.key] || 'mdi:toggle-switch'}></ha-icon>
              <span class="label">${this._label(t)}</span>
            </button>
          `
        )}
      </div>
    `;
  }
}

if (!customElements.get(TOGGLE_CHIPS_NAME)) {
  customElements.define(TOGGLE_CHIPS_NAME, MtToggleChips);
}

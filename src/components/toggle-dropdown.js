import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles.js';
import { TOGGLE_DROPDOWN_NAME, MIDEA_KEYS } from '../const.js';
import { attrLabel } from '../core/format.js';
import { localize } from '../localize/localize.js';

/**
 * Multi-select dropdown for Midea quick toggles (eco / boost / sleep …).
 * Each entry is an independent switch: selecting one toggles it on/off and the
 * menu stays open. Emits `toggle-changed` ({ entityId, on }).
 */
export class MtToggleDropdown extends LitElement {
  static properties = {
    hass: { attribute: false },
    toggles: { attribute: false },
    _open: { state: true },
  };

  constructor() {
    super();
    this._open = false;
    this._onDocClick = (e) => {
      if (this._open && !e.composedPath().includes(this)) this._open = false;
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onDocClick);
    super.disconnectedCallback();
  }

  static styles = [
    sharedStyles,
    css`
      .dropdown {
        position: relative;
      }
      button.trigger {
        width: 100%;
        justify-content: flex-start;
        gap: 10px;
      }
      .trigger .label {
        flex: 1;
        text-align: left;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chevron {
        transition: transform 150ms ease;
        color: var(--mt-fg-secondary);
      }
      .chevron.open {
        transform: rotate(180deg);
      }
      .menu {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        z-index: 9;
        background: var(--ha-card-background, var(--card-background-color, #1c1f26));
        border: 1px solid var(--mt-divider);
        border-radius: var(--mt-chip-radius);
        padding: 6px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
        gap: 2px;
        max-height: 260px;
        overflow: auto;
      }
      button.item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 10px;
        border: none;
        background: transparent;
        color: var(--mt-fg);
        border-radius: 8px;
        cursor: pointer;
        font: inherit;
        text-align: left;
      }
      button.item:hover {
        background: var(--mt-chip-bg-active);
      }
      button.item.on {
        color: var(--mt-accent);
      }
      button.item .check {
        margin-left: auto;
      }
      ha-icon {
        --mdc-icon-size: 20px;
      }
    `,
  ];

  _toggleOpen() {
    this._open = !this._open;
  }

  _toggle(t) {
    this.dispatchEvent(
      new CustomEvent('toggle-changed', {
        detail: { entityId: t.entityId, on: !t.isOn },
        bubbles: true,
        composed: true,
      })
    );
  }

  _triggerLabel(toggles) {
    const active = toggles.filter((t) => t.isOn);
    if (active.length) return active.map((t) => attrLabel(this.hass, t.key)).join(', ');
    return localize(this.hass, 'quick_modes');
  }

  render() {
    const toggles = this.toggles || [];
    if (!toggles.length) return html``;
    return html`
      <div class="dropdown">
        <button
          class="chip trigger"
          aria-haspopup="listbox"
          aria-expanded=${this._open ? 'true' : 'false'}
          @click=${this._toggleOpen}
        >
          <ha-icon icon="mdi:tune-variant"></ha-icon>
          <span class="label">${this._triggerLabel(toggles)}</span>
          <ha-icon
            class="chevron ${this._open ? 'open' : ''}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </button>

        ${this._open
          ? html`
              <div class="menu" role="listbox" aria-multiselectable="true">
                ${toggles.map(
                  (t) => html`
                    <button
                      class="item ${t.isOn ? 'on' : ''}"
                      role="option"
                      aria-selected=${t.isOn ? 'true' : 'false'}
                      @click=${() => this._toggle(t)}
                    >
                      <ha-icon
                        icon=${MIDEA_KEYS.switch[t.key] || 'mdi:toggle-switch'}
                      ></ha-icon>
                      <span>${attrLabel(this.hass, t.key)}</span>
                      ${t.isOn
                        ? html`<ha-icon class="check" icon="mdi:check"></ha-icon>`
                        : ''}
                    </button>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

if (!customElements.get(TOGGLE_DROPDOWN_NAME)) {
  customElements.define(TOGGLE_DROPDOWN_NAME, MtToggleDropdown);
}

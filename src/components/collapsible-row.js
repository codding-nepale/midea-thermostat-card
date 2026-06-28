import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles.js';
import { COLLAPSIBLE_ROW_NAME } from '../const.js';

export class MtCollapsibleRow extends LitElement {
  static properties = {
    icon: {},
    title: {},
    currentLabel: {},
    options: { attribute: false },
    open: { type: Boolean },
  };

  constructor() {
    super();
    this.open = false;
    this.options = [];
  }

  static styles = [
    sharedStyles,
    css`
      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 4px;
        border: none;
        background: transparent;
        color: var(--mt-fg);
        font: inherit;
        cursor: pointer;
        border-radius: var(--mt-chip-radius);
      }
      .header:hover {
        background: var(--mt-chip-bg-active);
      }
      .title {
        flex: 1;
        text-align: left;
        font-weight: 500;
      }
      .current {
        color: var(--mt-fg-secondary);
        font-size: 0.9rem;
      }
      .chevron {
        transition: transform 150ms ease;
      }
      .chevron.open {
        transform: rotate(180deg);
      }
      .options {
        padding: 6px 4px 10px;
      }
      button.opt.selected {
        background: var(--mt-accent);
        color: white;
      }
      ha-icon {
        --mdc-icon-size: 20px;
      }
    `,
  ];

  _toggleOpen() {
    this.dispatchEvent(
      new CustomEvent('toggle-open', { bubbles: true, composed: true })
    );
  }

  _select(value) {
    this.dispatchEvent(
      new CustomEvent('option-selected', {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const options = this.options || [];
    return html`
      <div class="row-wrap">
        <button class="header" @click=${this._toggleOpen}>
          ${this.icon ? html`<ha-icon icon=${this.icon}></ha-icon>` : ''}
          <span class="title">${this.title}</span>
          <span class="current">${this.currentLabel || ''}</span>
          <ha-icon
            class="chevron ${this.open ? 'open' : ''}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </button>
        ${this.open
          ? html`
              <div class="options chip-row">
                ${options.map(
                  (o) => html`
                    <button
                      class="chip opt ${o.selected ? 'selected' : ''}"
                      @click=${() => this._select(o.value)}
                    >
                      ${o.label}
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

if (!customElements.get(COLLAPSIBLE_ROW_NAME)) {
  customElements.define(COLLAPSIBLE_ROW_NAME, MtCollapsibleRow);
}

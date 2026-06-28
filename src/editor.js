import { LitElement, html, css } from 'lit';
import { EDITOR_NAME } from './const.js';
import { localize } from './localize/localize.js';
import { humanize } from './core/format.js';

const SOURCE_OPTIONS = (extra) => [
  { value: 'auto', label: 'Auto' },
  { value: 'climate', label: 'Climate' },
  ...extra,
  { value: 'hidden', label: 'Hidden' },
];

export class MideaThermostatCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = css`
    .form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 4px;
    }
    label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    input[type='text'] {
      flex: 1;
    }
  `;

  setConfig(config) {
    this._config = { ...config };
  }

  _emit() {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }

  _setValue(key, value) {
    this._config = { ...this._config, [key]: value };
    this._emit();
  }

  // ha-form emits the full merged data object.
  _valueChanged(ev) {
    ev.stopPropagation();
    this._config = { ...ev.detail.value };
    this._emit();
  }

  _schema() {
    return [
      { name: 'entity', required: true, selector: { entity: { domain: 'climate' } } },
      { name: 'name', selector: { text: {} } },
      { name: 'icon', selector: { icon: {} } },
      { name: 'show_current_as_secondary', selector: { boolean: {} } },
      {
        type: 'expandable',
        name: 'features',
        schema: [
          { name: 'fan', selector: { select: { options: SOURCE_OPTIONS([{ value: 'number', label: 'Number' }]) } } },
          { name: 'swing', selector: { select: { options: SOURCE_OPTIONS([{ value: 'switches', label: 'Switches' }]) } } },
          { name: 'preset', selector: { select: { options: SOURCE_OPTIONS([{ value: 'switches', label: 'Switches' }]) } } },
        ],
      },
    ];
  }

  _computeLabel = (schema) => {
    const key = `editor.${schema.name}`;
    const v = localize(this.hass, key);
    return v === key ? humanize(schema.name) : v;
  };

  render() {
    if (!this._config) return html``;

    // Rich HA editor when the frontend's ha-form is available.
    if (customElements.get('ha-form')) {
      return html`
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schema()}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>
      `;
    }

    // Fallback minimal editor (used outside the HA frontend / in tests).
    return html`
      <div class="form">
        <label>
          ${localize(this.hass, 'editor.name')}
          <input
            id="name"
            type="text"
            .value=${this._config.name || ''}
            @input=${(e) => this._setValue('name', e.target.value)}
          />
        </label>
        <label>
          ${localize(this.hass, 'editor.show_current')}
          <input
            id="show_current"
            type="checkbox"
            .checked=${this._config.show_current_as_secondary !== false}
            @change=${(e) =>
              this._setValue('show_current_as_secondary', e.target.checked)}
          />
        </label>
      </div>
    `;
  }
}

if (!customElements.get(EDITOR_NAME)) {
  customElements.define(EDITOR_NAME, MideaThermostatCardEditor);
}

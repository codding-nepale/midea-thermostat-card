import { LitElement, html, css } from 'lit';
import {
  CARD_VERSION,
  CARD_NAME,
  EDITOR_NAME,
} from './const.js';
import { sharedStyles } from './styles.js';
import { normalizeConfig } from './core/config.js';
import { detectFeatures } from './core/midea-detect.js';
import { hvacColor } from './core/hvac-colors.js';
import {
  formatEntityState,
  formatAttributeValue,
  localizeAttrValue,
  attrLabel,
  humanize,
} from './core/format.js';
import { localize } from './localize/localize.js';
import {
  setTemperature,
  setHvacMode,
  setFanMode,
  setSwingMode,
  setPresetMode,
  setNumber,
  selectOption,
  toggleSwitch,
} from './core/ha-actions.js';

import './components/dial.js';
import './components/mode-chips.js';
import './components/toggle-dropdown.js';
import './components/collapsible-row.js';
import './components/sensor-chips.js';
import './editor.js';

export class MideaThermostatCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _open: { state: true },
  };

  constructor() {
    super();
    this._open = { fan: false, swing: false, preset: false };
    this._features = null;
  }

  static styles = [
    sharedStyles,
    css`
      ha-card {
        padding: 12px 12px 16px;
      }
      .content {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 32px;
      }
      .header .name {
        flex: 1;
        font-weight: 500;
        font-size: 1.05rem;
        color: var(--mt-fg);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .icon-button {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: transparent;
        color: var(--mt-fg-secondary);
        cursor: pointer;
        border-radius: 50%;
        width: 36px;
        height: 36px;
      }
      .icon-button:hover {
        background: var(--mt-chip-bg-active);
      }
      /* dial + its chips form one tight visual block */
      .climate {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .chips {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .controls {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .warning {
        padding: 16px;
        color: var(--error-color, #db4437);
      }
    `,
  ];

  setConfig(config) {
    this._config = normalizeConfig(config);
  }

  getCardSize() {
    return 6;
  }

  static getStubConfig() {
    return { type: `custom:${CARD_NAME}`, entity: '' };
  }

  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  willUpdate(changed) {
    if (changed.has('hass') || changed.has('_config')) {
      if (this.hass && this._config) {
        this._features = detectFeatures(this.hass, this._config);
      }
    }
  }

  // ---- helpers ----

  get _climate() {
    return this._features?.climate;
  }

  get _unit() {
    return this.hass?.config?.unit_system?.temperature || '°C';
  }

  _fireMoreInfo(entityId) {
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
  }

  _toggleRow(kind) {
    this._open = { ...this._open, [kind]: !this._open[kind] };
  }

  _findSwitch(kind, entityId) {
    const f = this._features?.[kind];
    return (f?.switches || []).find((s) => s.entityId === entityId);
  }

  // ---- event handlers ----

  _onTargetChanged(e) {
    setTemperature(this.hass, this._config.entity, e.detail.value);
  }

  _onModeChanged(e) {
    setHvacMode(this.hass, this._config.entity, e.detail.mode);
  }

  _onToggleChanged(e) {
    toggleSwitch(this.hass, e.detail.entityId, e.detail.on);
  }

  _applyOption(kind, value) {
    const entity = this._config.entity;
    const sep = value.indexOf(':');
    const type = value.slice(0, sep);
    const rest = value.slice(sep + 1);
    if (type === 'mode') {
      if (kind === 'fan') setFanMode(this.hass, entity, rest);
      else if (kind === 'swing') setSwingMode(this.hass, entity, rest);
      else if (kind === 'preset') setPresetMode(this.hass, entity, rest);
    } else if (type === 'switch') {
      const sw = this._findSwitch(kind, rest);
      toggleSwitch(this.hass, rest, !(sw && sw.isOn));
    } else if (type === 'select') {
      const sub = rest.indexOf(':');
      const selEntity = rest.slice(0, sub);
      const option = rest.slice(sub + 1);
      selectOption(this.hass, selEntity, option);
    } else if (type === 'number') {
      setNumber(this.hass, this._features.fan.entityId, Number(rest));
    }
  }

  // ---- row view-models ----

  _numberSteps(fan) {
    const pts = [fan.min, 25, 50, 75, fan.max]
      .map((n) => Math.round(n))
      .filter((n) => n >= fan.min && n <= fan.max);
    return [...new Set(pts)].sort((a, b) => a - b);
  }

  _buildFan() {
    const fan = this._features?.fan;
    if (!fan || fan.source === null) return null;
    if (fan.source === 'climate') {
      return {
        icon: 'mdi:fan',
        title: localize(this.hass, 'fan'),
        currentLabel: formatAttributeValue(this.hass, this._climate, 'fan_mode'),
        options: (fan.modes || []).map((m) => ({
          value: `mode:${m}`,
          label: localizeAttrValue(this.hass, 'climate', 'fan_mode', m),
          selected: m === fan.current,
        })),
      };
    }
    // number
    return {
      icon: 'mdi:fan',
      title: localize(this.hass, 'fan'),
      currentLabel: `${fan.current}`,
      options: this._numberSteps(fan).map((v) => ({
        value: `number:${v}`,
        label: `${v}`,
        selected: Number(v) === Number(fan.current),
      })),
    };
  }

  _buildSwing() {
    const sw = this._features?.swing;
    if (!sw || sw.source === null) return null;
    if (sw.source === 'climate') {
      return {
        icon: 'mdi:arrow-oscillating',
        title: localize(this.hass, 'swing'),
        currentLabel: formatAttributeValue(this.hass, this._climate, 'swing_mode'),
        options: (sw.modes || []).map((m) => ({
          value: `mode:${m}`,
          label: localizeAttrValue(this.hass, 'climate', 'swing_mode', m),
          selected: m === sw.current,
        })),
      };
    }
    const options = [];
    for (const s of sw.switches || []) {
      options.push({
        value: `switch:${s.entityId}`,
        label: attrLabel(this.hass, s.key),
        selected: s.isOn,
      });
    }
    for (const sel of sw.selects || []) {
      for (const o of sel.options || []) {
        options.push({
          value: `select:${sel.entityId}:${o}`,
          label: `${attrLabel(this.hass, sel.key)}: ${humanize(o)}`,
          selected: o === sel.current,
        });
      }
    }
    return {
      icon: 'mdi:arrow-oscillating',
      title: localize(this.hass, 'swing'),
      currentLabel: '',
      options,
    };
  }

  _buildPreset() {
    const p = this._features?.preset;
    if (!p || p.source === null) return null;
    if (p.source === 'climate') {
      return {
        icon: 'mdi:star',
        title: localize(this.hass, 'preset'),
        currentLabel: formatAttributeValue(this.hass, this._climate, 'preset_mode'),
        options: (p.modes || []).map((m) => ({
          value: `mode:${m}`,
          label: localizeAttrValue(this.hass, 'climate', 'preset_mode', m),
          selected: m === p.current,
        })),
      };
    }
    return {
      icon: 'mdi:star',
      title: localize(this.hass, 'preset'),
      currentLabel: '',
      options: (p.switches || []).map((s) => ({
        value: `switch:${s.entityId}`,
        label: attrLabel(this.hass, s.key),
        selected: s.isOn,
      })),
    };
  }

  _renderRow(kind, vm) {
    if (!vm) return '';
    return html`
      <mt-collapsible-row
        .icon=${vm.icon}
        .title=${vm.title}
        .currentLabel=${vm.currentLabel}
        .options=${vm.options}
        .open=${this._open[kind]}
        @toggle-open=${() => this._toggleRow(kind)}
        @option-selected=${(e) => this._applyOption(kind, e.detail.value)}
      ></mt-collapsible-row>
    `;
  }

  render() {
    if (!this._config) return html``;
    const climate = this._climate;
    if (!this.hass || !climate) {
      return html`<ha-card
        ><div class="warning">${localize(this.hass, 'error.no_entity')}</div></ha-card
      >`;
    }

    const a = climate.attributes || {};
    const mode = climate.state;
    const color = hvacColor(mode);
    const name = this._config.name || a.friendly_name || this._config.entity;
    const min = a.min_temp != null ? Number(a.min_temp) : 16;
    const max = a.max_temp != null ? Number(a.max_temp) : 30;
    const step = this._config.dial.step;
    const f = this._features;

    const hasModeChips =
      this._config.features.hvac_modes !== false && f.hvacModes.length;
    const hasControls = f.fan.source || f.swing.source || f.preset.source;

    return html`
      <ha-card style="--mt-state-color:${color}">
        <div class="content">
          <div class="header">
            <span class="name">${name}</span>
            <button
              class="icon-button"
              aria-label="more info"
              @click=${() => this._fireMoreInfo(this._config.entity)}
            >
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </button>
          </div>

          <div class="climate">
            <mt-dial
              .mode=${mode}
              .value=${a.temperature}
              .current=${this._config.show_current_as_secondary
                ? a.current_temperature
                : undefined}
              .min=${min}
              .max=${max}
              .step=${step}
              .draggable=${this._config.dial.draggable}
              .unit=${this._unit}
              .label=${formatEntityState(this.hass, climate)}
              @value-changed=${this._onTargetChanged}
            ></mt-dial>

            ${hasModeChips || f.quickToggles.length
              ? html`<div class="chips">
                  ${hasModeChips
                    ? html`<mt-mode-chips
                        .hass=${this.hass}
                        .hvacModes=${f.hvacModes}
                        .active=${mode}
                        @hvac-mode-changed=${this._onModeChanged}
                      ></mt-mode-chips>`
                    : ''}
                  ${f.quickToggles.length
                    ? html`<mt-toggle-dropdown
                        .hass=${this.hass}
                        .toggles=${f.quickToggles}
                        @toggle-changed=${this._onToggleChanged}
                      ></mt-toggle-dropdown>`
                    : ''}
                </div>`
              : ''}
          </div>

          ${hasControls
            ? html`<div class="divider"></div>
                <div class="controls">
                  ${this._renderRow('fan', this._buildFan())}
                  ${this._renderRow('swing', this._buildSwing())}
                  ${this._renderRow('preset', this._buildPreset())}
                </div>`
            : ''}

          ${f.sensors.length
            ? html`<div class="divider"></div>
                <mt-sensor-chips
                  .hass=${this.hass}
                  .sensors=${f.sensors}
                  @more-info=${(e) => this._fireMoreInfo(e.detail.entityId)}
                ></mt-sensor-chips>`
            : ''}
        </div>
      </ha-card>
    `;
  }
}

if (!customElements.get(CARD_NAME)) {
  customElements.define(CARD_NAME, MideaThermostatCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === CARD_NAME)) {
  window.customCards.push({
    type: CARD_NAME,
    name: 'Midea Thermostat Card',
    description:
      'Modern Mushroom-style thermostat card for Midea A/C (midea_ac_lan).',
    preview: true,
  });
}

/* eslint-disable no-console */
console.info(
  `%c MIDEA-THERMOSTAT-CARD %c v${CARD_VERSION} `,
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;'
);

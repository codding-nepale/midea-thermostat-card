import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles.js';
import { DIAL_NAME } from '../const.js';
import { hvacColor } from '../core/hvac-colors.js';
import {
  clamp,
  roundToStep,
  valueToFraction,
  fractionToAngle,
  angleToFraction,
  polarToCartesian,
  describeArc,
} from '../core/dial-geometry.js';

const CENTER = 100;
const RADIUS = 80;

export class MtDial extends LitElement {
  static properties = {
    mode: {},
    value: { type: Number },
    current: { type: Number },
    min: { type: Number },
    max: { type: Number },
    step: { type: Number },
    draggable: { type: Boolean },
    label: {},
    unit: {},
    _dragValue: { state: true },
  };

  constructor() {
    super();
    this.min = 16;
    this.max = 30;
    this.step = 0.5;
    this.draggable = true;
    this.unit = '°C';
    this._dragValue = null;
    this._dragging = false;
  }

  static styles = [
    sharedStyles,
    css`
      .dial {
        position: relative;
        width: 200px;
        max-width: 100%;
        margin: 0 auto;
        aspect-ratio: 1 / 1;
        touch-action: none;
        user-select: none;
      }
      svg {
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
      }
      .track {
        fill: none;
        stroke: var(--mt-divider);
        stroke-width: 10;
        stroke-linecap: round;
      }
      .value {
        fill: none;
        stroke-width: 10;
        stroke-linecap: round;
        transition: d 120ms ease;
      }
      .handle {
        stroke: var(--ha-card-background, var(--card-background-color, #1c1c1c));
        stroke-width: 3;
        cursor: grab;
      }
      .center {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        text-align: center;
      }
      .label {
        font-size: 0.85rem;
        font-weight: 500;
        margin-bottom: 2px;
      }
      .target {
        display: flex;
        align-items: flex-start;
        line-height: 1;
        color: var(--mt-fg);
      }
      .target-value {
        font-size: 2.4rem;
        font-weight: 600;
      }
      .unit {
        font-size: 1rem;
        margin-top: 4px;
        margin-left: 2px;
        color: var(--mt-fg-secondary);
      }
      .current {
        font-size: 0.85rem;
        color: var(--mt-fg-secondary);
        margin-top: 6px;
      }
      .buttons {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin-top: 8px;
      }
      button.round {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.4rem;
        padding: 0;
      }
    `,
  ];

  get _displayValue() {
    return this._dragValue != null ? this._dragValue : this.value;
  }

  _emit(value) {
    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  }

  _stepBy(dir) {
    const base = this.value != null ? this.value : this.min;
    const next = clamp(
      roundToStep(base + dir * this.step, this.step, this.min),
      this.min,
      this.max
    );
    this._emit(next);
  }

  _valueFromEvent(ev) {
    const svgEl = this.renderRoot.querySelector('svg');
    if (!svgEl) return null;
    const rect = svgEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let angle = (Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180) / Math.PI;
    if (angle < 0) angle += 360;
    if (angle < 90) angle += 360; // lift the bottom-gap wrap into arc space (135..405)
    const frac = angleToFraction(angle);
    const raw = this.min + frac * (this.max - this.min);
    return clamp(roundToStep(raw, this.step, this.min), this.min, this.max);
  }

  _onPointerDown(ev) {
    if (!this.draggable) return;
    this._dragging = true;
    const v = this._valueFromEvent(ev);
    if (v != null) this._dragValue = v;
  }

  _onPointerMove(ev) {
    if (!this._dragging) return;
    const v = this._valueFromEvent(ev);
    if (v != null) this._dragValue = v;
  }

  _onPointerUp() {
    if (!this._dragging) return;
    this._dragging = false;
    if (this._dragValue != null) {
      this._emit(this._dragValue);
      this._dragValue = null;
    }
  }

  render() {
    const v = this._displayValue != null ? this._displayValue : this.min;
    const frac = valueToFraction(v, this.min, this.max);
    const color = hvacColor(this.mode);
    const trackPath = describeArc(CENTER, CENTER, RADIUS, 0, 1);
    const valuePath = describeArc(CENTER, CENTER, RADIUS, 0, Math.max(frac, 0.0001));
    const handle = polarToCartesian(CENTER, CENTER, RADIUS, fractionToAngle(frac));

    return html`
      <div
        class="dial"
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
        @pointerleave=${this._onPointerUp}
      >
        <svg viewBox="0 0 200 200" @pointerdown=${this._onPointerDown}>
          <path class="track" d=${trackPath}></path>
          <path class="value" d=${valuePath} stroke=${color}></path>
          <circle
            class="handle"
            cx=${handle.x}
            cy=${handle.y}
            r="9"
            fill=${color}
            style="opacity:${this.draggable ? 1 : 0}"
          ></circle>
        </svg>
        <div class="center">
          ${this.label
            ? html`<div class="label" style="color:${color}">${this.label}</div>`
            : ''}
          <div class="target">
            <span class="target-value">${Number(v).toFixed(1)}</span>
            <span class="unit">${this.unit}</span>
          </div>
          ${this.current != null
            ? html`<div class="current">
                ↓ ${Number(this.current).toFixed(1)}${this.unit}
              </div>`
            : ''}
        </div>
        <div class="buttons">
          <button
            class="chip round"
            aria-label="decrease"
            @click=${() => this._stepBy(-1)}
          >
            −
          </button>
          <button
            class="chip round"
            aria-label="increase"
            @click=${() => this._stepBy(1)}
          >
            +
          </button>
        </div>
      </div>
    `;
  }
}

if (!customElements.get(DIAL_NAME)) {
  customElements.define(DIAL_NAME, MtDial);
}

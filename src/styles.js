import { css } from 'lit';

// Shared Mushroom-like tokens & primitives used across components.
export const sharedStyles = css`
  :host {
    --mt-gap: 12px;
    --mt-radius: 14px;
    --mt-chip-height: 38px;
    --mt-chip-radius: 12px;
    --mt-chip-bg: var(
      --ha-card-background,
      var(--card-background-color, #1c1c1c)
    );
    --mt-chip-bg-active: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.08);
    --mt-fg: var(--primary-text-color, #e1e1e1);
    --mt-fg-secondary: var(--secondary-text-color, #9b9b9b);
    --mt-accent: var(--primary-color, #03a9f4);
    --mt-divider: var(--divider-color, rgba(255, 255, 255, 0.12));
  }

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  button.chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: var(--mt-chip-height);
    padding: 0 12px;
    border: none;
    border-radius: var(--mt-chip-radius);
    background: var(--mt-chip-bg-active);
    color: var(--mt-fg);
    font: inherit;
    cursor: pointer;
    transition: background 120ms ease, color 120ms ease, transform 80ms ease;
  }

  button.chip:hover {
    background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.14);
  }

  button.chip:active {
    transform: scale(0.96);
  }

  button.chip.active {
    color: white;
  }

  ha-icon {
    --mdc-icon-size: 20px;
  }

  .divider {
    height: 1px;
    background: var(--mt-divider);
    margin: 0;
  }
`;

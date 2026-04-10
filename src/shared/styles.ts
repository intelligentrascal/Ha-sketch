import { css } from 'lit';

export const sharedStyles = css`
  :host {
    --sketch-bg: var(--ha-card-background, #faf7f0);
    --sketch-ink: var(--primary-text-color, #2a2a2a);
    --sketch-ink-muted: var(--secondary-text-color, rgba(42, 42, 42, 0.5));
    --sketch-ink-light: var(--divider-color, #e8e0d0);
    --sketch-primary: var(--primary-color, #4a6fa5);
    --sketch-success: var(--label-badge-green, #4caf50);
    --sketch-warning: var(--label-badge-yellow, #ff9800);
    --sketch-danger: var(--label-badge-red, #f44336);
    --sketch-border: var(--divider-color, #2a2a2a);
    --sketch-font: 'Caveat', cursive;
    --sketch-font-body: 'Patrick Hand', 'Caveat', cursive, var(--paper-font-body1_-_font-family, sans-serif);
    --sketch-radius: 2px;
    --sketch-shadow: drop-shadow(3px 4px 0px rgba(0, 0, 0, 0.12))
      drop-shadow(5px 7px 8px rgba(0, 0, 0, 0.08));
    --sketch-shadow-hover: drop-shadow(4px 5px 0px rgba(0, 0, 0, 0.15))
      drop-shadow(6px 8px 10px rgba(0, 0, 0, 0.1));
    --sketch-hover-bg: var(--secondary-background-color, rgba(42, 42, 42, 0.06));

    /* Active state — unified across all cards (overridable via card-mod) */
    --sketch-active: var(--sketch-primary);

    /* Icon sizing scale */
    --sketch-icon-sm: 20px;
    --sketch-icon-md: 28px;
    --sketch-icon-lg: 44px;

    /* Card-mod overridable properties */
    --sketch-card-rotate: -0.5deg;
    --sketch-shadow-intensity: 1;
    --sketch-border-style: dashed;

    display: block;
    font-family: var(--sketch-font-body);
  }

  /* Fonts loaded via <link> tag in document.head (see bottom of this file) */

  ha-card {
    background: var(--sketch-bg);
    color: var(--sketch-ink);
    border-radius: var(--sketch-radius);
    rotate: var(--sketch-card-rotate);
    filter: var(--sketch-shadow);
    transition: transform 0.3s ease, filter 0.3s ease;
    overflow: visible;
    border: 2px var(--sketch-border-style) var(--sketch-border);
    position: relative;
  }

  /* Entrance animation */
  ha-card {
    animation: sketch-enter 0.3s ease both;
  }
  @keyframes sketch-enter {
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  ha-card:hover {
    transform: translate(-1px, -1px) rotate(-0.8deg);
    filter: var(--sketch-shadow-hover);
  }

  .sketch-card-content {
    padding: clamp(10px, 3vw, 20px);
    position: relative;
  }

  /* Sketch decorative corner marks */
  .sketch-card-content::before,
  .sketch-card-content::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: var(--sketch-ink-muted);
    border-style: solid;
    opacity: 0.3;
  }
  .sketch-card-content::before {
    top: 4px;
    left: 4px;
    border-width: 2px 0 0 2px;
  }
  .sketch-card-content::after {
    bottom: 4px;
    right: 4px;
    border-width: 0 2px 2px 0;
  }

  .sketch-name {
    font-family: var(--sketch-font);
    font-size: 1.4em;
    font-weight: 600;
    color: var(--sketch-ink);
    margin: 0;
    line-height: 1.2;
  }

  .sketch-state {
    font-family: var(--sketch-font);
    font-size: 1.1em;
    color: var(--sketch-ink-muted);
    margin: 4px 0 0;
  }

  .sketch-icon {
    --mdc-icon-size: var(--sketch-icon-md);
    color: var(--sketch-primary);
  }

  /* Keyboard focus visible indicator */
  :focus-visible {
    outline: 2px solid var(--sketch-primary);
    outline-offset: 2px;
    border-radius: var(--sketch-radius);
  }

  /* Accessible slider label association */
  .sketch-slider-wrap {
    display: block;
  }
  .sketch-slider-wrap label {
    font-family: var(--sketch-font);
    font-size: 0.9em;
    color: var(--sketch-ink-muted);
    display: block;
    margin-bottom: 4px;
  }

  .sketch-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sketch-col {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .sketch-btn {
    font-family: var(--sketch-font);
    font-size: 1em;
    background: transparent;
    border: 2px dashed var(--sketch-border);
    border-radius: var(--sketch-radius);
    color: var(--sketch-ink);
    padding: 6px 14px;
    cursor: pointer;
    rotate: -0.3deg;
    transition: transform 0.2s ease, background 0.2s ease;
  }

  .sketch-btn:hover {
    background: var(--sketch-hover-bg);
    transform: translate(-1px, -1px);
  }

  .sketch-btn:active {
    transform: translate(0, 0);
  }

  .sketch-btn.active {
    background: var(--sketch-primary);
    color: var(--text-primary-color, #fff);
    border-color: var(--sketch-primary);
    border-style: solid;
  }

  .sketch-slider-container {
    width: 100%;
    margin: 8px 0;
  }

  .sketch-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: var(--sketch-ink-light);
    border-radius: 2px;
    outline: none;
  }

  .sketch-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    background: var(--sketch-primary);
    border: 2px solid var(--sketch-border);
    border-radius: 50%;
    cursor: pointer;
  }

  .sketch-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: var(--sketch-primary);
    border: 2px solid var(--sketch-border);
    border-radius: 50%;
    cursor: pointer;
  }

  .sketch-label {
    font-family: var(--sketch-font);
    font-size: 0.9em;
    color: var(--sketch-ink-muted);
    display: block;
    margin-bottom: 4px;
  }

  .sketch-value {
    font-family: var(--sketch-font);
    font-size: 2em;
    font-weight: 700;
    color: var(--sketch-ink);
    line-height: 1;
  }

  .sketch-unit {
    font-size: 0.5em;
    font-weight: 400;
    color: var(--sketch-ink-muted);
    margin-left: 2px;
  }

  .sketch-divider {
    border: none;
    border-top: 1.5px dashed var(--sketch-ink-light);
    margin: 10px 0;
    opacity: 0.6;
  }

  .sketch-grid {
    display: grid;
    gap: 8px;
  }

  .sketch-badge {
    display: inline-block;
    font-family: var(--sketch-font);
    font-size: 0.8em;
    padding: 2px 8px;
    border: 1.5px solid var(--sketch-border);
    border-radius: 2px;
    rotate: -0.5deg;
  }

  .sketch-badge.on {
    background: var(--sketch-success);
    color: var(--text-primary-color, #fff);
    border-color: var(--sketch-success);
  }

  .sketch-badge.off {
    background: transparent;
    color: var(--sketch-ink-muted);
  }

  /* Unavailable entity state */
  :host(.unavailable) ha-card {
    opacity: 0.55;
    border-style: dotted;
  }
  :host(.unavailable) .sketch-slider,
  :host(.unavailable) .sketch-btn,
  :host(.unavailable) button {
    pointer-events: none;
    opacity: 0.4;
  }
  .sketch-unavailable-label {
    font-family: var(--sketch-font);
    font-size: 0.9em;
    color: var(--sketch-danger);
    font-style: italic;
  }

  /* Empty/loading state placeholders */
  .sketch-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    color: var(--sketch-ink-muted);
    font-family: var(--sketch-font);
    font-style: italic;
    font-size: 0.9em;
    min-height: 60px;
  }
  .sketch-empty ha-icon {
    --mdc-icon-size: 32px;
    opacity: 0.4;
  }
  .sketch-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
  .sketch-loading::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px dashed var(--sketch-ink-muted);
    border-radius: 50%;
    animation: sketch-spin 1.5s linear infinite;
    opacity: 0.5;
  }
  @keyframes sketch-spin {
    to { transform: rotate(360deg); }
  }

  /* Service call error flash */
  :host(.sketch-error) ha-card {
    animation: sketch-error-flash 0.6s ease;
  }
  @keyframes sketch-error-flash {
    0%, 100% { box-shadow: none; }
    30% { box-shadow: 0 0 0 2px var(--sketch-danger); }
  }

  /* Tap ripple feedback */
  .sketch-tap-target {
    position: relative;
    overflow: hidden;
  }
  .sketch-tap-target:active::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--sketch-ink);
    opacity: 0.06;
    border-radius: inherit;
    pointer-events: none;
  }

  /* State-change highlight animation */
  @keyframes sketch-state-pulse {
    0% { box-shadow: 0 0 0 0 var(--sketch-primary); }
    50% { box-shadow: 0 0 0 4px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }

  @media (prefers-reduced-motion: reduce) {
    ha-card,
    .sketch-btn {
      transition: none;
      animation: none;
    }
    ha-card {
      rotate: 0deg;
    }
    .sketch-tap-target:active::after {
      display: none;
    }
  }
`;

export const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Patrick+Hand&display=swap';
if (!document.head.querySelector('link[href*="Caveat"]')) {
  document.head.appendChild(fontLink);
}

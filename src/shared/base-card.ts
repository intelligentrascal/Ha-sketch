import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { sharedStyles } from './styles';
import type { HomeAssistant, CardConfig, ActionConfig } from './types';

/** Dispatch haptic feedback to the HA companion app. */
function forwardHaptic(type: string): void {
  window.dispatchEvent(new CustomEvent('haptic', { detail: type }));
}

export abstract class BaseSketchCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() protected _config!: CardConfig;

  private _holdTimer?: ReturnType<typeof setTimeout>;
  private _dblTapTimer?: ReturnType<typeof setTimeout>;
  private _holdFired = false;
  private _lastTap = 0;
  private _prevState = '';

  static styles = [sharedStyles];

  setConfig(config: CardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = { ...config };
  }

  getCardSize(): number {
    return 3;
  }

  getLayoutOptions() {
    return { grid_columns: 4, grid_rows: this.getCardSize() };
  }

  protected getEntity() {
    if (!this._config?.entity || !this.hass) return undefined;
    return this.hass.states[this._config.entity];
  }

  /** Check if entity is unavailable or unknown. */
  protected isUnavailable(): boolean {
    const entity = this.getEntity();
    return !!entity && ['unavailable', 'unknown'].includes(entity.state);
  }

  protected getName(): string {
    if (this._config?.name) return this._config.name;
    const entity = this.getEntity();
    return entity?.attributes?.friendly_name || this._config?.entity || '';
  }

  protected getIcon(): string {
    if (this._config?.icon) return this._config.icon;
    const entity = this.getEntity();
    return entity?.attributes?.icon || 'mdi:help-circle-outline';
  }

  protected async callService(domain: string, service: string, data?: Record<string, any>): Promise<void> {
    try {
      await this.hass.callService(domain, service, data);
    } catch (err) {
      // Brief red flash to indicate error
      this.classList.add('sketch-error');
      setTimeout(() => this.classList.remove('sketch-error'), 1000);
      console.error('Ha-sketch service call failed:', err);
    }
  }

  protected toggleEntity(): void {
    if (!this._config?.entity) return;
    const [domain] = this._config.entity.split('.');
    this.callService(domain, 'toggle', { entity_id: this._config.entity });
  }

  protected fireEvent(type: string, detail?: any): void {
    this.dispatchEvent(
      new CustomEvent(type, {
        bubbles: true,
        composed: true,
        detail,
      })
    );
  }

  /** Execute a specific action config (tap, hold, or double-tap). */
  protected executeAction(actionConfig: ActionConfig | undefined, defaultAction: string = 'more-info'): void {
    if ((actionConfig as any)?.confirmation && !window.confirm('Are you sure?')) return;
    const action = actionConfig?.action || defaultAction;
    switch (action) {
      case 'toggle':
        this.toggleEntity();
        forwardHaptic('success');
        break;
      case 'call-service':
        if (actionConfig?.service) {
          const [domain, service] = actionConfig.service.split('.');
          this.callService(domain, service, actionConfig.service_data);
          forwardHaptic('light');
        }
        break;
      case 'navigate':
        if (actionConfig?.navigation_path) {
          window.history.pushState(null, '', actionConfig.navigation_path);
          this.fireEvent('location-changed');
          forwardHaptic('light');
        }
        break;
      case 'url':
        if (actionConfig?.url_path) {
          window.open(actionConfig.url_path, '_blank');
          forwardHaptic('light');
        }
        break;
      case 'none':
        break;
      case 'more-info':
      default:
        this.fireEvent('hass-more-info', { entityId: this._config?.entity });
        forwardHaptic('light');
        break;
    }
  }

  updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    if (changedProps.has('hass')) {
      const unavailable = this.isUnavailable();
      if (unavailable && !this.classList.contains('unavailable')) {
        this.classList.add('unavailable');
      } else if (!unavailable && this.classList.contains('unavailable')) {
        this.classList.remove('unavailable');
      }

      // State-change highlight
      const entity = this.getEntity();
      if (entity && this._prevState && entity.state !== this._prevState) {
        const card = this.shadowRoot?.querySelector('ha-card') as HTMLElement | null;
        if (card) {
          card.style.animation = 'none';
          void card.offsetHeight;
          card.style.animation = 'sketch-state-pulse 0.6s ease';
        }
      }
      if (entity) this._prevState = entity.state;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._holdTimer) clearTimeout(this._holdTimer);
    if (this._dblTapTimer) clearTimeout(this._dblTapTimer);
  }

  /** Override in subclasses to change the default tap action (e.g., 'toggle' for lights/buttons). */
  protected get defaultTapAction(): string {
    return 'more-info';
  }

  /** Keyboard handler — Enter/Space triggers tap action. Bind to @keydown on interactive elements. */
  protected handleKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.executeAction(this._config?.tap_action, this.defaultTapAction);
    }
  };

  /** Simple tap handler — fires tap_action. Use for backwards compatibility. */
  protected handleAction(): void {
    this.executeAction(this._config?.tap_action, this.defaultTapAction);
  }

  /**
   * Pointer-aware action handler supporting tap, hold, and double-tap.
   * Bind to @pointerdown and @pointerup on the target element.
   */
  protected handlePointerDown = (_ev: PointerEvent): void => {
    this._holdFired = false;
    this._holdTimer = setTimeout(() => {
      this._holdFired = true;
      if (this._config?.hold_action) {
        this.executeAction(this._config.hold_action);
        forwardHaptic('medium');
      }
    }, 500);
  };

  protected handlePointerUp = (_ev: PointerEvent): void => {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
    if (this._holdFired) return;

    const now = Date.now();
    if (this._config?.double_tap_action && now - this._lastTap < 250) {
      // Double-tap detected
      if (this._dblTapTimer) {
        clearTimeout(this._dblTapTimer);
        this._dblTapTimer = undefined;
      }
      this._lastTap = 0;
      this.executeAction(this._config.double_tap_action);
    } else {
      // Single tap — delay to check for double-tap
      this._lastTap = now;
      if (this._config?.double_tap_action) {
        this._dblTapTimer = setTimeout(() => {
          this._lastTap = 0;
          this.executeAction(this._config?.tap_action, this.defaultTapAction);
        }, 250);
      } else {
        this.executeAction(this._config?.tap_action, this.defaultTapAction);
      }
    }
  };

  protected handlePointerCancel = (): void => {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
    this._holdFired = false;
  };
}

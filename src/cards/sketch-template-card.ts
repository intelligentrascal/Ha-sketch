import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import type { HomeAssistant, TemplateCardConfig } from '../shared/types';
import '../editors/sketch-template-card-editor';

@customElement('sketch-template-card')
export class SketchTemplateCard extends BaseSketchCard {
  @state() private _primary = '';
  @state() private _secondary = '';
  @state() private _icon = '';
  @state() private _iconColor = '';
  @state() private _badgeIcon = '';
  private _unsubs: Array<() => void> = [];
  private _subscribing = false;

  static styles = [
    ...super.styles,
    css`
      .template-wrap {
        display: flex;
        gap: 14px;
        cursor: pointer;
      }
      .template-wrap.vertical {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .template-icon-wrap {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .template-icon-wrap ha-icon {
        --mdc-icon-size: var(--sketch-icon-lg, 44px);
        color: var(--sketch-ink-muted);
        transition: color 0.3s ease;
      }
      .template-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--sketch-danger, #f44336);
      }
      .template-badge ha-icon {
        --mdc-icon-size: 12px;
        color: var(--text-primary-color, #fff);
      }
      .template-info {
        flex: 1;
        min-width: 0;
      }
      .template-primary {
        font-family: var(--sketch-font);
        font-size: 1.3em;
        font-weight: 600;
        color: var(--sketch-ink);
        line-height: 1.3;
      }
      .template-secondary {
        font-family: var(--sketch-font-body);
        font-size: 0.95em;
        color: var(--sketch-ink-muted);
        margin-top: 4px;
        line-height: 1.5;
      }
      .template-secondary.multiline {
        white-space: normal;
        overflow: visible;
      }
      .template-secondary:not(.multiline) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ];

  private get _templateConfig(): TemplateCardConfig {
    return this._config as TemplateCardConfig;
  }

  setConfig(config: TemplateCardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = { ...config } as any;
  }

  static getConfigElement() {
    return document.createElement('sketch-template-card-editor');
  }

  static getStubConfig() {
    return {
      primary: '{{ now().strftime("%-I:%M %p") }}',
      secondary: '{{ now().strftime("%A, %B %-d") }}',
      icon: 'mdi:home',
    };
  }

  getCardSize() {
    return 2;
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscribeTemplates();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeAll();
  }

  updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    if (changedProps.has('hass') || changedProps.has('_config')) {
      this._subscribeTemplates();
    }
  }

  private _unsubscribeAll() {
    this._unsubs.forEach((unsub) => unsub());
    this._unsubs = [];
  }

  private async _subscribeTemplates() {
    if (!this.hass?.connection || this._subscribing) return;
    this._subscribing = true;

    this._unsubscribeAll();

    const cfg = this._templateConfig;

    if (cfg.primary) {
      this._subscribeTemplate(cfg.primary, (result) => { this._primary = result; });
    }
    if (cfg.secondary) {
      this._subscribeTemplate(cfg.secondary, (result) => { this._secondary = result; });
    }
    if (cfg.icon && cfg.icon.includes('{')) {
      this._subscribeTemplate(cfg.icon, (result) => { this._icon = result.trim(); });
    } else {
      this._icon = cfg.icon || '';
    }
    if (cfg.icon_color && cfg.icon_color.includes('{')) {
      this._subscribeTemplate(cfg.icon_color, (result) => { this._iconColor = result.trim(); });
    } else {
      this._iconColor = cfg.icon_color || '';
    }
    if (cfg.badge_icon && cfg.badge_icon.includes('{')) {
      this._subscribeTemplate(cfg.badge_icon, (result) => { this._badgeIcon = result.trim(); });
    } else {
      this._badgeIcon = cfg.badge_icon || '';
    }

    this._subscribing = false;
  }

  private async _subscribeTemplate(template: string, callback: (result: string) => void) {
    try {
      const unsub = await this.hass.connection.subscribeMessage(
        (msg: any) => {
          if (msg.result !== undefined) {
            callback(String(msg.result));
          }
        },
        { type: 'render_template', template, variables: {} }
      );
      this._unsubs.push(unsub);
    } catch (_e) {
      // Template rendering failed — show raw template as fallback
      callback(template);
    }
  }

  private _getIconColor(): string {
    const colorMap: Record<string, string> = {
      red: 'var(--sketch-danger, #f44336)',
      green: 'var(--sketch-success, #4caf50)',
      amber: 'var(--sketch-warning, #ff9800)',
      orange: 'var(--sketch-warning, #ff9800)',
      blue: 'var(--sketch-primary, #4a6fa5)',
      'deep-purple': 'var(--sketch-deep-purple, #7c77b9)',
      cyan: 'var(--sketch-cyan, #00bcd4)',
      disabled: 'var(--sketch-ink-muted)',
    };
    if (!this._iconColor) return 'var(--sketch-ink-muted)';
    return colorMap[this._iconColor] || this._iconColor;
  }

  render() {
    const cfg = this._templateConfig;
    const layout = cfg.layout || 'horizontal';
    const showIcon = cfg.show_icon !== false;
    const multiline = cfg.multiline_secondary === true;
    const icon = this._icon || cfg.icon || 'mdi:text-box-outline';
    const hasActive = this._iconColor && this._iconColor !== 'disabled' && this._iconColor !== 'grey';

    return html`
      <ha-card>
        ${this.renderSketchBg(400, 200, !!hasActive)}
        <div class="sketch-card-content">
          <div
            class="template-wrap ${layout === 'vertical' ? 'vertical' : ''}"
            role="button"
            tabindex="0"
            aria-label="${this._primary || 'Template card'}"
            @keydown=${this.handleKeyDown}
            @pointerdown=${this.handlePointerDown}
            @pointerup=${this.handlePointerUp}
            @pointercancel=${this.handlePointerCancel}
          >
            ${showIcon
              ? html`
                  <div class="template-icon-wrap">
                    <ha-icon .icon=${icon} style="color: ${this._getIconColor()}"></ha-icon>
                    ${this._badgeIcon
                      ? html`
                          <div class="template-badge" style="background: ${cfg.badge_color ? this._resolveColor(cfg.badge_color) : 'var(--sketch-danger)'}">
                            <ha-icon .icon=${this._badgeIcon}></ha-icon>
                          </div>
                        `
                      : nothing}
                  </div>
                `
              : nothing}
            <div class="template-info">
              ${this._primary
                ? html`<div class="template-primary">${this._primary}</div>`
                : nothing}
              ${this._secondary
                ? html`<div class="template-secondary ${multiline ? 'multiline' : ''}">${this._secondary}</div>`
                : nothing}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _resolveColor(color: string): string {
    const colorMap: Record<string, string> = {
      red: 'var(--sketch-danger, #f44336)',
      green: 'var(--sketch-success, #4caf50)',
      amber: 'var(--sketch-warning, #ff9800)',
      blue: 'var(--sketch-primary, #4a6fa5)',
    };
    return colorMap[color] || color;
  }
}

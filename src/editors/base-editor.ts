import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../shared/types';

// Match HA's fireEvent exactly: new Event with detail set manually
function fireEvent(node: HTMLElement, type: string, detail?: any): void {
  const event = new Event(type, {
    bubbles: true,
    cancelable: false,
    composed: true,
  });
  (event as any).detail = detail;
  node.dispatchEvent(event);
}

/**
 * Base class for all sketch card editors.
 * Uses ha-form with declarative schemas — the standard HA editor pattern.
 * Pattern copied from Mushroom cards (the gold standard for HA custom card editors).
 */
export abstract class BaseSketchEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() protected _config?: any;

  static styles = [css`
    :host {
      display: block;
    }
    .editor-note {
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 8px 0;
    }
  `];

  public setConfig(config: any): void {
    // Apply defaults for boolean fields so ha-form shows correct initial state.
    // Cards treat undefined booleans as true (e.g., show_name !== false),
    // so the editor must reflect that by defaulting them to true.
    this._config = {
      show_name: true,
      show_state: true,
      show_icon: true,
      ...config,
    };
  }

  /** Override in subclasses to define the form schema. */
  protected abstract get _schema(): any[];

  /** Arrow function property so `this` is always bound when passed to ha-form. */
  private _computeLabel = (schema: any): string => {
    const labels: Record<string, string> = {
      entity: 'Entity',
      name: 'Name (optional)',
      icon: 'Icon (optional)',
      show_name: 'Show Name',
      show_state: 'Show State',
      show_icon: 'Show Icon',
      show_brightness: 'Show Brightness Slider',
      show_color_temp: 'Show Color Temperature',
      show_current_as_primary: 'Show Current Temp as Primary',
      show_forecast: 'Show Forecast',
      num_forecasts: 'Number of Forecast Days',
      graph: 'Show Graph',
      show_artwork: 'Show Artwork',
      show_source: 'Show Source',
      show_position: 'Show Position Slider',
      show_tilt: 'Show Tilt Slider',
      show_location: 'Show Location',
      show_battery: 'Show Battery',
      battery_entity: 'Battery Entity',
      show_controls: 'Show Controls',
      aspect_ratio: 'Aspect Ratio',
      hide_icon: 'Hide Icon',
      states: 'Alarm States',
      mode: 'Display Mode',
      show_date: 'Show Date',
      show_seconds: 'Show Seconds',
      hash: 'Hash (e.g. kitchen)',
      auto_close: 'Auto-close (seconds)',
      width: 'Width (e.g. 90%)',
      style: 'Style',
      columns: 'Columns',
      collapsible: 'Collapsible',
    };
    return labels[schema.name] || schema.name;
  };

  /** Matches Mushroom pattern: pass ev.detail.value directly as config. */
  private _valueChanged = (ev: CustomEvent): void => {
    fireEvent(this, 'config-changed', { config: ev.detail.value });
  };

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

/** Common schema fields for entity-based cards. */
export function entitySchema(domain?: string): any[] {
  return [
    { name: 'entity', selector: { entity: domain ? { domain } : {} } },
    {
      type: 'grid',
      name: '',
      schema: [
        { name: 'name', selector: { text: {} } },
        { name: 'icon', selector: { icon: {} }, context: { icon_entity: 'entity' } },
      ],
    },
    { name: 'show_name', selector: { boolean: {} } },
    { name: 'show_state', selector: { boolean: {} } },
    { name: 'show_icon', selector: { boolean: {} } },
  ];
}

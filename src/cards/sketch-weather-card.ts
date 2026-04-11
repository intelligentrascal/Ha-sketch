import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseSketchCard } from '../shared/base-card';
import { stateIcon, weatherConditionIcon } from '../shared/utils';
import type { HomeAssistant, WeatherCardConfig, WeatherForecast } from '../shared/types';
import '../editors/sketch-weather-card-editor';

@customElement('sketch-weather-card')
export class SketchWeatherCard extends BaseSketchCard {
  static styles = [
    ...super.styles,
    css`
      .weather-main {
        display: flex;
        align-items: center;
        gap: 16px;
        cursor: pointer;
      }
      .weather-icon-wrap {
        flex-shrink: 0;
      }
      .weather-icon-wrap ha-icon {
        --mdc-icon-size: 48px;
        color: var(--sketch-primary);
      }
      .weather-temp {
        font-family: var(--sketch-font);
        font-size: 2.6em;
        font-weight: 700;
        line-height: 1;
      }
      .weather-condition {
        font-family: var(--sketch-font);
        font-size: 1em;
        color: var(--sketch-ink-muted);
        text-transform: capitalize;
        margin-top: 2px;
      }
      .weather-details {
        display: flex;
        gap: 16px;
        margin-top: 10px;
        flex-wrap: wrap;
      }
      .weather-detail {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
      }
      .weather-detail ha-icon {
        --mdc-icon-size: 16px;
      }
      .forecast-row {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        gap: 4px;
        overflow-x: auto;
      }
      .forecast-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        min-width: 48px;
        padding: 4px;
      }
      .forecast-day-name {
        font-family: var(--sketch-font);
        font-size: 0.75em;
        color: var(--sketch-ink-muted);
        font-weight: 600;
      }
      .forecast-day ha-icon {
        --mdc-icon-size: 20px;
        color: var(--sketch-primary);
      }
      .forecast-temps {
        font-family: var(--sketch-font);
        font-size: 0.75em;
      }
      .forecast-high { font-weight: 700; }
      .forecast-low { color: var(--sketch-ink-muted); }
    `,
  ];

  setConfig(config: WeatherCardConfig): void {
    if (!config.entity) throw new Error('Please define a weather entity');
    super.setConfig(config);
  }

  static getConfigElement() {
    return document.createElement('sketch-weather-card-editor');
  }

  static getStubConfig(hass: HomeAssistant) {
    const weather = Object.keys(hass.states).filter((e) => e.startsWith('weather.'));
    return { entity: weather[0] || 'weather.example' };
  }

  getCardSize() {
    const config = this._config as any;
    return config?.show_forecast !== false ? 5 : 3;
  }

  private get _weatherConfig(): WeatherCardConfig {
    return this._config as WeatherCardConfig;
  }

  private _weatherIconName(condition: string): string {
    return weatherConditionIcon(condition);
  }

  render() {
    const entity = this.getEntity();
    if (!entity) {
      return html`<ha-card><div class="sketch-card-content"><p class="sketch-name">Weather not found</p></div></ha-card>`;
    }

    const temp = entity.attributes.temperature ?? '--';
    const unit = entity.attributes.temperature_unit || '\u00b0';
    const condition = entity.state;
    const humidity = entity.attributes.humidity;
    const wind = entity.attributes.wind_speed;
    const windUnit = entity.attributes.wind_speed_unit || 'km/h';
    const pressure = entity.attributes.pressure;
    const forecast = entity.attributes.forecast || [];
    const showForecast = this._weatherConfig.show_forecast !== false;
    const numForecasts = this._weatherConfig.num_forecasts || 5;
    const showName = this._config.show_name !== false;
    const showIcon = this._config.show_icon !== false;

    return html`
      <ha-card>
        ${this.renderSketchBg()}
        <div class="sketch-card-content">
          ${showName ? html`<p class="sketch-name" style="margin-bottom:8px">${this.getName()}</p>` : nothing}
          <div class="weather-main" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${showIcon
              ? html`
                  <div class="weather-icon-wrap">
                    <ha-icon .icon=${this._weatherIconName(condition)}></ha-icon>
                  </div>
                `
              : nothing}
            <div>
              <div class="weather-temp">${temp}${unit}</div>
              <div class="weather-condition">${condition.replace(/-/g, ' ')}</div>
            </div>
          </div>

          <div class="weather-details">
            ${humidity != null
              ? html`<div class="weather-detail"><ha-icon icon="mdi:water-percent"></ha-icon>${humidity}%</div>`
              : nothing}
            ${wind != null
              ? html`<div class="weather-detail"><ha-icon icon="mdi:weather-windy"></ha-icon>${wind} ${windUnit}</div>`
              : nothing}
            ${pressure != null
              ? html`<div class="weather-detail"><ha-icon icon="mdi:gauge"></ha-icon>${pressure} hPa</div>`
              : nothing}
          </div>

          ${showForecast && forecast.length > 0
            ? html`
                <hr class="sketch-divider" />
                <div class="forecast-row">
                  ${forecast.slice(0, numForecasts).map(
                    (day: WeatherForecast) => html`
                      <div class="forecast-day">
                        <span class="forecast-day-name">
                          ${new Date(day.datetime).toLocaleDateString(undefined, { weekday: 'short' })}
                        </span>
                        <ha-icon .icon=${this._weatherIconName(day.condition)}></ha-icon>
                        <div class="forecast-temps">
                          <span class="forecast-high">${day.temperature}\u00b0</span>
                          ${day.templow != null
                            ? html`<span class="forecast-low"> ${day.templow}\u00b0</span>`
                            : nothing}
                        </div>
                      </div>
                    `
                  )}
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

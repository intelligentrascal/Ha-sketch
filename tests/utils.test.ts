import { describe, it, expect } from 'vitest';
import { isEntityActive, formatState, timeAgo, clamp, weatherConditionIcon } from '../src/shared/utils';
import type { HassEntity } from '../src/shared/types';

function mockEntity(overrides: Partial<HassEntity> = {}): HassEntity {
  return {
    entity_id: 'sensor.test',
    state: 'on',
    attributes: {},
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    context: { id: 'test' },
    ...overrides,
  };
}

describe('isEntityActive', () => {
  it('returns true for active states', () => {
    expect(isEntityActive('on')).toBe(true);
    expect(isEntityActive('open')).toBe(true);
    expect(isEntityActive('playing')).toBe(true);
    expect(isEntityActive('home')).toBe(true);
    expect(isEntityActive('unlocked')).toBe(true);
  });

  it('returns false for inactive states', () => {
    expect(isEntityActive('off')).toBe(false);
    expect(isEntityActive('closed')).toBe(false);
    expect(isEntityActive('unavailable')).toBe(false);
    expect(isEntityActive('unknown')).toBe(false);
    expect(isEntityActive('idle')).toBe(false);
  });
});

describe('formatState', () => {
  it('returns state with unit when present', () => {
    const entity = mockEntity({ state: '22.5', attributes: { unit_of_measurement: '°C' } });
    expect(formatState(entity)).toBe('22.5 °C');
  });

  it('returns raw state without unit', () => {
    const entity = mockEntity({ state: 'on' });
    expect(formatState(entity)).toBe('on');
  });

  it('uses hass.formatEntityState when available', () => {
    const entity = mockEntity({ state: 'on' });
    const hass = { formatEntityState: () => 'On' };
    expect(formatState(entity, hass)).toBe('On');
  });
});

describe('timeAgo', () => {
  it('returns "just now" for recent times', () => {
    const now = new Date().toISOString();
    expect(timeAgo(now)).toBe('just now');
  });

  it('returns minutes ago', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(timeAgo(fiveMinAgo)).toBe('5m ago');
  });

  it('returns hours ago', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(twoHoursAgo)).toBe('2h ago');
  });

  it('returns days ago', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(threeDaysAgo)).toBe('3d ago');
  });
});

describe('clamp', () => {
  it('clamps below min', () => {
    expect(clamp(-5, 0, 100)).toBe(0);
  });

  it('clamps above max', () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it('passes through values in range', () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });
});

describe('weatherConditionIcon', () => {
  it('maps known conditions', () => {
    expect(weatherConditionIcon('sunny')).toBe('mdi:weather-sunny');
    expect(weatherConditionIcon('rainy')).toBe('mdi:weather-rainy');
    expect(weatherConditionIcon('cloudy')).toBe('mdi:weather-cloudy');
    expect(weatherConditionIcon('snowy')).toBe('mdi:weather-snowy');
  });

  it('returns default for unknown', () => {
    expect(weatherConditionIcon('unknown-condition')).toBe('mdi:weather-cloudy');
  });
});

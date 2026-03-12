export const TIME_MS = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
} as const;

export const QUERY_TIME = {
  fiveMinutes: TIME_MS.MINUTE * 5,
  tenMinutes: TIME_MS.MINUTE * 10,
  halfHour: TIME_MS.MINUTE * 30,
  oneHour: TIME_MS.HOUR,
} as const;

export const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
export const MINUTES = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

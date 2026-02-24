export const TIME_MS = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
} as const;

export const QUERY_STALE_TIME = {
  fiveMinutes: TIME_MS.MINUTE * 5,
  tenMinutes: TIME_MS.MINUTE * 10,
  halfHour: TIME_MS.MINUTE * 30,
} as const;

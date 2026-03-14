const NOW = new Date();

export const CURRENT_DATE = {
  YEAR: NOW.getFullYear(),
  MONTH: NOW.getMonth() + 1,
  DATE: NOW.getDate(),
} as const;

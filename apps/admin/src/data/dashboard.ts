export const DASHBOARD = {
  totalFamilies: 250000,
  activeFamilies: 248500,
  totalUsers: 1000000,
  blockedUsers: 1523,
  todayEvents: 432000000,
  currentTps: 5000,
  systemHealth: {
    redis: 'UP',
    kafka: 'UP',
    mysql: 'UP',
  },
  recentBlocks: [
    {
      familyId: 100,
      customerId: 12346,
      reason: 'MONTHLY_LIMIT_EXCEEDED',
      blockedAt: '2024-01-15T10:30:00Z',
    },
  ],
};

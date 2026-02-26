import { CustomerDetail } from '../types/familyType';

export const FAMILY_DETAIL = {
  familyId: 100,
  familyName: '김씨 가족',
  createdById: 12345,
  customers: [
    {
      customerId: 12345,
      name: '아빠',
      role: 'OWNER',
      monthlyLimitBytes: 5368709120,
      monthlyUsedBytes: 1073741824,
    },
    {
      customerId: 12350,
      name: '엄마',
      role: 'OWNER',
      monthlyLimitBytes: 5368709120,
      monthlyUsedBytes: 1073741824,
    },
    {
      customerId: 12346,
      name: '자녀1',
      role: 'MEMBER',
      monthlyLimitBytes: 5368709120,
      monthlyUsedBytes: 1073741824,
    },
    {
      customerId: 12347,
      name: '자녀2',
      role: 'MEMBER',
      monthlyLimitBytes: 2147483648,
      monthlyUsedBytes: 2147483648,
    },
  ] as CustomerDetail[],
  totalQuotaBytes: 107374182400,
  usedBytes: 53687091200,
  usedPercent: 50,
  currentMonth: '2024-01',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
} as const;

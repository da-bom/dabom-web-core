import { CustomerDetail } from '@shared/type/familyType';

import { FamilyDetail } from './PoliciesType';

export interface UsageCustomer extends Pick<
  CustomerDetail,
  'customerId' | 'name' | 'monthlyUsedBytes' | 'monthlyLimitBytes'
> {
  isBlocked: boolean;
  blockReason: string;
  isMe: boolean;
}

export interface FamilyUsageData extends Pick<
  FamilyDetail,
  'familyId' | 'familyName' | 'totalQuotaBytes'
> {
  year: number;
  month: number;
  remainingBytes: number;
  customers: UsageCustomer[];
}

export interface ServiceUsageResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface UsageSSEData {
  familyId: number;
  totalUsageLimitBytes: number;
  totalLimitBytes: number;
  remainingBytes: number;
}

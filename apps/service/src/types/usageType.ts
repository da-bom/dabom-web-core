import { CustomerDetail } from "@shared/type/familyType";

import { FamilyDetail } from "./policiesType";

export interface UsageCustomer extends Pick<
  CustomerDetail,
  "customerId" | "name" | "monthlyUsedBytes" | "monthlyLimitBytes"
> {
  isBlocked: boolean;
  isMe: boolean;
}

export interface FamilyCurrentUsageResponse extends Pick<
  FamilyDetail,
  "familyId" | "familyName" | "totalQuotaBytes"
> {
  remainingBytes: number;
}

export interface FamilyCustomersUsageResponse {
  familyId: number;
  year: number;
  month: number;
  customers: UsageCustomer[];
}

export interface ServiceUsageResponse<T> {
  success: boolean;
  data: T;
}

export interface SSEUsageUpdatedResponse {
  familyId: number;
  totalUsedBytes: number;
  totalLimitBytes: number;
  remainingBytes: number;
}

export interface SSEFamilyUsageUpdateResponse {
  familyId: number;
  customerId: number;
  monthlyUsedBytes: number;
}

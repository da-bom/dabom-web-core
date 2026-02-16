import { CustomerDetail } from "@shared/type/familyType";

export interface ApiFamilyDetail {
  familyId: number;
  familyName: string;
  customers: CustomerDetail[];
  totalQuotaBytes: number;
  usedBytes: number;
  usedPercent: number;
  currentMonth: string;
}

export interface CustomerListType {
  customerId: number;
  name: string;
  monthlyUsedBytes: number;
  monthlyLimitBytes: number;
  isBlocked: boolean;
  isMe?: boolean;
  blockReason?: string;
}

export interface DashboardViewModel {
  totalUsageGB: number;
  totalLimitGB: number;
  usagePercent: number;
  displayDate: string;
  members: CustomerListType[];
  chartGradient: string;
}

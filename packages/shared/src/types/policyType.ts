export type RuleType =
  | "MONTHLY_BLOCK"
  | "MANUAL_BLOCK"
  | "TIME_BLOCK"
  | "APP_BLOCK";

export interface MONTHLY_BLOCK {
  monthlyLimitBytes: number;
}

export interface TIME_BLOCK {
  start: string;
  end: string;
  timezone: string;
}

export interface MANUAL_BLOCK {
  reason: "MANUAL";
}

export interface APP_BLOCK {
  apps: string[];
}

export interface PolicyType {
  policyId: number;
  name: string;
  type: string;
  default_rules: MONTHLY_BLOCK | TIME_BLOCK | MANUAL_BLOCK;
  requireRole: "ADMIN" | "OWNER" | "MEMBER";
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PolicyResponse {
  policies: PolicyType[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

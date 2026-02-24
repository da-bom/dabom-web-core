export type RuleType =
  | "MonthlyBlock"
  | "TimeBlock"
  | "ManualBlock"
  | "AppBlock";

export interface MonthlyBlock {
  monthlyLimitBytes: number;
}

export interface TimeBlock {
  start: string;
  end: string;
  timezone: string;
}

export interface ManualBlock {
  reason: "MANUAL";
}

export interface AppBlock {
  apps: string[];
}

export interface PolicyType {
  policyId: number;
  name: string;
  type: RuleType;
  default_rules: MonthlyBlock | TimeBlock | ManualBlock | AppBlock;
  requireRole: "ADMIN" | "OWNER" | "MEMBER";
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PolicyDetailType extends PolicyType {
  description: string;
}

export interface EditablePolicyFields {
  description: string;
  default_rules: PolicyDetailType["default_rules"];
  requireRole: PolicyDetailType["requireRole"];
  isActive: boolean;
}

export interface PolicyResponse {
  policies: PolicyType[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type RuleType =
  | "MONTHLY_LIMIT"
  | "MANUAL_BLOCK"
  | "TIME_BLOCK"
  | "APP_BLOCK";

export interface MONTHLY_LIMIT {
  limitBytes: number;
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
  id: number;
  name: string;
  policyType: RuleType;
  defaultRules: MONTHLY_LIMIT | TIME_BLOCK | MANUAL_BLOCK | APP_BLOCK;
  requiredRole: "ADMIN" | "OWNER" | "MEMBER";
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

// export interface PolicyDetailType extends PolicyType {
//   description: string;
// }

export interface PolicyDetailType {
  id: number;
  description: string;
  name: string;
  policyType: RuleType;
  defaultRules: MONTHLY_LIMIT | TIME_BLOCK | MANUAL_BLOCK | APP_BLOCK;
  requiredRole: "ADMIN" | "OWNER" | "MEMBER";
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EditablePolicyFields {
  description: string;
  defaultRules: MONTHLY_LIMIT | TIME_BLOCK | MANUAL_BLOCK | APP_BLOCK;
  requireRole: "ADMIN" | "OWNER" | "MEMBER";
  isActive: boolean;
}

export interface PolicyResponse {
  policies: PolicyType[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

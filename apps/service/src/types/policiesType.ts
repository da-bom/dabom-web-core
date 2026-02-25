import { CustomerDetail } from '@shared/type/familyType';

export type FamilyRole = 'OWNER' | 'MEMBER';

export interface ApiPolicy {
  assignmentId: number;
  policyId: number;
  policyName: string;
  type: ['MONTHLY_LIMIT' | 'TIME_BLOCK' | 'MANUAL_BLOCK'];
  isActive: boolean;
  rules: {
    limitBytes?: number;
    start?: string;
    end?: string;
    timezone?: string;
    reason?: string;
  };
}

export interface ApiCustomer {
  customerId: number;
  name: string;
  phoneNumber: string;
  role: FamilyRole;
  usedBytes: number;
  policies: ApiPolicy[];
}

export interface FamilyDetail {
  familyId: number;
  familyName: string;
  createdById: number;
  customers: CustomerDetail[];
  totalQuotaBytes: number;
  currentMonth: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePoliciesResponse {
  success: boolean;
  data: {
    familyId: number;
    totalQuotaBytes: number;
    customers: ApiCustomer[];
  };
  timestamp: string;
}

export interface UpdatePolicyRequest {
  updateInfo: {
    customerId: number;
    type: ApiPolicy['type'];
    value?: ApiPolicy['rules'];
    isActive?: boolean;
  };
}

export interface UpdatePolicyResponse {
  success: boolean;
  data: {
    result: {
      userId: number;
      type: ApiPolicy['type'];
      status: string;
    };
  };
}

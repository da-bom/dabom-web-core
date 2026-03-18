import { z } from 'zod';

import { CustomerDetail } from '@shared/type/familyType';

export const FamilyRoleSchema = z.enum(['OWNER', 'MEMBER']);
export const PolicyTypeEnum = z.enum(['MONTHLY_LIMIT', 'TIME_BLOCK', 'MANUAL_BLOCK', 'APP_BLOCK']);

export const ApiPolicyRulesSchema = z.object({
  limitBytes: z.number().nullable().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  timezone: z.string().optional(),
  reason: z.string().optional(),
  blockedApps: z.array(z.string()).optional(),
});

export const ApiPolicySchema = z.object({
  assignmentId: z.number(),
  policyId: z.number(),
  policyName: z.string(),
  type: z.string(),
  isActive: z.boolean(),
  rules: ApiPolicyRulesSchema.optional(),
});

export const ApiCustomerSchema = z.object({
  customerId: z.number(),
  name: z.string(),
  phoneNumber: z.string(),
  role: FamilyRoleSchema,
  usedBytes: z
    .number()
    .nullable()
    .optional()
    .transform((val) => val ?? 0),
  policies: z
    .array(ApiPolicySchema)
    .optional()
    .transform((val) => val ?? []),
});

export const FamilyPoliciesDataSchema = z.object({
  familyId: z.number(),
  totalQuotaBytes: z
    .number()
    .nullable()
    .optional()
    .transform((val) => val ?? 0),
  customers: z.array(ApiCustomerSchema),
});

export const UpdatePolicyRequestSchema = z.object({
  updateInfo: z.object({
    customerId: z.number(),
    type: z.union([PolicyTypeEnum, z.array(PolicyTypeEnum)]),
    value: ApiPolicyRulesSchema.optional(),
    isActive: z.boolean().optional(),
  }),
});

export const UpdatePolicyResponseSchema = z.object({
  result: z.object({
    userId: z.number(),
    type: z.union([PolicyTypeEnum, z.array(PolicyTypeEnum)]),
    status: z.string(),
  }),
});

export type FamilyRole = z.infer<typeof FamilyRoleSchema>;
export type ApiPolicy = z.infer<typeof ApiPolicySchema>;
export type ApiCustomer = z.infer<typeof ApiCustomerSchema>;
export type FamilyPoliciesData = z.infer<typeof FamilyPoliciesDataSchema>;
export type UpdatePolicyRequest = z.infer<typeof UpdatePolicyRequestSchema>;
export type UpdatePolicyResponse = z.infer<typeof UpdatePolicyResponseSchema>;

export interface ServiceCustomerDetail extends CustomerDetail {
  timeLimit: { start: string; end: string } | null;
  isBlocked: boolean;
  policies: ApiPolicy[];
  assignmentIds: {
    monthlyLimit: number | null;
    timeBlock: number | null;
    manualBlock: number | null;
  };
}

export interface FamilyDetail {
  familyId: number;
  familyName: string;
  createdById: number;
  customers: ServiceCustomerDetail[];
  totalQuotaBytes: number;
  currentMonth: string;
  createdAt: string;
  updatedAt: string;
}

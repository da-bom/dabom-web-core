import { z } from 'zod';

export const UsageCustomerSchema = z.object({
  customerId: z.number(),
  name: z.string(),
  monthlyUsedBytes: z.number(),
  monthlyLimitBytes: z
    .number()
    .nullable()
    .optional()
    .transform((val) => val ?? 0),
  isBlocked: z.boolean().optional().default(false),
  blockReason: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val ?? ''),
  isMe: z.boolean().optional().default(false),
});

export const FamilyUsageCurrentSchema = z.object({
  familyId: z.number(),
  familyName: z.string(),
  totalQuotaBytes: z.number(),
  totalUsedBytes: z.number(),
});

export const FamilyUsageMonthlySchema = z.object({
  familyId: z.number(),
  year: z.number(),
  month: z.number(),
  customers: z.array(UsageCustomerSchema),
  totalQuotaBytes: z
    .number()
    .nullable()
    .optional()
    .transform((val) => val ?? 0),
});

export const UsageSSEDataSchema = z.object({
  familyId: z.number(),
  totalUsedBytes: z.number(),
  totalQuotaBytes: z.number(),
  remainingBytes: z.number(),
});

export const UsageFamilySSEDataSchema = z.object({
  familyId: z.number(),
  customerId: z.number(),
  monthlyUsedBytes: z.number(),
});

export type UsageCustomer = z.infer<typeof UsageCustomerSchema>;
export type FamilyUsageCurrent = z.infer<typeof FamilyUsageCurrentSchema>;
export type FamilyUsageMonthly = z.infer<typeof FamilyUsageMonthlySchema>;
export type UsageSSEData = z.infer<typeof UsageSSEDataSchema>;
export type UsageFamilySSEData = z.infer<typeof UsageFamilySSEDataSchema>;

export const UpdateFamilyNameResponseSchema = z.object({
  familyId: z.number(),
  name: z.string(),
  updatedAt: z.string(),
});

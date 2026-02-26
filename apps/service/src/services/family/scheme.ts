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
  isBlocked: z.boolean(),
  blockReason: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val ?? ''),
  isMe: z.boolean(),
});

export const FamilyUsageDataSchema = z.object({
  familyId: z.number(),
  familyName: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val ?? '다봄 가족'),
  totalQuotaBytes: z
    .number()
    .nullable()
    .optional()
    .transform((val) => val ?? 0),
  year: z.number(),
  month: z.number(),
  remainingBytes: z
    .number()
    .nullable()
    .optional()
    .transform((val) => val ?? 0),
  customers: z.array(UsageCustomerSchema),
});

export const ServiceUsageResponseSchema = z.object({
  success: z.boolean(),
  data: FamilyUsageDataSchema,
  timestamp: z.string().optional(),
});

export const UsageSSEDataSchema = z.object({
  familyId: z.number(),
  totalUsageLimitBytes: z.number(),
  totalLimitBytes: z.number(),
  remainingBytes: z.number(),
});

export type UsageCustomer = z.infer<typeof UsageCustomerSchema>;
export type FamilyUsageData = z.infer<typeof FamilyUsageDataSchema>;
export type ServiceUsageResponse = z.infer<typeof ServiceUsageResponseSchema>;
export type UsageSSEData = z.infer<typeof UsageSSEDataSchema>;

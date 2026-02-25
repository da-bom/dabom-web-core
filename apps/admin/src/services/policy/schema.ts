import { z } from "zod";

// [정책 수정] request
export const PolicyUpdateRequestSchema = z.object({
  description: z.string().min(1, "설명을 입력해주세요."),
  requiredRole: z.enum(["OWNER", "ADMIN", "MEMBER"]),
  defaultRules: z.any(),
  isActive: z.boolean(),
  overWrite: z.boolean(),
});

export type PolicyUpdateRequest = z.infer<typeof PolicyUpdateRequestSchema>;

// [정책 수정] response
export const PolicyUpdateResponseSchema = z.object({
  policyId: z.number(),
  updatedAt: z.string(),
});

export type PolicyUpdateResponse = z.infer<typeof PolicyUpdateResponseSchema>;

// 정책 종류
const PolicyTypeSchema = z.enum([
  "MONTHLY_LIMIT",
  "TIME_BLOCK",
  "MANUAL_BLOCK",
  "APP_BLOCK",
]);

export const MonthlyLimitSchema = z.object({
  limitBytes: z.number(),
});

export const TimeBlockSchema = z.object({
  start: z.string(),
  end: z.string(),
  timezone: z.string(),
});

export const ManualBlockSchema = z.object({
  reason: z.literal("MANUAL"),
});

export const AppBlockSchema = z.object({
  apps: z.array(z.string()),
});

export type PolicyType = z.infer<typeof PolicyTypeSchema>;
export type MonthlyLimit = z.infer<typeof MonthlyLimitSchema>;
export type TimeBlock = z.infer<typeof TimeBlockSchema>;
export type ManualBlock = z.infer<typeof ManualBlockSchema>;
export type AppBlock = z.infer<typeof AppBlockSchema>;
export type DefaultRules = MonthlyLimit | TimeBlock | ManualBlock | AppBlock;

export const DefaultRulesSchema = z.union([
  MonthlyLimitSchema,
  TimeBlockSchema,
  ManualBlockSchema,
  AppBlockSchema,
]);

export const PolicySchema = z.object({
  id: z.number(),
  name: z.string(),
  policyType: PolicyTypeSchema,
  defaultRules: DefaultRulesSchema,
  requiredRole: z.enum(["ADMIN", "OWNER", "MEMBER"]),
  isActive: z.boolean(),
  isSystem: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// [정책 조회] response
export const PolicyResponseSchema = z.object({
  page: z.number(),
  policies: z.array(PolicySchema),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export type Policy = z.infer<typeof PolicySchema>;
export type PolicyResponse = z.infer<typeof PolicyResponseSchema>;

// [정책 상세 조회] response
export const PolicyDetailSchema = PolicySchema.extend({
  description: z.string(),
});

export type PolicyDetail = z.infer<typeof PolicyDetailSchema>;

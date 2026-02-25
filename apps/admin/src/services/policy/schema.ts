import { z } from "zod";

// [update] request
export const PolicyUpdateRequestSchema = z.object({
  description: z.string().min(1, "설명을 입력해주세요."),
  requiredRole: z.enum(["OWNER", "ADMIN", "MEMBER"]),
  defaultRules: z.any(),
  isActive: z.boolean(),
  overWrite: z.boolean(),
});

export type PolicyUpdateRequest = z.infer<typeof PolicyUpdateRequestSchema>;

// [update] response
export const PolicyUpdateResponseSchema = z.object({
  policyId: z.number(),
  updatedAt: z.string(),
});

export type PolicyUpdateResponse = z.infer<typeof PolicyUpdateResponseSchema>;

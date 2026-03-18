import { z } from 'zod';

export const AppealTypeSchema = z.enum(['NORMAL', 'EMERGENCY']);
export const AppealStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);

export type AppealType = z.infer<typeof AppealTypeSchema>;
export type AppealStatus = z.infer<typeof AppealStatusSchema>;

const DesiredRulesSchema = z
  .object({
    limitBytes: z.number().nullable().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .nullable();

const AppealBaseSchema = z.object({
  appealId: z.number(),
  policyAssignmentId: z.number().nullish(),
  status: AppealStatusSchema,
  desiredRules: DesiredRulesSchema,
  createdAt: z.string(),
});

export const CommentSchema = z.object({
  commentId: z.number(),
  authorId: z.number(),
  authorName: z.string(),
  comment: z.string(),
  createdAt: z.string(),
});

export const AppealSummarySchema = AppealBaseSchema.extend({
  type: AppealTypeSchema,
  policyType: z.string().nullish(),
  requesterId: z.number(),
  requesterName: z.string(),
  requestReason: z.string(),
});

/** 이의제기 목록 조회 */
export const AppealListResponseSchema = z.object({
  appeals: z.array(AppealSummarySchema),
  nextCursor: z.string().nullable(),
  hasNext: z.boolean(),
});

/** 이의제기 상세 조회 */
export const AppealDetailResponseSchema = AppealSummarySchema.extend({
  rejectReason: z.string().nullable(),
  resolvedById: z.number().nullable(),
  resolvedAt: z.string().nullable(),
  comments: z.object({
    content: z.array(CommentSchema),
    nextCursor: z.string().nullable(),
    hasNext: z.boolean(),
  }),
  type: AppealTypeSchema.optional(),
});

/** 이의제기 생성 */
export const AppealCreateResponseSchema = AppealBaseSchema;

export const AppealCreateRequestSchema = z.object({
  policyAssignmentId: z.number(),
  requestReason: z.string().min(1),
  policyActive: z.boolean().optional(),
  desiredRules: DesiredRulesSchema.optional(),
});

/** 긴급 쿼터 요청 */
export const EmergencyAppealResponseSchema = z.object({
  appealId: z.number(),
  type: z.literal('EMERGENCY'),
  status: z.literal('APPROVED'),
  additionalBytes: z.number(),
  newMonthlyLimitBytes: z.number(),
  requestReason: z.string(),
  createdAt: z.string(),
});

export const EmergencyAppealRequestSchema = z.object({
  requestReason: z.string(),
  additionalBytes: z.number(),
});

/** 이의제기 승인/거절 */
export const AppealRespondResponseSchema = z.object({
  appealId: z.number(),
  status: AppealStatusSchema,
  policyAssignmentId: z.number().optional(),
  desiredRules: DesiredRulesSchema.optional(),
  createdAt: z.string().optional(),
  rejectReason: z.string().nullable(),
  resolvedById: z.number().nullable(),
  resolvedAt: z.string().nullable(),
});

export const AppealRespondRequestSchema = z.object({
  action: z.enum(['APPROVED', 'REJECTED']),
  rejectReason: z.string().nullable(),
});

/** 이의제기 댓글 작성 */
export const CreateCommentResponseSchema = CommentSchema;

export const CreateCommentRequestSchema = z.object({
  comment: z.string().min(1),
});

/** 이의제기 가능 정책 목록 조회 */
export const ObjectionPolicySchema = z.object({
  policyAssignmentId: z.number(),
  policyId: z.number(),
  policyName: z.string(),
  policyType: z.enum(['TIME_BLOCK', 'MONTHLY_LIMIT', 'MANUAL_BLOCK', 'APP_BLOCK']),
  appliedRules: z.object({
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    limitBytes: z.number().optional(),
  }),
  active: z.boolean(),
  appliedAt: z.string(),
});

export const ObjectionPoliciesResponseSchema = z.object({
  policies: z.array(ObjectionPolicySchema),
});

export type Comment = z.infer<typeof CommentSchema>;
export type AppealSummary = z.infer<typeof AppealSummarySchema>;
export type AppealDetail = z.infer<typeof AppealDetailResponseSchema>;

export type AppealListResponse = z.infer<typeof AppealListResponseSchema>;
export type AppealDetailResponse = AppealDetail;

export type AppealCreateRequest = z.infer<typeof AppealCreateRequestSchema>;
export type AppealCreateResponse = z.infer<typeof AppealCreateResponseSchema>;

export type EmergencyAppealRequest = z.infer<typeof EmergencyAppealRequestSchema>;
export type EmergencyAppealResponse = z.infer<typeof EmergencyAppealResponseSchema>;

export type AppealRespondRequest = z.infer<typeof AppealRespondRequestSchema>;
export type AppealRespondResponse = z.infer<typeof AppealRespondResponseSchema>;

export type CreateCommentRequest = z.infer<typeof CreateCommentRequestSchema>;
export type CreateCommentResponse = z.infer<typeof CreateCommentResponseSchema>;

export type ObjectionPolicy = z.infer<typeof ObjectionPolicySchema>;
export type ObjectionPoliciesResponse = z.infer<typeof ObjectionPoliciesResponseSchema>;

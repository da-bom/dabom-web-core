import { z } from 'zod';

export const AppealTypeSchema = z.enum(['NORMAL', 'EMERGENCY']);
export const AppealStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);

export type AppealType = z.infer<typeof AppealTypeSchema>;
export type AppealStatus = z.infer<typeof AppealStatusSchema>;

export const CommentSchema = z.object({
  commentId: z.number(),
  authorId: z.number(),
  authorName: z.string(),
  comment: z.string(),
  createdAt: z.string(),
});

export type Comment = z.infer<typeof CommentSchema>;

export const AppealSummarySchema = z.object({
  appealId: z.number(),
  type: AppealTypeSchema,
  policyAssignmentId: z.number(),
  requesterId: z.number(),
  requesterName: z.string(),
  requestReason: z.string(),
  desiredRules: z.object({
    limitBytes: z.number(),
  }),
  status: AppealStatusSchema,
  createdAt: z.string(),
});

export type AppealSummary = z.infer<typeof AppealSummarySchema>;

export const AppealDetailSchema = z.object({
  appealId: z.number(),
  policyAssignmentId: z.number(),
  policyType: z.string(),
  requesterId: z.number(),
  requesterName: z.string(),
  requestReason: z.string(),
  rejectReason: z.string().nullable(),
  desiredRules: z.object({
    limitBytes: z.number(),
  }),
  status: AppealStatusSchema,
  resolvedById: z.number().nullable(),
  resolvedAt: z.string().nullable(),
  createdAt: z.string(),
  comments: z.object({
    content: z.array(CommentSchema),
    nextCursor: z.string().nullable(),
    hasNext: z.boolean(),
  }),
  type: AppealTypeSchema.optional(),
});

export type AppealDetail = z.infer<typeof AppealDetailSchema>;

export const AppealDetailResponseSchema = z.object({
  success: z.boolean(),
  data: AppealDetailSchema,
  timestamp: z.string(),
});

export type AppealDetailResponse = z.infer<typeof AppealDetailResponseSchema>;

export const AppealsListDataSchema = z.object({
  appeals: z.array(AppealSummarySchema),
  nextCursor: z.string().nullable(),
  hasNext: z.boolean(),
});

export type AppealsListData = z.infer<typeof AppealsListDataSchema>;

export const AppealListResponseSchema = z.object({
  success: z.boolean(),
  data: AppealsListDataSchema,
  timestamp: z.string(),
});

export type AppealListResponse = z.infer<typeof AppealListResponseSchema>;

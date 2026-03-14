import { z } from 'zod';

export const UsageByWeekdaySchema = z.object({
  monday: z.number(),
  tuesday: z.number(),
  wednesday: z.number(),
  thursday: z.number(),
  friday: z.number(),
  saturday: z.number(),
  sunday: z.number(),
});

export const PeakUsageSchema = z.object({
  startHour: z.number(),
  endHour: z.number(),
  mostUsedWeekday: z.string(),
});

export const MissionSummarySchema = z.object({
  totalMissionCount: z.number(),
  completedMissionCount: z.number(),
  rejectedRequestCount: z.number(),
});

export const AppealSummarySchema = z.object({
  totalAppeals: z.number(),
  approvedAppeals: z.number(),
  rejectedAppeals: z.number(),
});

const BaseAppealRecapSchema = z.object({
  appealId: z.number(),
  requestReason: z.string(),
});

export const RecentApprovedAppealSchema = BaseAppealRecapSchema.extend({
  approverId: z.number(),
  approverName: z.string(),
  requestedAt: z.string(),
});

export const RecentAcceptedAppealSchema = BaseAppealRecapSchema.extend({
  requesterId: z.number(),
  requesterName: z.string(),
  resolvedAt: z.string(),
});

export const TopSuccessfulRequesterSchema = z.object({
  requesterId: z.number().nullable(),
  requesterName: z.string().nullable(),
  approvedAppealCount: z.number(),
  recentApprovedAppeals: z.array(RecentApprovedAppealSchema),
});

export const TopAcceptedApproverSchema = z.object({
  approverId: z.number().nullable(),
  approverName: z.string().nullable(),
  approvedAppealCount: z.number(),
  recentAcceptedAppeals: z.array(RecentAcceptedAppealSchema),
});

export const AppealHighlightsSchema = z.object({
  topSuccessfulRequester: TopSuccessfulRequesterSchema.nullable(),
  topAcceptedApprover: TopAcceptedApproverSchema.nullable(),
});

export const MonthlyRecapResponseSchema = z.object({
  recapId: z.number(),
  familyId: z.number(),
  familyName: z.string(),
  reportMonth: z.string(),
  totalUsedBytes: z.number(),
  totalQuotaBytes: z.number(),
  usageRatePercent: z.number(),
  usageByWeekday: UsageByWeekdaySchema,
  peakUsage: PeakUsageSchema,
  missionSummary: MissionSummarySchema,
  appealSummary: AppealSummarySchema,
  appealHighlights: AppealHighlightsSchema,
  communicationScore: z.number().nullable(),
  generatedAt: z.string(),
});

export type MonthlyRecapData = z.infer<typeof MonthlyRecapResponseSchema>;
export type MonthlyRecapResponse = z.infer<typeof MonthlyRecapResponseSchema>;

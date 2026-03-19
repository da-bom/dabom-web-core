import { z } from 'zod';

export const SystemHealthSchema = z.object({
  redis: z.string(),
  kafka: z.string(),
  mysql: z.string(),
});

export const RecentBlockSchema = z.object({
  familyId: z.number(),
  customerId: z.number(),
  reason: z.string(),
  blockedAt: z.string(),
});

export const DashboardDataSchema = z.object({
  totalFamilies: z.number(),
  activeFamilies: z.number(),
  totalUsers: z.number(),
  blockedUsers: z.number(),
  todayEvents: z.number(),
  currentTps: z.number(),
  systemHealth: SystemHealthSchema,
  recentBlocks: z.array(RecentBlockSchema),
});

export type SystemHealth = z.infer<typeof SystemHealthSchema>;
export type DashboardData = z.infer<typeof DashboardDataSchema>;

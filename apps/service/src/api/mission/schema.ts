import { z } from 'zod';

export const MissionRequestSchema = z.object({
  cursor: z.string().optional().nullable(),
  size: z.number().int().default(20),
});

export type MissionRequest = z.infer<typeof MissionRequestSchema>;

export const MissionItemSchema = z.object({
  missionItemId: z.number(),
  missionText: z.string(),
  requestStatus: z.enum(['CREATED', 'REQUESTED']),
  target: z.object({
    customerId: z.number(),
    name: z.string(),
  }),
  createdBy: z.object({
    customerId: z.number(),
    name: z.string(),
  }),
  reward: z.object({
    rewardId: z.number(),
    name: z.string(),
    category: z.string(),
    value: z.number(),
    unit: z.string(),
    templateId: z.number(),
  }),
  createdAt: z.string(),
});

export const MissionResponseSchema = z.object({
  missions: z.array(MissionItemSchema),
  nextCursor: z.string().nullable(),
  hasNext: z.boolean(),
});

export type MissionItem = z.infer<typeof MissionItemSchema>;
export type MissionResponse = z.infer<typeof MissionResponseSchema>;

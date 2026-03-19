import { z } from 'zod';

export const MissionCreateSchema = z.object({
  missionText: z.string().max(20, '최대 20자까지 입력 가능합니다.'),
  targetCustomerId: z.number(),
  rewardTemplateId: z.number(),
  rewardName: z.string().optional(),
  targetName: z.string().optional(),
});

export type MissionCreate = z.infer<typeof MissionCreateSchema>;

export const MissionRequestSchema = z.object({
  cursor: z.string().optional().nullable(),
  size: z.number().int().default(20),
});

export type MissionRequest = z.infer<typeof MissionRequestSchema>;

export const MissionSchema = z.object({
  missionItemId: z.number(),
  missionText: z.string(),
  requestStatus: z.enum(['PENDING', 'REJECTED', 'APPROVED']).nullable(),
  requestId: z.number().nullable().optional(),
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
    value: z.number().optional().default(0),
    unit: z.string().optional().default(''),
    templateId: z.number(),
  }),
  createdAt: z.string(),
});

export const MissionResponseSchema = z.object({
  missions: z.array(MissionSchema),
  nextCursor: z.string().nullable(),
  hasNext: z.boolean(),
});

export type Mission = z.infer<typeof MissionSchema>;
export type MissionResponse = z.infer<typeof MissionResponseSchema>;

const RewardSchema = z.object({
  rewardId: z.number(),
  name: z.string(),
  category: z.string(),
  thumbnailUrl: z.string().nullable(),
  templateId: z.number(),
});

const MissionItemSchema = z.object({
  missionItemId: z.number(),
  missionText: z.string(),
  reward: RewardSchema,
});

export const MissionHistorySchema = z.object({
  requestId: z.number(),
  status: z.string(), // "PENDING", "APPROVED", "REJECTED" 등
  rejectReason: z.string().nullable(),
  missionItem: MissionItemSchema,
  requestedBy: z.object({
    customerId: z.number(),
    name: z.string(),
  }),
  respondedBy: z
    .object({
      customerId: z.number(),
      name: z.string(),
    })
    .nullable(),
  requestedAt: z.string(),
  respondedAt: z.string().nullable(),
});
export type MissionHistory = z.infer<typeof MissionHistorySchema>;

export const MissionHistoryDataSchema = z.object({
  requests: z.array(MissionHistorySchema),
  nextCursor: z.string().nullable(),
  hasNext: z.boolean(),
});
export type MissionHistoryData = z.infer<typeof MissionHistoryDataSchema>;

export const MissionRequestResponseSchema = z.object({
  requestId: z.number(),
  missionItem: MissionItemSchema,
  status: z.string(),
  requestedBy: z.object({
    customerId: z.number(),
    name: z.string(),
  }),
  createdAt: z.string(),
});

export type MissionRequestResponse = z.infer<typeof MissionRequestResponseSchema>;

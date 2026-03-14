import { z } from 'zod';

export const ReceivedRewardSchema = z.object({
  requestId: z.number(),
  missionItem: z.object({
    missionItemId: z.number(),
    missionText: z.string(),
    reward: z.object({
      rewardId: z.number(),
      name: z.string(),
      category: z.string(),
      thumbnailUrl: z.string(),
      templateId: z.number(),
    }),
  }),
  approvedBy: z.object({
    customerId: z.number(),
    name: z.string(),
  }),
  approvedAt: z.string(),
});

export const ReceivedRewardListSchema = z.object({
  rewards: z.array(ReceivedRewardSchema),
  nextCursor: z.string().nullable(),
  hasNext: z.boolean(),
});

export type ReceivedReward = z.infer<typeof ReceivedRewardSchema>;
export type ReceivedRewardList = z.infer<typeof ReceivedRewardListSchema>;

export const RespondRewardDataSchema = z.object({
  requestId: z.number(),
  status: z.string(),
  missionItem: z.object({
    missionItemId: z.number(),
    missionText: z.string(),
    status: z.string(),
    reward: z.object({
      rewardId: z.number(),
      name: z.string(),
      category: z.string(),
      thumbnailUrl: z.string().nullable(),
      templateId: z.number(),
    }),
  }),
  respondedBy: z.object({
    customerId: z.number(),
    name: z.string(),
  }),
  rejectReason: z.string().nullable(),
  updatedAt: z.string(),
});

export type RespondRewardData = z.infer<typeof RespondRewardDataSchema>;

export const RewardTemplateSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.enum(['DATA', 'GIFTICON']),
  thumbnailUrl: z.string().nullable(),
  price: z.number(),
});

export const RewardTemplateListSchema = z.array(RewardTemplateSchema);

export type RewardTemplate = z.infer<typeof RewardTemplateSchema>;

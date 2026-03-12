import { z } from 'zod';

export const RewardTemplateSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.enum(['DATA', 'GIFTICON']),
  thumbnailUrl: z.string().nullable(),
  price: z.number(),
  isSystem: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type RewardTemplate = z.infer<typeof RewardTemplateSchema>;

export const RewardTemplatesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(RewardTemplateSchema),
});

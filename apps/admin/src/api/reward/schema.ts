import { z } from 'zod';

export const RewardTemplateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  category: z.enum(['DATA', 'GIFTICON']),
  thumbnailUrl: z.string().nullable(),
  price: z.number().nonnegative(),
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

export const RewardCreateSchema = z.object({
  name: z.string().min(1, '보상 이름을 입력해주세요.'),
  category: z.enum(['DATA', 'GIFTICON'], {
    required_error: '카테고리를 선택해주세요.',
  }),
  thumbnailUrl: z.string().url('유효한 URL을 입력해주세요.').nullable(),
  price: z.number().min(0, '가격은 0원 이상이어야 합니다.'),
});

export type RewardCreate = z.infer<typeof RewardCreateSchema>;

export const RewardCreateResponseSchema = z.object({
  success: z.boolean(),
  data: RewardTemplateSchema,
});

export const RewardUpdateSchema = z.object({
  name: z.string().min(1, '보상 이름을 입력해주세요.'),
  thumbnailUrl: z.string().optional().nullable(),
  price: z.number().min(0),
  isActive: z.boolean().default(true),
});

export type RewardUpdate = z.infer<typeof RewardUpdateSchema>;

export const RewardGrantParamsSchema = z.object({
  page: z.preprocess((val) => Number(val ?? 0), z.number().default(0)),
  size: z.preprocess((val) => Number(val ?? 20), z.number().default(20)),
  status: z.enum(['ISSUED', 'USED', 'EXPIRED']).optional().or(z.literal('')),
  sort: z.enum(['LATEST', 'EXPIRING_SOON']).default('LATEST'),
  unusedOnly: z.boolean().optional(),
  phoneNumber: z.string().optional(),
});

export type RewardGrantParams = z.infer<typeof RewardGrantParamsSchema>;

export const RewardGrantSchema = z.object({
  grantId: z.number(),
  reward: z.object({
    rewardId: z.number(),
    name: z.string(),
    category: z.enum(['DATA', 'GIFTICON']),
    thumbnailUrl: z.string().nullable(),
  }),
  customer: z.object({
    customerId: z.number(),
    name: z.string(),
    phoneNumber: z.string(),
  }),
  mission: z.object({
    missionItemId: z.number(),
    missionText: z.string(),
  }),
  couponCode: z.string().nullable(),
  status: z.enum(['ISSUED', 'USED', 'EXPIRED']),
  createdAt: z.string(),
  expiredAt: z.string().nullable(),
});

export type RewardGrant = z.infer<typeof RewardGrantSchema>;

export const RewardGrantListResponseSchema = z.object({
  content: z.array(RewardGrantSchema),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

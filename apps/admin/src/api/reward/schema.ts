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
  // TODO: 이미지 API 연결 후 옵셔널 제거
  thumbnailUrl: z.string().optional().nullable(),
  price: z.number().min(0),
  isActive: z.boolean().default(true),
});

export type RewardUpdate = z.infer<typeof RewardUpdateSchema>;

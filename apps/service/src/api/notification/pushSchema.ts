import { z } from 'zod';

// VAPID 공개키 데이터
export const VapidKeyDataSchema = z.object({
  publicKey: z.string(),
});

// VAPID 공개키 조회 응답
export const VapidKeyResponseSchema = z.object({
  success: z.boolean(),
  data: VapidKeyDataSchema,
  timestamp: z.string(),
});

// Push 구독 등록 요청
export const PushSubscriptionRequestSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
});

// Push 수동 발송 요청
export const ManualPushRequestSchema = z.object({
  customerId: z.number(),
  title: z.string(),
  message: z.string(),
});

// 공통 응답
export const PushCommonResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().nullable(),
  timestamp: z.string(),
});

export type VapidKeyData = z.infer<typeof VapidKeyDataSchema>;
export type VapidKeyResponse = z.infer<typeof VapidKeyResponseSchema>;
export type PushSubscriptionRequest = z.infer<typeof PushSubscriptionRequestSchema>;
export type ManualPushRequest = z.infer<typeof ManualPushRequestSchema>;
export type PushCommonResponse = z.infer<typeof PushCommonResponseSchema>;

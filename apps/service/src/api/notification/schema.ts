import { z } from 'zod';

export const NotificationTypeSchema = z.enum([
  'QUOTA_UPDATED',
  'CUSTOMER_BLOCKED',
  'CUSTOMER_UNBLOCKED',
  'THRESHOLD_ALERT',
  'POLICY_CHANGED',
  'MISSION_CREATED',
  'REWARD_REQUESTED',
  'REWARD_APPROVED',
  'REWARD_REJECTED',
  'APPEAL_CREATED',
  'APPEAL_APPROVED',
  'APPEAL_REJECTED',
  'EMERGENCY_APPROVED',
  'ADMIN_PUSH',
]);

export const NotificationItemSchema = z.object({
  id: z.number(),
  type: NotificationTypeSchema,
  title: z.string(),
  message: z.string(),
  payload: z.union([z.string(), z.record(z.unknown()), z.null()]).optional(),
  isRead: z.boolean(),
  sentAt: z.string(),
});

export const NotificationListResponseSchema = z.object({
  content: z.array(NotificationItemSchema),
  nextCursor: z.string().nullable(),
  hasNext: z.boolean(),
  unreadCount: z.number(),
});

export interface NotificationFilter {
  cursor?: string;
  size?: number;
  isRead?: boolean;
  type?: string;
}

export type NotificationType = z.infer<typeof NotificationTypeSchema>;
export type NotificationItem = z.infer<typeof NotificationItemSchema>;
export type NotificationListResponse = z.infer<typeof NotificationListResponseSchema>;

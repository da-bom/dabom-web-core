import { http } from '@shared';

import {
  ManualPushRequest,
  PushCommonResponse,
  PushSubscriptionRequest,
  VapidKeyResponse,
} from './pushSchema';
import { NotificationFilter, NotificationListResponse } from './schema';

const rawBaseUrl = process.env.NEXT_PUBLIC_NOTIFICATION_API_BASE_URL;
if (!rawBaseUrl) {
  throw new Error('환경 변수 NEXT_PUBLIC_NOTIFICATION_API_BASE_URL가 설정되지 않았습니다.');
}
const BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

// 알림 목록 조회
export const getNotificationList = (
  filter: NotificationFilter = {},
): Promise<NotificationListResponse> => {
  const params = new URLSearchParams();
  if (filter.cursor) params.append('cursor', filter.cursor);
  if (filter.size) params.append('size', filter.size.toString());
  if (filter.isRead !== undefined) params.append('isRead', filter.isRead.toString());
  if (filter.type) params.append('type', filter.type);

  const queryString = params.toString();
  return http.get(`${BASE_URL}/notifications${queryString ? `?${queryString}` : ''}`);
};

// 알림 전체 읽음 처리
export const readAllNotifications = (): Promise<void> => {
  return http.patch(`${BASE_URL}/notifications/read-all`);
};

// 개별 알림 읽음 처리
export const readNotification = (notificationId: number): Promise<void> => {
  return http.patch(`${BASE_URL}/notifications/${notificationId}/read`);
};

// 알림 삭제 (소프트 삭제)
export const deleteNotification = (notificationId: number): Promise<void> => {
  return http.delete(`${BASE_URL}/notifications/${notificationId}`);
};

// 읽지 않은 알림 수 조회
export const getUnreadCount = (): Promise<{ unreadCount: number }> => {
  return http.get(`${BASE_URL}/notifications/unread-count`);
};

export const getVapidPublicKey = (): Promise<VapidKeyResponse> => {
  return http.get(`${BASE_URL}/push/vapid-public-key`);
};

export const subscribePush = (data: PushSubscriptionRequest): Promise<void> => {
  return http.post(`${BASE_URL}/push/subscribe`, data);
};

export const unsubscribePush = (): Promise<void> => {
  return http.delete(`${BASE_URL}/push/subscribe`);
};

export const sendManualPush = (data: ManualPushRequest): Promise<PushCommonResponse> => {
  return http.post(`${BASE_URL}/push/send`, data);
};

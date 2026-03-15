import { http } from '@shared';

export interface PushSubscriptionRequest {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface VapidKeyResponse {
  publicKey: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_NOTIFICATION_API_BASE_URL;

export const subscribePush = (
  data: PushSubscriptionRequest,
  customerId: string | number,
): Promise<void> => {
  return http.post(`${BASE_URL}push/subscribe?customerId=${customerId}`, data);
};

export const getVapidPublicKey = (customerId: string | number): Promise<VapidKeyResponse> => {
  return http.get(`${BASE_URL}push/vapid-public-key?customerId=${customerId}`);
};

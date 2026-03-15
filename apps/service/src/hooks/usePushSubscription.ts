import { useCallback } from 'react';

import { getVapidPublicKey, subscribePush } from '../api/notification';
import { getCurrentUserId } from '../utils/auth';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const usePushSubscription = () => {
  const subscribe = useCallback(async () => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    if (Notification.permission === 'denied') {
      console.warn('⚠️ 알림 권한이 이미 거부되었습니다. 설정에서 권한을 허용해 주세요.');
      return;
    }

    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('⚠️ 알림 권한이 거부되었습니다.');
        return;
      }
    }

    const customerId = getCurrentUserId();
    if (!customerId) {
      console.warn('⚠️ 로그인된 사용자 정보를 찾을 수 없습니다. push 구독을 건너뜁니다.');
      return;
    }

    try {
      const { publicKey } = await getVapidPublicKey(customerId);
      const applicationServerKey = urlBase64ToUint8Array(publicKey);
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      const subJson = subscription.toJSON();
      if (subJson.endpoint && subJson.keys?.p256dh && subJson.keys?.auth) {
        await subscribePush(
          {
            endpoint: subJson.endpoint,
            keys: {
              p256dh: subJson.keys.p256dh,
              auth: subJson.keys.auth,
            },
          },
          customerId,
        );
        console.log('✅ push 구독이 완료되었으며 서버와 동기화되었습니다.');
      }
    } catch (error) {
      console.error('❌ push 구독 중 오류 발생:', error);
    }
  }, []);

  return { subscribe };
};

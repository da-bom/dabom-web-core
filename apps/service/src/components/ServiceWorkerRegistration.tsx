'use client';

import { useEffect } from 'react';

import { ACCESS_TOKEN_KEY } from '@shared';

import { usePushSubscription } from '../hooks/usePushSubscription';

export default function ServiceWorkerRegistration() {
  const { subscribe } = usePushSubscription();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          const hasToken = !!localStorage.getItem(ACCESS_TOKEN_KEY);
          if (hasToken) {
            subscribe();
          }
        })
        .catch((error) => {
          console.error('서비스 워커 등록 실패: ', error);
        });
    }
  }, [subscribe]);

  return null;
}

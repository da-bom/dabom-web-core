'use client';

import { useNotificationSSE } from 'src/api/notification/useNotificationSSE';

export const SSEInit = () => {
  useNotificationSSE(true);

  return null;
};

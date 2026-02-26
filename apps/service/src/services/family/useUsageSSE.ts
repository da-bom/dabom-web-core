'use client';

import { useEffect, useState } from 'react';

import { sseClient } from '@shared';

import { UsageSSEData, UsageSSEDataSchema } from './scheme';

export const connectUsageSSE = (
  onMessage: (eventName: string, rawData: string) => void,
  signal: AbortSignal,
) => {
  const ENDPOINT = '/families/usage/sse';

  return sseClient.connect(ENDPOINT, onMessage, signal);
};

export const useSSE = (enabled: boolean) => {
  const [realtimeData, setRealtimeData] = useState<UsageSSEData | null>(null);

  useEffect(() => {
    if (!enabled || globalThis.window === undefined) return;

    const abortController = new AbortController();

    connectUsageSSE((eventName, rawData) => {
      try {
        const parsedData = JSON.parse(rawData);
        const validatedData = UsageSSEDataSchema.parse(parsedData);
        setRealtimeData(validatedData);
      } catch (error) {
        console.error('SSE 파싱 에러:', error);
      }
    }, abortController.signal).catch((error) => console.error(error));

    return () => {
      abortController.abort();
    };
  }, [enabled]);

  return realtimeData;
};

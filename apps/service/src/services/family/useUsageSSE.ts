'use client';

import { useEffect, useState } from 'react';

import { sseClient } from '@shared';

import { UsageSSEData, UsageSSEDataSchema } from './scheme';

export const connectUsageSSE = (onMessage: (data: UsageSSEData) => void, signal: AbortSignal) => {
  const ENDPOINT = '/families/usage/sse';

  return sseClient.connect<UsageSSEData>(ENDPOINT, onMessage, signal);
};

export const useSSE = (enabled: boolean) => {
  const [realtimeData, setRealtimeData] = useState<UsageSSEData | null>(null);

  useEffect(() => {
    if (!enabled || globalThis.window === undefined) return;

    const abortController = new AbortController();

    connectUsageSSE((data) => {
      try {
        const validatedData = UsageSSEDataSchema.parse(data);
        setRealtimeData(validatedData);
      } catch (error) {
        console.error(error);
      }
    }, abortController.signal).catch((error) => console.error(error));

    return () => {
      abortController.abort();
    };
  }, [enabled]);

  return realtimeData;
};

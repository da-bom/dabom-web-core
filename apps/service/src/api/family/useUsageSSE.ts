'use client';

import { useEffect, useState } from 'react';

import { sseClient } from '@shared';

import {
  UsageFamilySSEData,
  UsageFamilySSEDataSchema,
  UsageSSEData,
  UsageSSEDataSchema,
} from './schema';

export const connectUsageSSE = (
  onMessage: (eventName: string, rawData: string) => void,
  signal: AbortSignal,
) => {
  const ENDPOINT = '/families/usage/sse';
  return sseClient.connect(ENDPOINT, onMessage, signal);
};

export const useSSE = (enabled: boolean) => {
  const [totalRealtime, setTotalRealtime] = useState<UsageSSEData | null>(null);
  const [memberRealtime, setMemberRealtime] = useState<UsageFamilySSEData | null>(null);

  useEffect(() => {
    if (!enabled || globalThis.window === undefined) return;

    const abortController = new AbortController();

    connectUsageSSE((eventName, rawData) => {
      if (!rawData || !rawData.startsWith('{')) return;

      try {
        const parsedData = JSON.parse(rawData);

        if (eventName === 'usage-updated') {
          const validated = UsageSSEDataSchema.parse(parsedData);
          setTotalRealtime(validated);
        }

        if (eventName === 'usage-update-by-member') {
          const validated = UsageFamilySSEDataSchema.parse(parsedData);
          setMemberRealtime(validated);
        }
      } catch (error) {
        console.error('SSE 파싱/검증 에러:', error);
      }
    }, abortController.signal).catch((error) => console.error(error));

    return () => {
      abortController.abort();
    };
  }, [enabled]);

  return { totalRealtime, memberRealtime };
};

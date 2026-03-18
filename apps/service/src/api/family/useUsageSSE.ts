'use client';

import { useEffect, useState } from 'react';

import { sseClient } from '@shared';

import {
  UsageFamilySSEData,
  UsageFamilySSEDataSchema,
  UsageSSEData,
  UsageSSEDataSchema,
} from './schema';

export const useSSE = (enabled: boolean) => {
  const [totalRealtime, setTotalRealtime] = useState<UsageSSEData | null>(null);
  const [memberRealtime, setMemberRealtime] = useState<UsageFamilySSEData | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    return sseClient.subscribe((eventName, rawData) => {
      if (!rawData || !rawData.startsWith('{')) return;

      try {
        const parsedData = JSON.parse(rawData);

        if (eventName === 'usage-updated') {
          const validated = UsageSSEDataSchema.parse(parsedData);
          setTotalRealtime(validated);
        } else if (eventName === 'usage-update-by-member') {
          const validated = UsageFamilySSEDataSchema.parse(parsedData);
          setMemberRealtime(validated);
        }
      } catch {}
    });
  }, [enabled]);

  return { totalRealtime, memberRealtime };
};

import { z } from 'zod';

export const MyPageInfoSchema = z.object({
  name: z.string(),
  familyName: z.string(),
  isBlocked: z.boolean(),
  blockReason: z.string().nullable(),
  monthlyLimitBytes: z.number().nullable(),
  monthlyUsedBytes: z.number(),
  timeBlock: z.object({ start: z.string(), end: z.string() }).partial().nullable(),
});

export type MyPageInfo = z.infer<typeof MyPageInfoSchema>;

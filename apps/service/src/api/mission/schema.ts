import z from 'zod';

export const missionSchema = z.object({
  title: z.string().max(20, '최대 20자까지 입력 가능합니다.'),
  targetId: z.number(),
  reward: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('DATA'),
      value: z.string(),
    }),
    z.object({
      type: z.literal('GIFTICON'),
      value: z.number(),
    }),
  ]),
});

export type MissionForm = z.infer<typeof missionSchema>;

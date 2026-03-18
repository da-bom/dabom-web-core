import { z } from 'zod';

export const ServiceLoginRequestSchema = z.object({
  phoneNumber: z.string(),
  password: z.string(),
});

export const ServiceLoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type ServiceLoginRequest = z.infer<typeof ServiceLoginRequestSchema>;
export type ServiceLoginResponse = z.infer<typeof ServiceLoginResponseSchema>;

export const customerMeSchema = z.object({
  customerId: z.number(),
  name: z.string(),
  phoneNumber: z.string(),
  familyId: z.number(),
  role: z.enum(['OWNER', 'MEMBER']),
});

export type CustomerMe = z.infer<typeof customerMeSchema>;

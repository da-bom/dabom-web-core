import { z } from "zod";

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

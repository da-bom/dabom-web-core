import { z } from "zod";

export const AdminLoginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const AdminLoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AdminLoginResponse = z.infer<typeof AdminLoginResponseSchema>;
export type AdminLoginRequest = z.infer<typeof AdminLoginRequestSchema>;

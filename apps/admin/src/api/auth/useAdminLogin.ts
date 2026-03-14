import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, http } from '@shared';
import { useMutation } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/types/error';

import {
  AdminLoginRequest,
  AdminLoginResponse,
  AdminLoginResponseSchema,
} from 'src/api/auth/schema';

export const login = async (email: string, password: string): Promise<AdminLoginResponse> => {
  const response = await http.post('/admin/login', {
    email,
    password,
  });

  try {
    const parsed = AdminLoginResponseSchema.parse(response);
    return parsed;
  } catch (error) {
    console.error('❌ Zod 파싱 실패:', error);
    throw error;
  }
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: AdminLoginRequest) => login(email, password),

    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};

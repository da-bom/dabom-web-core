import { http } from '@shared';
import { useMutation } from '@tanstack/react-query';
import {
  AdminLoginRequest,
  AdminLoginResponse,
  AdminLoginResponseSchema,
} from 'src/services/auth/schema';

import { ApiErrorResponse } from '@shared/types/error';

export const login = async (email: string, password: string): Promise<AdminLoginResponse> => {
  const response = await http.post('/admin/login', {
    email,
    password,
  });

  return AdminLoginResponseSchema.parse(response);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: AdminLoginRequest) => login(email, password),

    onSuccess: (data) => {
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};

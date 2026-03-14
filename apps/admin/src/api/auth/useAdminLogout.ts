import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, http } from '@shared';
import { useMutation } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';

import { ApiErrorResponse } from '@shared/types/error';

export const logout = () => http.post('/admin/logout');

export const useAdminLogout = () => {
  return useMutation({
    mutationFn: () => logout(),

    onSuccess: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      deleteCookie(ACCESS_TOKEN_KEY, { path: '/' });
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};

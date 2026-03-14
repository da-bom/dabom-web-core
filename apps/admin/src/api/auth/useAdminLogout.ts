import { ACCESS_TOKEN_KEY, http } from '@shared';
import { useMutation } from '@tanstack/react-query';

import { ApiErrorResponse } from '@shared/types/error';

export const logout = () => http.post('/admin/logout');

export const useAdminLogout = () => {
  return useMutation({
    mutationFn: () => logout(),

    onSuccess: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem('refresh_token');
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};

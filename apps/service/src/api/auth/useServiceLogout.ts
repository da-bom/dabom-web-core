import { useRouter } from 'next/navigation';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, http } from '@shared';
import { useMutation } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';

export const logout = () => http.post('/customers/logout');

export const useServiceLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => logout(),

    onSuccess: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      deleteCookie(ACCESS_TOKEN_KEY, { path: '/' });
      router.push('/login');
    },
  });
};

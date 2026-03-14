import { ACCESS_TOKEN_KEY } from '@shared';

export type UserRole = 'OWNER' | 'MEMBER';

export const getCurrentUserRole = (): UserRole => {
  if (typeof window === 'undefined') return 'MEMBER';

  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return 'MEMBER';

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const tokenRole = payload.role;

    if (tokenRole === 'OWNER' || tokenRole === 'MEMBER') {
      return tokenRole;
    }
  } catch (error) {
    console.error('토큰 해독 실패:', error);
  }

  return 'MEMBER';
};

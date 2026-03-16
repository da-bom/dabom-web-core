import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  role: string | null;
  setRole: (role: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),
      clearAuth: () => {
        set({ role: null });
        // 로그아웃 시 토큰도 함께 정리 로직 추가 가능
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

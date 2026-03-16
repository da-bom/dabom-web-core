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
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

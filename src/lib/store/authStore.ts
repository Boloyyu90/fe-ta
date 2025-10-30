/**
 * ============================================================================
 * 🔐 AUTH STORE (ZUSTAND)
 * ============================================================================
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import type { User, Tokens } from '@/types/api.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setAuth: (user: User, tokens: Tokens) => void;
  clearAuth: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: true,

      // Actions
      setAuth: (user, tokens) => {
        // Save tokens to cookies
        Cookies.set('accessToken', tokens.accessToken, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          expires: 30 / (24 * 60), // 30 minutes
        });

        Cookies.set('refreshToken', tokens.refreshToken, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          expires: 30, // 30 days
        });

        set({ user, isAuthenticated: true, isLoading: false });
      },

      clearAuth: () => {
        // Remove tokens from cookies
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      setUser: (user) => {
        set({ user });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

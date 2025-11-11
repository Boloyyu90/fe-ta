import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserPublicData } from '@/features/auth/types/auth.types';

interface AuthState {
    user: UserPublicData | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

interface AuthActions {
    setAuth: (user: UserPublicData, accessToken: string, refreshToken: string) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    setUser: (user: UserPublicData) => void;
    clearAuth: () => void;
    isAdmin: () => boolean;
    isParticipant: () => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // State
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            // Actions
            setAuth: (user, accessToken, refreshToken) =>
                set({
                    user,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                }),

            setTokens: (accessToken, refreshToken) =>
                set({
                    accessToken,
                    refreshToken,
                }),

            setUser: (user) =>
                set({
                    user,
                }),

            clearAuth: () =>
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                }),

            isAdmin: () => {
                const state = get();
                return state.user?.role === 'ADMIN';
            },

            isParticipant: () => {
                const state = get();
                return state.user?.role === 'PARTICIPANT';
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
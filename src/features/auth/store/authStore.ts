import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '@/shared/types/common.types';

interface User {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    isEmailVerified: boolean;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

interface AuthActions {
    setAuth: (user: User, accessToken: string, refreshToken: string) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    setUser: (user: User) => void;
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
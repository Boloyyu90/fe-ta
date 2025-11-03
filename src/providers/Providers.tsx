'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/shared/lib/queryClient';
import { useEffect } from 'react';
import { setupInterceptors } from '@/shared/lib/api/interceptors';
import { useAuthStore } from '@/features/auth/store/authStore';

export function Providers({ children }: { children: React.ReactNode }) {
    const { accessToken, refreshToken, setTokens, clearAuth } = useAuthStore();

    useEffect(() => {
        setupInterceptors(
            () => accessToken,
            () => refreshToken,
            setTokens,
            clearAuth
        );
    }, [accessToken, refreshToken, setTokens, clearAuth]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
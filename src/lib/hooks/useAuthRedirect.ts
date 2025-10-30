'use client';

/**
 * ============================================================================
 * 🔄 AUTH REDIRECT HOOK
 * ============================================================================
 * Automatically redirect logged-in users away from auth pages
 * ============================================================================
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export function useAuthRedirect() {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);
}
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '@/shared/constants/routes.constants';
import { queryClient } from '@/shared/lib/queryClient';

export function useLogout() {
    const router = useRouter();
    const { refreshToken, clearAuth } = useAuthStore();

    return useMutation({
        mutationFn: () => {
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }
            return authApi.logout({ refreshToken });
        },
        onSuccess: () => {
            clearAuth();
            queryClient.clear(); // Clear all cached queries
            router.push(ROUTES.LOGIN);
        },
        onError: () => {
            // Even if logout fails, clear local auth
            clearAuth();
            queryClient.clear();
            router.push(ROUTES.LOGIN);
        },
    });
}
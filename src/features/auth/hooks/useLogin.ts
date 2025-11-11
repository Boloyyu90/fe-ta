import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { LoginRequest } from '../types/auth.types';

export function useLogin() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: (data: LoginRequest) => authApi.login(data),
        onSuccess: (response) => {
            const { user, tokens } = response;
            setAuth(user, tokens.accessToken, tokens.refreshToken);

            if (user.role === 'ADMIN') {
                router.push(ROUTES.ADMIN_DASHBOARD);
            } else {
                router.push(ROUTES.DASHBOARD);
            }
        },
    });
}
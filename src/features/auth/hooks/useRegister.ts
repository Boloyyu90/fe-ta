import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { RegisterRequest } from '../types/auth.types';

export function useRegister() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: (data: RegisterRequest) => authApi.register(data),
        onSuccess: (response) => {
            const { user, tokens } = response;
            setAuth(user, tokens.accessToken, tokens.refreshToken);

            router.push(ROUTES.DASHBOARD);
        },
    });
}
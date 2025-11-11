import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { RegisterRequest } from '../types/auth.types';

export function useRegister() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: (data: RegisterRequest) => authApi.register(data),
        onSuccess: (response) => {
            const { user, tokens } = response;
            setAuth(user, tokens.accessToken, tokens.refreshToken);

            const redirectTo = searchParams.get('redirect');

            if (redirectTo && redirectTo.startsWith('/')) {
                router.push(redirectTo);
                return;
            }

            router.push(ROUTES.DASHBOARD);
        },
    });
}
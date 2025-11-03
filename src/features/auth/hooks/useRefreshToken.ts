import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';

export function useRefreshToken() {
    const { refreshToken, setTokens } = useAuthStore();

    return useMutation({
        mutationFn: () => {
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }
            return authApi.refresh({ refreshToken });
        },
        onSuccess: (tokens) => {
            setTokens(tokens.accessToken, tokens.refreshToken);
        },
    });
}
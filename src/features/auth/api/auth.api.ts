import { api } from '@/shared/lib/api/axios';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';
import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    RefreshTokenRequest,
    LogoutRequest,
    TokensData,
} from '../types/auth.types';
import type { ApiResponse } from '@/shared/types/api.types';
import { handleApiError } from '@/shared/lib/api/error-handler';

export const authApi = {
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await api.post<ApiResponse<AuthResponse>>(
            API_ENDPOINTS.AUTH.REGISTER,
            data
        );

        // ✅ Proper null checking
        if (!response.data.data) {
            throw new Error('Invalid response format from server');
        }

        return response.data.data;
    },

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<ApiResponse<AuthResponse>>(
            API_ENDPOINTS.AUTH.LOGIN,
            data
        );

        if (!response.data.data) {
            throw new Error('Invalid response format from server');
        }

        return response.data.data;
    },

    refresh: async (data: RefreshTokenRequest): Promise<TokensData> => {
        const response = await api.post<ApiResponse<{ tokens: TokensData }>>(
            API_ENDPOINTS.AUTH.REFRESH,
            data
        );

        if (!response.data.data?.tokens) {
            throw new Error('Invalid response format from server');
        }

        return response.data.data.tokens;
    },

    logout: async (data: LogoutRequest): Promise<void> => {
        await api.post<ApiResponse<{ success: boolean }>>(
            API_ENDPOINTS.AUTH.LOGOUT,
            data
        );
        // ✅ Logout tidak perlu return data
    },
};
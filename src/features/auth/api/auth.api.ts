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

export const authApi = {
    register: async (data: RegisterRequest) => {
        const response = await api.post<ApiResponse<AuthResponse>>(
            API_ENDPOINTS.AUTH.REGISTER,
            data
        );
        return response.data.data!;
    },

    login: async (data: LoginRequest) => {
        const response = await api.post<ApiResponse<AuthResponse>>(
            API_ENDPOINTS.AUTH.LOGIN,
            data
        );
        return response.data.data!;
    },

    refresh: async (data: RefreshTokenRequest) => {
        const response = await api.post<ApiResponse<{ tokens: TokensData }>>(
            API_ENDPOINTS.AUTH.REFRESH,
            data
        );
        return response.data.data!.tokens;
    },

    logout: async (data: LogoutRequest) => {
        const response = await api.post<ApiResponse<{ message: string }>>(
            API_ENDPOINTS.AUTH.LOGOUT,
            data
        );
        return response.data.data!;
    },
};
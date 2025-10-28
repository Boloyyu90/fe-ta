import { apiClient } from './client';
import type { LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '../types/api';

export const authApi = {
  async login(credentials: LoginRequest) {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return data.data!;
  },

  async register(userData: RegisterRequest) {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      userData
    );
    return data.data!;
  },

  async logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    await apiClient.post('/auth/logout', { refreshToken });
  },
};

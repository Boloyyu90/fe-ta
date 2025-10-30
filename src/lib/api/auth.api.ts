/**
 * ============================================================================
 * 🔐 AUTH API CLIENT
 * ============================================================================
 */

import { api } from './axios';
import type {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  Tokens,
} from '@/types/api.types';

export const authApi = {
  /**
   * Register new user
   */
  register: async (credentials: RegisterCredentials) => {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/register', credentials);
    return data.data!;
  },

  /**
   * Login user
   */
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return data.data!;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string) => {
    const { data } = await api.post<ApiResponse<{ tokens: Tokens }>>('/auth/refresh', {
      refreshToken,
    });
    return data.data!.tokens;
  },

  /**
   * Logout user
   */
  logout: async (refreshToken: string) => {
    const { data } = await api.post<ApiResponse<{ message: string }>>('/auth/logout', {
      refreshToken,
    });
    return data.data!;
  },
};

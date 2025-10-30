/**
 * ============================================================================
 * 🌐 AXIOS INSTANCE WITH INTERCEPTORS
 * ============================================================================
 * Features:
 * - Automatic token attachment
 * - Automatic token refresh on 401
 * - Request/response logging (dev only)
 * - Error handling
 * ============================================================================
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { env } from '@/env';

// ============================================================================
// AXIOS INSTANCE
// ============================================================================

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true if backend uses HttpOnly cookies
});

// ============================================================================
// REQUEST INTERCEPTOR
// ============================================================================

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attach access token to every request
    const accessToken = Cookies.get('accessToken');

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Log request in development
    if (env.NEXT_PUBLIC_ENABLE_DEVTOOLS) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// ============================================================================
// RESPONSE INTERCEPTOR
// ============================================================================

api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (env.NEXT_PUBLIC_ENABLE_DEVTOOLS) {
      console.log('✅ API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Log error in development
    if (env.NEXT_PUBLIC_ENABLE_DEVTOOLS) {
      console.error('❌ API Error:', {
        url: originalRequest?.url,
        status: error.response?.status,
        message: error.message,
      });
    }

    // Handle 401 Unauthorized - Token Refresh Flow
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh token endpoint
        const { data } = await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          refreshToken,
        });

        // Save new tokens
        Cookies.set('accessToken', data.data.tokens.accessToken, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          expires: 30 / (24 * 60), // 30 minutes
        });

        Cookies.set('refreshToken', data.data.tokens.refreshToken, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          expires: 30, // 30 days
        });

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.data.tokens.accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        // Redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Extract error message from axios error
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

/**
 * Check if error is axios error
 */
export const isAxiosError = axios.isAxiosError;

import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { api } from './axios';

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

export const setupInterceptors = (
    getAccessToken: () => string | null,
    getRefreshToken: () => string | null,
    setTokens: (accessToken: string, refreshToken: string) => void,
    clearAuth: () => void
) => {
    // Request interceptor
    api.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = getAccessToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor
    api.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & {
                _retry?: boolean;
            };

            // ✅ Better error handling
            if (!originalRequest) {
                return Promise.reject(error);
            }

            // If error is not 401 or request already retried, reject
            if (error.response?.status !== 401 || originalRequest._retry) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Queue requests while refreshing
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                clearAuth();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const response = await api.post('/auth/refresh', { refreshToken });
                const { accessToken, refreshToken: newRefreshToken } =
                    response.data.data.tokens;

                setTokens(accessToken, newRefreshToken);
                processQueue(null, accessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                clearAuth();

                // ✅ Only redirect if not already on login page
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
    );
};
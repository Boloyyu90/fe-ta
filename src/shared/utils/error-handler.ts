import { AxiosError } from 'axios';
import type { ApiResponse } from '@/shared/types/api.types';

/**
 * Extract user-friendly error message from API error
 * Handles various error formats from backend
 */
export function getErrorMessage(error: unknown): string {
    // Handle AxiosError
    if (error instanceof AxiosError) {
        const response = error.response?.data as ApiResponse | undefined;

        // Priority 1: Validation errors (show first field error)
        if (response?.errors && response.errors.length > 0) {
            return response.errors[0].message;
        }

        // Priority 2: Message from response
        if (response?.message) {
            return response.message;
        }

        // Priority 3: Generic error based on status code
        const status = error.response?.status;
        if (status === 401) {
            return 'Email atau password salah';
        }
        if (status === 409) {
            return 'Email sudah terdaftar';
        }
        if (status === 422) {
            return 'Data yang dikirim tidak valid';
        }
        if (status === 429) {
            return 'Terlalu banyak percobaan. Silakan coba lagi nanti';
        }
        if (status && status >= 500) {
            return 'Terjadi kesalahan server. Silakan coba lagi';
        }

        // Priority 4: Network error
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            return 'Koneksi timeout. Periksa koneksi internet Anda';
        }
        if (error.code === 'ERR_NETWORK') {
            return 'Tidak dapat terhubung ke server';
        }
    }

    // Handle Error object
    if (error instanceof Error) {
        return error.message;
    }

    // Fallback
    return 'Terjadi kesalahan yang tidak terduga';
}

/**
 * Extract validation errors as field-specific errors
 * Useful for form libraries like react-hook-form
 */
export function getValidationErrors(error: unknown): Record<string, string> {
    if (error instanceof AxiosError) {
        const response = error.response?.data as ApiResponse | undefined;

        if (response?.errors && response.errors.length > 0) {
            return response.errors.reduce((acc, err) => {
                acc[err.field] = err.message;
                return acc;
            }, {} as Record<string, string>);
        }
    }

    return {};
}

/**
 * Get error code from API error
 * Useful for programmatic error handling
 */
export function getErrorCode(error: unknown): string | undefined {
    if (error instanceof AxiosError) {
        const response = error.response?.data as ApiResponse | undefined;
        return response?.errorCode;
    }
    return undefined;
}

/**
 * Check if error is a specific type
 */
export function isAuthError(error: unknown): boolean {
    const code = getErrorCode(error);
    return code?.startsWith('AUTH_') === true;
}

export function isValidationError(error: unknown): boolean {
    const code = getErrorCode(error);
    return code === 'VALIDATION_ERROR';
}

export function isNetworkError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED';
    }
    return false;
}
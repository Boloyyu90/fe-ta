import { AxiosError } from 'axios';
import type { ApiResponse } from '@/shared/types/api.types';

export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public errorCode?: string,
        public errors?: Array<{ field: string; message: string }>
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export function handleApiError(error: unknown): never {
    if (error instanceof AxiosError) {
        const response = error.response?.data as ApiResponse | undefined;

        throw new ApiError(
            response?.message || error.message || 'An error occurred',
            error.response?.status,
            response?.errorCode,
            response?.errors
        );
    }

    if (error instanceof Error) {
        throw new ApiError(error.message);
    }

    throw new ApiError('An unknown error occurred');
}
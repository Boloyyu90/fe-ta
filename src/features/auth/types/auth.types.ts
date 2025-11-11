import { UserRole } from '@/shared/types/common.types';

// ✅ Exact match dengan backend
export interface UserPublicData {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    isEmailVerified: boolean; // ✅ Sudah benar
    createdAt: string; // ⚠️ Gunakan string untuk date dari API
    updatedAt: string; // ⚠️ Gunakan string untuk date dari API
}

export interface TokensData {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse {
    user: UserPublicData;
    tokens: TokensData;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface LogoutRequest {
    refreshToken: string;
}
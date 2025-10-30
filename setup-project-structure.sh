#!/bin/bash

# ============================================================================
# 🚀 Frontend Project Structure Setup Script
# ============================================================================
# Purpose: Setup Next.js frontend structure aligned with Express.js backend
# Author: Senior Developer Assistant
# Date: 2025
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

print_header() {
    echo -e "\n${BLUE}════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# ============================================================================
# MAIN SCRIPT
# ============================================================================

print_header "FRONTEND PROJECT STRUCTURE SETUP"

# Check if running in project root
if [ ! -f "package.json" ]; then
    print_error "package.json not found! Please run this script from project root."
    exit 1
fi

print_success "Found package.json"

# ============================================================================
# STEP 1: CREATE DIRECTORY STRUCTURE
# ============================================================================

print_header "STEP 1: Creating Directory Structure"

directories=(
    "src/lib/api"
    "src/lib/hooks"
    "src/lib/store"
    "src/lib/utils"
    "src/schemas"
    "src/types"
    "src/components/ui"
    "src/components/layouts"
    "src/components/features/auth"
    "src/components/features/exam"
    "src/components/features/proctoring"
    "src/app/(auth)/login"
    "src/app/(auth)/register"
    "src/app/(dashboard)"
    "src/app/(exam)"
    "src/app/api"
    "src/mocks"
    "public/mockServiceWorker.js"
)

for dir in "${directories[@]}"; do
    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        print_success "Created: $dir"
    else
        print_warning "Already exists: $dir"
    fi
done

# ============================================================================
# STEP 2: CREATE ENVIRONMENT FILES
# ============================================================================

print_header "STEP 2: Creating Environment Files"

# .env.local
cat > .env.local << 'EOF'
# ============================================================================
# 🔐 ENVIRONMENT VARIABLES (LOCAL DEVELOPMENT)
# ============================================================================
# IMPORTANT: Do NOT commit this file to git!
# ============================================================================

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_WS_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_DEVTOOLS=true
NEXT_PUBLIC_ENABLE_MSW=false

# App Configuration
NEXT_PUBLIC_APP_NAME=Tryout System
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp

# Session Configuration
NEXT_PUBLIC_SESSION_TIMEOUT=1800000
NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL=300000
EOF

print_success "Created: .env.local"

# .env.example
cat > .env.example << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_WS_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_DEVTOOLS=true
NEXT_PUBLIC_ENABLE_MSW=false

# App Configuration
NEXT_PUBLIC_APP_NAME=Tryout System
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp

# Session Configuration
NEXT_PUBLIC_SESSION_TIMEOUT=1800000
NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL=300000
EOF

print_success "Created: .env.example"

# ============================================================================
# STEP 3: CREATE TYPE-SAFE ENVIRONMENT CONFIG
# ============================================================================

print_header "STEP 3: Creating Type-Safe Environment Config"

cat > src/env.ts << 'EOF'
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your client-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_WS_URL: z.string().url(),
    NEXT_PUBLIC_ENABLE_DEVTOOLS: z
      .string()
      .transform((val) => val === 'true')
      .default('false'),
    NEXT_PUBLIC_ENABLE_MSW: z
      .string()
      .transform((val) => val === 'true')
      .default('false'),
    NEXT_PUBLIC_APP_NAME: z.string().default('Tryout System'),
    NEXT_PUBLIC_MAX_FILE_SIZE: z
      .string()
      .transform(Number)
      .default('5242880'),
    NEXT_PUBLIC_ALLOWED_IMAGE_TYPES: z.string().default('image/jpeg,image/png,image/webp'),
    NEXT_PUBLIC_SESSION_TIMEOUT: z
      .string()
      .transform(Number)
      .default('1800000'),
    NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL: z
      .string()
      .transform(Number)
      .default('300000'),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtime.
   * This is because it's only available in the Node.js runtime.
   * For this reason, we need to manually specify the runtime environment variables.
   */
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_ENABLE_DEVTOOLS: process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS,
    NEXT_PUBLIC_ENABLE_MSW: process.env.NEXT_PUBLIC_ENABLE_MSW,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_MAX_FILE_SIZE: process.env.NEXT_PUBLIC_MAX_FILE_SIZE,
    NEXT_PUBLIC_ALLOWED_IMAGE_TYPES: process.env.NEXT_PUBLIC_ALLOWED_IMAGE_TYPES,
    NEXT_PUBLIC_SESSION_TIMEOUT: process.env.NEXT_PUBLIC_SESSION_TIMEOUT,
    NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL: process.env.NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
EOF

print_success "Created: src/env.ts"

# ============================================================================
# STEP 4: CREATE TYPE DEFINITIONS
# ============================================================================

print_header "STEP 4: Creating Type Definitions"

cat > src/types/api.types.ts << 'EOF'
/**
 * ============================================================================
 * 🔷 API TYPE DEFINITIONS
 * ============================================================================
 * Aligned with backend Express.js types
 * ============================================================================
 */

// ============================================================================
// COMMON TYPES
// ============================================================================

export enum UserRole {
  ADMIN = 'ADMIN',
  PARTICIPANT = 'PARTICIPANT',
}

export enum ExamStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
  TIMEOUT = 'TIMEOUT',
}

export enum QuestionType {
  TIU = 'TIU',
  TKP = 'TKP',
  TWK = 'TWK',
}

export enum ProctoringEventType {
  FACE_DETECTED = 'FACE_DETECTED',
  NO_FACE_DETECTED = 'NO_FACE_DETECTED',
  MULTIPLE_FACES = 'MULTIPLE_FACES',
  LOOKING_AWAY = 'LOOKING_AWAY',
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  errorCode?: string;
  timestamp?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// ============================================================================
// AUTH TYPES
// ============================================================================

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: Tokens;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

// ============================================================================
// EXAM TYPES
// ============================================================================

export interface Exam {
  id: number;
  title: string;
  description: string | null;
  startTime: string | null;
  endTime: string | null;
  durationMinutes: number;
  createdBy: number;
  createdAt: string;
}

export interface ExamDetail extends Exam {
  creator: {
    id: number;
    name: string;
    email: string;
  };
  _count: {
    examQuestions: number;
    userExams: number;
  };
}

export interface QuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
}

export interface Question {
  id: number;
  content: string;
  options: QuestionOptions;
  correctAnswer: string;
  defaultScore: number;
  questionType: QuestionType;
  createdAt: string;
}

export interface ParticipantQuestion {
  id: number;
  examQuestionId: number;
  content: string;
  options: QuestionOptions;
  questionType: QuestionType;
  orderNumber: number;
}

// ============================================================================
// USER EXAM (SESSION) TYPES
// ============================================================================

export interface UserExamSession {
  id: number;
  examId: number;
  examTitle: string;
  durationMinutes: number;
  startedAt: string;
  submittedAt: string | null;
  status: ExamStatus;
  remainingTimeMs: number | null;
  totalQuestions: number;
  answeredQuestions: number;
}

export interface ParticipantAnswer {
  examQuestionId: number;
  selectedOption: string | null;
  answeredAt: string | null;
}

export interface StartExamResponse {
  userExam: UserExamSession;
  questions: ParticipantQuestion[];
  answers: ParticipantAnswer[];
}

export interface SubmitAnswerRequest {
  examQuestionId: number;
  selectedOption: string | null;
}

export interface ExamResult {
  id: number;
  exam: {
    id: number;
    title: string;
    description: string | null;
  };
  user: {
    id: number;
    name: string;
    email: string;
  };
  startedAt: string;
  submittedAt: string | null;
  totalScore: number | null;
  status: ExamStatus;
  duration: number | null;
  answeredQuestions: number;
  totalQuestions: number;
  scoresByType: Array<{
    type: QuestionType;
    score: number;
    maxScore: number;
    correctAnswers: number;
    totalQuestions: number;
  }>;
}

// ============================================================================
// PROCTORING TYPES
// ============================================================================

export interface ProctoringEvent {
  id: number;
  userExamId: number;
  eventType: ProctoringEventType;
  timestamp: string;
  metadata: Record<string, unknown> | null;
  severity: string;
}

export interface DetectFaceRequest {
  userExamId: number;
  imageBase64: string;
  timestamp?: string;
}

export interface FaceDetectionResult {
  detected: boolean;
  faceCount: number;
  confidence: number;
  headPose?: {
    yaw: number;
    pitch: number;
    roll: number;
  };
  boundingBoxes: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
  }>;
  warnings: string[];
  eventLogged: boolean;
  event?: ProctoringEvent;
}
EOF

print_success "Created: src/types/api.types.ts"

# ============================================================================
# STEP 5: CREATE AXIOS INSTANCE WITH INTERCEPTORS
# ============================================================================

print_header "STEP 5: Creating Axios Instance"

cat > src/lib/api/axios.ts << 'EOF'
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
        const { data } = await axios.post(
          `${env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );

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
EOF

print_success "Created: src/lib/api/axios.ts"

# ============================================================================
# STEP 6: CREATE API CLIENT FUNCTIONS
# ============================================================================

print_header "STEP 6: Creating API Client Functions"

# Auth API
cat > src/lib/api/auth.api.ts << 'EOF'
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
EOF

print_success "Created: src/lib/api/auth.api.ts"

# Exam API
cat > src/lib/api/exam.api.ts << 'EOF'
/**
 * ============================================================================
 * 📝 EXAM API CLIENT
 * ============================================================================
 */

import { api } from './axios';
import type {
  ApiResponse,
  Exam,
  ExamDetail,
  PaginatedResponse,
  StartExamResponse,
  SubmitAnswerRequest,
  ParticipantQuestion,
  ExamResult,
} from '@/types/api.types';

export const examApi = {
  /**
   * Get available exams (participant view)
   */
  getExams: async (params?: { page?: number; limit?: number; search?: string }) => {
    const { data } = await api.get<ApiResponse<PaginatedResponse<Exam>>>('/exams', { params });
    return data.data!;
  },

  /**
   * Get exam details
   */
  getExamById: async (id: number) => {
    const { data } = await api.get<ApiResponse<{ exam: ExamDetail }>>(`/exams/${id}`);
    return data.data!.exam;
  },

  /**
   * Start exam session
   */
  startExam: async (examId: number) => {
    const { data } = await api.post<ApiResponse<StartExamResponse>>(`/exams/${examId}/start`);
    return data.data!;
  },

  /**
   * Get exam questions for active session
   */
  getExamQuestions: async (userExamId: number, type?: string) => {
    const { data } = await api.get<ApiResponse<{ questions: ParticipantQuestion[]; total: number }>>(
      `/user-exams/${userExamId}/questions`,
      { params: { type } }
    );
    return data.data!;
  },

  /**
   * Submit answer (autosave)
   */
  submitAnswer: async (userExamId: number, answerData: SubmitAnswerRequest) => {
    const { data } = await api.post<ApiResponse<unknown>>(
      `/user-exams/${userExamId}/answers`,
      answerData
    );
    return data.data!;
  },

  /**
   * Submit exam (finish)
   */
  submitExam: async (userExamId: number) => {
    const { data } = await api.post<ApiResponse<{ result: ExamResult }>>(
      `/user-exams/${userExamId}/submit`
    );
    return data.data!;
  },

  /**
   * Get my results
   */
  getMyResults: async (params?: { page?: number; limit?: number; status?: string }) => {
    const { data } = await api.get<ApiResponse<PaginatedResponse<ExamResult>>>('/results/me', {
      params,
    });
    return data.data!;
  },

  /**
   * Get exam answers for review (after submit)
   */
  getExamAnswers: async (userExamId: number) => {
    const { data } = await api.get<ApiResponse<{ answers: unknown[]; total: number }>>(
      `/user-exams/${userExamId}/answers`
    );
    return data.data!;
  },
};
EOF

print_success "Created: src/lib/api/exam.api.ts"

# Proctoring API
cat > src/lib/api/proctoring.api.ts << 'EOF'
/**
 * ============================================================================
 * 📹 PROCTORING API CLIENT
 * ============================================================================
 */

import { api } from './axios';
import type {
  ApiResponse,
  ProctoringEvent,
  DetectFaceRequest,
  FaceDetectionResult,
  PaginatedResponse,
} from '@/types/api.types';

export const proctoringApi = {
  /**
   * Log single proctoring event
   */
  logEvent: async (eventData: {
    userExamId: number;
    eventType: string;
    metadata?: Record<string, unknown>;
    severity?: string;
  }) => {
    const { data } = await api.post<ApiResponse<{ event: ProctoringEvent }>>(
      '/proctoring/events',
      eventData
    );
    return data.data!;
  },

  /**
   * Detect face from image (ML integration)
   */
  detectFace: async (detectData: DetectFaceRequest) => {
    const { data } = await api.post<ApiResponse<FaceDetectionResult>>(
      '/proctoring/detect-face',
      detectData
    );
    return data.data!;
  },

  /**
   * Get proctoring events for user exam
   */
  getEvents: async (
    userExamId: number,
    params?: { page?: number; limit?: number; eventType?: string; severity?: string }
  ) => {
    const { data } = await api.get<ApiResponse<PaginatedResponse<ProctoringEvent>>>(
      `/proctoring/user-exams/${userExamId}/events`,
      { params }
    );
    return data.data!;
  },

  /**
   * Get proctoring statistics
   */
  getStats: async (userExamId: number) => {
    const { data } = await api.get<ApiResponse<unknown>>(
      `/proctoring/user-exams/${userExamId}/stats`
    );
    return data.data!;
  },
};
EOF

print_success "Created: src/lib/api/proctoring.api.ts"

# ============================================================================
# STEP 7: CREATE ZOD VALIDATION SCHEMAS
# ============================================================================

print_header "STEP 7: Creating Validation Schemas"

cat > src/schemas/auth.schema.ts << 'EOF'
/**
 * ============================================================================
 * 🔐 AUTH VALIDATION SCHEMAS
 * ============================================================================
 * Aligned with backend validation
 * ============================================================================
 */

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters')
      .trim(),
    email: z.string().email('Invalid email format').toLowerCase().trim(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
EOF

print_success "Created: src/schemas/auth.schema.ts"

# Continue in next part...
print_info "Script part 1 completed. Creating part 2..."

# ============================================================================
# STEP 8: CREATE ZUSTAND STORES
# ============================================================================

print_header "STEP 8: Creating Zustand Stores"

cat > src/lib/store/authStore.ts << 'EOF'
/**
 * ============================================================================
 * 🔐 AUTH STORE (ZUSTAND)
 * ============================================================================
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import type { User, Tokens } from '@/types/api.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setAuth: (user: User, tokens: Tokens) => void;
  clearAuth: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: true,

      // Actions
      setAuth: (user, tokens) => {
        // Save tokens to cookies
        Cookies.set('accessToken', tokens.accessToken, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          expires: 30 / (24 * 60), // 30 minutes
        });

        Cookies.set('refreshToken', tokens.refreshToken, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          expires: 30, // 30 days
        });

        set({ user, isAuthenticated: true, isLoading: false });
      },

      clearAuth: () => {
        // Remove tokens from cookies
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      setUser: (user) => {
        set({ user });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
EOF

print_success "Created: src/lib/store/authStore.ts"

cat > src/lib/store/examStore.ts << 'EOF'
/**
 * ============================================================================
 * 📝 EXAM STORE (ZUSTAND)
 * ============================================================================
 */

import { create } from 'zustand';
import type { UserExamSession, ParticipantAnswer } from '@/types/api.types';

interface ExamState {
  currentSession: UserExamSession | null;
  answers: Record<number, ParticipantAnswer>; // examQuestionId -> answer
  timeRemaining: number | null; // milliseconds
}

interface ExamActions {
  setSession: (session: UserExamSession) => void;
  updateAnswer: (examQuestionId: number, answer: ParticipantAnswer) => void;
  setTimeRemaining: (time: number) => void;
  clearSession: () => void;
}

type ExamStore = ExamState & ExamActions;

export const useExamStore = create<ExamStore>((set) => ({
  // State
  currentSession: null,
  answers: {},
  timeRemaining: null,

  // Actions
  setSession: (session) => {
    set({ currentSession: session, timeRemaining: session.remainingTimeMs });
  },

  updateAnswer: (examQuestionId, answer) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [examQuestionId]: answer,
      },
    }));
  },

  setTimeRemaining: (time) => {
    set({ timeRemaining: time });
  },

  clearSession: () => {
    set({ currentSession: null, answers: {}, timeRemaining: null });
  },
}));
EOF

print_success "Created: src/lib/store/examStore.ts"

# ============================================================================
# STEP 9: CREATE REACT QUERY HOOKS
# ============================================================================

print_header "STEP 9: Creating React Query Hooks"

cat > src/lib/hooks/useAuth.ts << 'EOF'
/**
 * ============================================================================
 * 🔐 AUTH HOOKS (REACT QUERY)
 * ============================================================================
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import type { LoginCredentials, RegisterCredentials } from '@/types/api.types';
import { toast } from 'sonner';

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Login successful!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authApi.register(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Registration successful!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshToken: string) => authApi.logout(refreshToken),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.success('Logged out successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Logout failed');
    },
  });
}
EOF

print_success "Created: src/lib/hooks/useAuth.ts"

cat > src/lib/hooks/useExam.ts << 'EOF'
/**
 * ============================================================================
 * 📝 EXAM HOOKS (REACT QUERY)
 * ============================================================================
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { examApi } from '@/lib/api/exam.api';
import { useExamStore } from '@/lib/store/examStore';
import { toast } from 'sonner';

export function useExams(params?: { page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: ['exams', params],
    queryFn: () => examApi.getExams(params),
  });
}

export function useExamDetail(id: number) {
  return useQuery({
    queryKey: ['exam', id],
    queryFn: () => examApi.getExamById(id),
    enabled: !!id,
  });
}

export function useStartExam() {
  const setSession = useExamStore((state) => state.setSession);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (examId: number) => examApi.startExam(examId),
    onSuccess: (data) => {
      setSession(data.userExam);
      toast.success('Exam started successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to start exam');
    },
  });
}

export function useSubmitAnswer() {
  const updateAnswer = useExamStore((state) => state.updateAnswer);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userExamId, answerData }: { userExamId: number; answerData: any }) =>
      examApi.submitAnswer(userExamId, answerData),
    onSuccess: (data, variables) => {
      updateAnswer(variables.answerData.examQuestionId, {
        examQuestionId: variables.answerData.examQuestionId,
        selectedOption: variables.answerData.selectedOption,
        answeredAt: new Date().toISOString(),
      });
      // Don't show toast for each answer (too noisy)
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save answer');
    },
  });
}

export function useSubmitExam() {
  const clearSession = useExamStore((state) => state.clearSession);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userExamId: number) => examApi.submitExam(userExamId),
    onSuccess: () => {
      clearSession();
      queryClient.invalidateQueries({ queryKey: ['results'] });
      toast.success('Exam submitted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit exam');
    },
  });
}

export function useMyResults(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: ['results', 'me', params],
    queryFn: () => examApi.getMyResults(params),
  });
}
EOF

print_success "Created: src/lib/hooks/useExam.ts"

# ============================================================================
# STEP 10: CREATE UTILITY FUNCTIONS
# ============================================================================

print_header "STEP 10: Creating Utility Functions"

cat > src/lib/utils/cn.ts << 'EOF'
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

print_success "Created: src/lib/utils/cn.ts"

cat > src/lib/utils/time.ts << 'EOF'
/**
 * ============================================================================
 * ⏱️ TIME UTILITY FUNCTIONS
 * ============================================================================
 */

/**
 * Format milliseconds to MM:SS format
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format milliseconds to HH:MM:SS format
 */
export function formatTimeWithHours(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Check if time is running out (less than 5 minutes)
 */
export function isTimeRunningOut(ms: number): boolean {
  return ms < 5 * 60 * 1000; // 5 minutes
}

/**
 * Check if time is critical (less than 1 minute)
 */
export function isTimeCritical(ms: number): boolean {
  return ms < 60 * 1000; // 1 minute
}
EOF

print_success "Created: src/lib/utils/time.ts"

# ============================================================================
# STEP 11: UPDATE NEXT.CONFIG.TS
# ============================================================================

print_header "STEP 11: Updating Next.js Configuration"

cat > next.config.ts << 'EOF'
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },

  // Environment variables validation
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  },

  // Webpack configuration
  webpack: (config) => {
    // Fix for canvas module (required by some libraries)
    config.externals.push({
      canvas: 'commonjs canvas',
    });

    return config;
  },

  // Image domains (if needed)
  images: {
    domains: ['localhost'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
EOF

print_success "Updated: next.config.ts"

# ============================================================================
# STEP 12: CREATE PRETTIER CONFIG
# ============================================================================

print_header "STEP 12: Creating Prettier Configuration"

cat > .prettierrc << 'EOF'
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
EOF

print_success "Created: .prettierrc"

cat > .prettierignore << 'EOF'
# Dependencies
node_modules
.pnp
.pnp.js

# Build output
.next
out
dist
build

# Testing
coverage

# Misc
.DS_Store
*.pem

# Environment files
.env
.env.local
.env.development
.env.test
.env.production

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Lock files
package-lock.json
pnpm-lock.yaml
yarn.lock
EOF

print_success "Created: .prettierignore"

# ============================================================================
# STEP 13: UPDATE LAYOUT.TSX WITH PROVIDERS
# ============================================================================

print_header "STEP 13: Updating Root Layout"

cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tryout System - Online Exam Platform',
  description: 'Professional online tryout system with proctoring',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
EOF

print_success "Updated: src/app/layout.tsx"

# ============================================================================
# STEP 14: CREATE PROVIDERS COMPONENT
# ============================================================================

print_header "STEP 14: Creating Providers Component"

cat > src/components/providers.tsx << 'EOF'
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { env } from '@/env';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {env.NEXT_PUBLIC_ENABLE_DEVTOOLS && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
EOF

print_success "Created: src/components/providers.tsx"

# ============================================================================
# STEP 15: CREATE GITIGNORE
# ============================================================================

print_header "STEP 15: Updating .gitignore"

cat > .gitignore << 'EOF'
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# local env files
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# MSW
public/mockServiceWorker.js
EOF

print_success "Updated: .gitignore"

# ============================================================================
# STEP 16: CREATE README
# ============================================================================

print_header "STEP 16: Creating Project Documentation"

cat > README.md << 'EOF'
# 🚀 Tryout System - Frontend

Modern online exam platform with real-time proctoring built with Next.js 15, React Query, and TypeScript.

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand + React Query
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form + Zod
- **Real-time:** Socket.io Client
- **UI Components:** shadcn/ui (Radix UI + Tailwind)

## 📁 Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (dashboard)/       # Dashboard routes
│   └── (exam)/            # Exam routes
├── components/
│   ├── features/          # Feature-specific components
│   ├── layouts/           # Layout components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── api/              # API client functions
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand stores
│   └── utils/            # Utility functions
├── schemas/              # Zod validation schemas
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Backend API running on `http://localhost:3000`

### Installation
```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

### Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
pnpm format       # Format code with Prettier
```

## 🔐 Authentication Flow

1. User enters credentials
2. Frontend calls `/api/v1/auth/login`
3. Backend returns `accessToken` + `refreshToken`
4. Tokens stored in cookies
5. Axios interceptor attaches token to all requests
6. Auto-refresh on 401 errors

## 📡 API Integration

All API calls go through centralized Axios instance:
```typescript
import { api } from '@/lib/api/axios';

// Automatically includes Authorization header
const response = await api.get('/exams');
```

## 🎯 Key Features

- ✅ Type-safe environment variables
- ✅ Automatic token refresh
- ✅ React Query for server state
- ✅ Zustand for client state
- ✅ Form validation with Zod
- ✅ Real-time proctoring
- ✅ Responsive design
- ✅ Dark mode support

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details
EOF

print_success "Created: README.md"

# ============================================================================
# FINAL STEPS
# ============================================================================

print_header "FINAL STEPS"

# Format all created files
print_info "Formatting code with Prettier..."
pnpm format 2>/dev/null || print_warning "Prettier not available, skipping format"

# Run type check
print_info "Running type check..."
pnpm type-check 2>/dev/null || print_warning "Type check failed, please fix errors"

print_header "✨ SETUP COMPLETE! ✨"

echo ""
print_success "Project structure created successfully!"
echo ""
print_info "Next steps:"
echo "  1. Review .env.local and update if needed"
echo "  2. Run: pnpm dev"
echo "  3. Open: http://localhost:3001"
echo "  4. Start building your features!"
echo ""
print_info "Quick commands:"
echo "  pnpm dev          - Start development server"
echo "  pnpm type-check   - Check TypeScript errors"
echo "  pnpm lint         - Run ESLint"
echo "  pnpm format       - Format code"
echo ""
print_warning "Don't forget to:"
echo "  - Commit .env.example to git"
echo "  - Add .env.local to .gitignore (already done)"
echo "  - Start your backend server on port 3000"
echo ""

exit 0
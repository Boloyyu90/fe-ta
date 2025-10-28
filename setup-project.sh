#!/bin/bash

# setup-project.sh
# Run with: bash setup-project.sh

echo "🚀 Setting up Frontend Project Structure..."

# Create main directories
mkdir -p src/lib/{api,store,hooks,types,utils}
mkdir -p src/config
mkdir -p src/components/{layouts,forms,exam,ui}
mkdir -p src/app/\(auth\)/{login,register}
mkdir -p src/app/\(admin\)/{dashboard,questions,exams,users,proctoring}
mkdir -p src/app/\(participant\)/{dashboard,exam,results}

echo "📁 Folders created!"

# Create config files
cat > src/config/env.ts << 'EOF'
export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
} as const;
EOF

cat > src/config/constants.ts << 'EOF'
export const APP_NAME = 'Tryout System';
export const APP_DESCRIPTION = 'Online Tryout with Proctoring';

export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Admin
  ADMIN_DASHBOARD: '/dashboard',
  ADMIN_QUESTIONS: '/questions',
  ADMIN_EXAMS: '/exams',
  ADMIN_USERS: '/users',
  ADMIN_PROCTORING: '/proctoring',

  // Participant
  PARTICIPANT_DASHBOARD: '/dashboard',
  PARTICIPANT_EXAM: (id: string | number) => `/exam/${id}`,
  PARTICIPANT_RESULTS: '/results',
} as const;

export const QUERY_KEYS = {
  AUTH: 'auth',
  USER: 'user',
  EXAMS: 'exams',
  EXAM_DETAIL: 'exam-detail',
  EXAM_SESSION: 'exam-session',
  QUESTIONS: 'questions',
  ANSWERS: 'answers',
  PROCTORING: 'proctoring',
} as const;
EOF

echo "⚙️ Config files created!"

# Create API client
cat > src/lib/api/client.ts << 'EOF'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ENV } from '@/config/env';

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${ENV.API_URL}/auth/refresh`, {
          refreshToken,
        });

        localStorage.setItem('accessToken', data.data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.data.tokens.refreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.data.tokens.accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
EOF

echo "🔌 API client created!"

# Create type definitions
cat > src/lib/types/api.ts << 'EOF'
// ============= USER & AUTH =============
export type UserRole = 'ADMIN' | 'PARTICIPANT';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
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

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// ============= EXAM =============
export interface Exam {
  id: number;
  title: string;
  description: string | null;
  startTime: string | null;
  endTime: string | null;
  durationMinutes: number;
  createdAt: string;
  createdBy: number;
}

// ============= QUESTION =============
export type QuestionType = 'TIU' | 'TKP' | 'TWK';

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
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  defaultScore: number;
  questionType: QuestionType;
  createdAt: string;
}

// ============= API WRAPPER =============
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
EOF

echo "📝 Type definitions created!"

# Create auth store
cat > src/lib/store/authStore.ts << 'EOF'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
EOF

echo "🗃️ Auth store created!"

# Create auth API
cat > src/lib/api/auth.ts << 'EOF'
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
EOF

echo "🔐 Auth API created!"

# Create useAuth hook
cat > src/lib/hooks/useAuth.ts << 'EOF'
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import type { LoginRequest, RegisterRequest } from '../types/api';

export function useAuth() {
  const router = useRouter();
  const { setUser, logout: logoutStore } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      setUser(data.user);

      // Redirect based on role
      if (data.user.role === 'ADMIN') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => authApi.register(userData),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      setUser(data.user);
      router.push('/dashboard');
    },
  });

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      logoutStore();
      router.push('/login');
    }
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
EOF

echo "🪝 useAuth hook created!"

# Create .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
EOF

echo "🌍 Environment file created!"

# Create .eslintrc.json
cat > .eslintrc.json << 'EOF'
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
EOF

echo "🔍 ESLint config created!"

# Create .prettierrc
cat > .prettierrc << 'EOF'
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
EOF

echo "💅 Prettier config created!"

# Update package.json scripts
echo "📝 Don't forget to update package.json scripts:"
echo '  "dev": "next dev",'
echo '  "build": "next build",'
echo '  "lint": "next lint",'
echo '  "format": "prettier --write ."'

echo ""
echo "✅ Project structure setup complete!"
echo ""
echo "Next steps:"
echo "1. Update package.json scripts (remove --webpack flags)"
echo "2. Run: pnpm install (to ensure all deps are installed)"
echo "3. Run: pnpm dev"
echo ""
echo "Happy coding! 🎉"
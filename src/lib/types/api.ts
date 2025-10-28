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

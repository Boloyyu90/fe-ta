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

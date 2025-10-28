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

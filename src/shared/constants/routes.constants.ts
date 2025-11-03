export const ROUTES = {
    // Public
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',

    // Participant
    DASHBOARD: '/dashboard',
    EXAMS: '/exams',
    EXAM_DETAIL: (id: number) => `/exams/${id}`,
    TAKE_EXAM: (id: number) => `/exam/${id}/take`,
    RESULTS: '/results',
    RESULT_DETAIL: (id: number) => `/results/${id}`,
    RESULT_REVIEW: (id: number) => `/results/${id}/review`,

    // Admin
    ADMIN_DASHBOARD: '/admin',
    ADMIN_USERS: '/admin/users',
    ADMIN_USERS_CREATE: '/admin/users/create',
    ADMIN_EXAMS: '/admin/exams',
    ADMIN_EXAMS_CREATE: '/admin/exams/create',
    ADMIN_EXAMS_EDIT: (id: number) => `/admin/exams/${id}/edit`,
    ADMIN_QUESTIONS: '/admin/questions',
    ADMIN_QUESTIONS_CREATE: '/admin/questions/create',
    ADMIN_QUESTIONS_IMPORT: '/admin/questions/import',
    ADMIN_RESULTS: '/admin/results',
    ADMIN_RESULT_DETAIL: (id: number) => `/admin/results/${id}`,
    ADMIN_PROCTORING: '/admin/proctoring',
} as const;
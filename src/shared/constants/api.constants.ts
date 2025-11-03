export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
    },

    // Exams
    EXAMS: {
        LIST: '/exams',
        DETAIL: (id: number) => `/exams/${id}`,
        START: (id: number) => `/exams/${id}/start`,
    },

    // Admin Exams
    ADMIN_EXAMS: {
        LIST: '/admin/exams',
        CREATE: '/admin/exams',
        DETAIL: (id: number) => `/admin/exams/${id}`,
        UPDATE: (id: number) => `/admin/exams/${id}`,
        DELETE: (id: number) => `/admin/exams/${id}`,
        ATTACH_QUESTIONS: (id: number) => `/admin/exams/${id}/questions`,
        DETACH_QUESTIONS: (id: number) => `/admin/exams/${id}/questions`,
        QUESTIONS: (id: number) => `/admin/exams/${id}/questions`,
    },

    // Exam Sessions
    USER_EXAMS: {
        DETAIL: (id: number) => `/user-exams/${id}`,
        QUESTIONS: (id: number) => `/user-exams/${id}/questions`,
        SUBMIT_ANSWER: (id: number) => `/user-exams/${id}/answers`,
        GET_ANSWERS: (id: number) => `/user-exams/${id}/answers`,
        SUBMIT: (id: number) => `/user-exams/${id}/submit`,
    },

    // Results
    RESULTS: {
        MY_RESULTS: '/results/me',
        ADMIN_RESULTS: '/admin/results',
    },

    // Questions
    QUESTIONS: {
        LIST: '/admin/questions',
        CREATE: '/admin/questions',
        DETAIL: (id: number) => `/admin/questions/${id}`,
        UPDATE: (id: number) => `/admin/questions/${id}`,
        DELETE: (id: number) => `/admin/questions/${id}`,
        BULK_CREATE: '/admin/questions/bulk',
        BULK_DELETE: '/admin/questions/bulk-delete',
        STATS: '/admin/questions/stats',
    },

    // Proctoring
    PROCTORING: {
        LOG_EVENT: '/proctoring/events',
        LOG_BATCH: '/proctoring/events/batch',
        DETECT_FACE: '/proctoring/detect-face',
        EVENTS: (userExamId: number) => `/proctoring/user-exams/${userExamId}/events`,
        STATS: (userExamId: number) => `/proctoring/user-exams/${userExamId}/stats`,
        ADMIN_EVENTS: '/admin/proctoring/events',
    },

    // Users
    USERS: {
        LIST: '/users',
        CREATE: '/users',
        DETAIL: (id: number) => `/users/${id}`,
        UPDATE: (id: number) => `/users/${id}`,
        DELETE: (id: number) => `/users/${id}`,
    },
} as const;
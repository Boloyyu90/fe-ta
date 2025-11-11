export const API_ENDPOINTS = {
    // ==================== AUTH (PUBLIC) ====================
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
    },

    // ==================== SELF-MANAGEMENT ====================
    ME: {
        PROFILE: '/me',
        UPDATE: '/me',
    },

    // ==================== EXAMS (PARTICIPANT) ====================
    EXAMS: {
        LIST: '/exams',
        DETAIL: (id: number) => `/exams/${id}`,
        START: (id: number) => `/exams/${id}/start`,
    },

    // ==================== EXAM SESSIONS ====================
    EXAM_SESSIONS: {
        LIST: '/exam-sessions',
        DETAIL: (id: number) => `/exam-sessions/${id}`,
        QUESTIONS: (id: number) => `/exam-sessions/${id}/questions`,
        SUBMIT_ANSWER: (id: number) => `/exam-sessions/${id}/answers`,
        GET_ANSWERS: (id: number) => `/exam-sessions/${id}/answers`,
        SUBMIT: (id: number) => `/exam-sessions/${id}/submit`,
    },

    // ==================== RESULTS ====================
    RESULTS: {
        MY_RESULTS: '/results',
    },

    // ==================== PROCTORING ====================
    PROCTORING: {
        LOG_EVENT: '/proctoring/events',
        ANALYZE_FACE: (userExamId: number) =>
            `/proctoring/exam-sessions/${userExamId}/analyze-face`,
        GET_EVENTS: (userExamId: number) =>
            `/proctoring/exam-sessions/${userExamId}/events`,
    },

    // ==================== ADMIN ROUTES ====================
    ADMIN: {
        USERS: {
            LIST: '/admin/users',
            CREATE: '/admin/users',
            DETAIL: (id: number) => `/admin/users/${id}`,
            UPDATE: (id: number) => `/admin/users/${id}`,
            DELETE: (id: number) => `/admin/users/${id}`,
        },

        EXAMS: {
            LIST: '/admin/exams',
            CREATE: '/admin/exams',
            DETAIL: (id: number) => `/admin/exams/${id}`,
            UPDATE: (id: number) => `/admin/exams/${id}`,
            DELETE: (id: number) => `/admin/exams/${id}`,
            GET_QUESTIONS: (id: number) => `/admin/exams/${id}/questions`,
            ATTACH_QUESTIONS: (id: number) => `/admin/exams/${id}/questions`,
            DETACH_QUESTIONS: (id: number) => `/admin/exams/${id}/questions`,
        },

        QUESTIONS: {
            LIST: '/admin/questions',
            CREATE: '/admin/questions',
            DETAIL: (id: number) => `/admin/questions/${id}`,
            UPDATE: (id: number) => `/admin/questions/${id}`,
            DELETE: (id: number) => `/admin/questions/${id}`,
        },

        EXAM_SESSIONS: {
            LIST: '/admin/exam-sessions',
            DETAIL: (id: number) => `/admin/exam-sessions/${id}`,
            GET_ANSWERS: (id: number) => `/admin/exam-sessions/${id}/answers`,
        },

        RESULTS: {
            LIST: '/admin/results',
        },

        PROCTORING: {
            EVENTS: '/admin/proctoring/events',
            SESSION_EVENTS: (userExamId: number) =>
                `/admin/proctoring/exam-sessions/${userExamId}/events`,
        },
    },
} as const;
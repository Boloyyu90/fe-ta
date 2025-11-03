export const QUERY_KEYS = {
    // Auth
    AUTH: {
        ME: ['auth', 'me'] as const,
    },

    DASHBOARD: ['dashboard'] as const,

    // Exams
    EXAMS: {
        ALL: ['exams'] as const,
        LIST: (params?: any) => ['exams', 'list', params] as const,
        DETAIL: (id: number) => ['exams', 'detail', id] as const,
    },

    // Exam Sessions
    USER_EXAMS: {
        DETAIL: (id: number) => ['user-exams', id] as const,
        QUESTIONS: (id: number, params?: any) => ['user-exams', id, 'questions', params] as const,
        ANSWERS: (id: number) => ['user-exams', id, 'answers'] as const,
    },

    // Results
    RESULTS: {
        MY_RESULTS: (params?: any) => ['results', 'me', params] as const,
        ADMIN_RESULTS: (params?: any) => ['results', 'admin', params] as const,
    },

    // Questions
    QUESTIONS: {
        ALL: ['questions'] as const,
        LIST: (params?: any) => ['questions', 'list', params] as const,
        DETAIL: (id: number) => ['questions', 'detail', id] as const,
        STATS: ['questions', 'stats'] as const,
    },

    // Proctoring
    PROCTORING: {
        EVENTS: (userExamId: number, params?: any) =>
            ['proctoring', 'events', userExamId, params] as const,
        STATS: (userExamId: number) => ['proctoring', 'stats', userExamId] as const,
        ADMIN_EVENTS: (params?: any) => ['proctoring', 'admin', params] as const,
    },

    // Users
    USERS: {
        ALL: ['users'] as const,
        LIST: (params?: any) => ['users', 'list', params] as const,
        DETAIL: (id: number) => ['users', 'detail', id] as const,
    },
} as const;
import { api } from '@/shared/lib/api/axios';
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api.types';
import type { DashboardData, RecentExamAttempt } from '../types/dashboard.types';

interface ExamResponse {
    id: number;
    title: string;
    description: string | null;
    startTime: string | null;
    durationMinutes: number;
    _count?: {
        examQuestions: number;
    };
}

export const dashboardApi = {
    getDashboardData: async (): Promise<DashboardData> => {
        // ✅ FIX 1: Correct generic syntax for axios
        const attemptsResponse = await api.get<ApiResponse<PaginatedResponse<RecentExamAttempt>>>(
            '/results/me',
            {
                params: { page: 1, limit: 5 },
            }
        );

        const recentAttempts = attemptsResponse.data.data?.data || [];

        // ✅ FIX 2: Correct generic syntax with proper type
        const examsResponse = await api.get<ApiResponse<PaginatedResponse<ExamResponse>>>(
            '/exams',
            {
                params: { page: 1, limit: 5 },
            }
        );

        const upcomingExams = examsResponse.data.data?.data || [];

        // Calculate stats
        const totalExamsAttempted = recentAttempts.length;
        const completedExams = recentAttempts.filter((a) => a.status === 'FINISHED').length;
        const inProgressExams = recentAttempts.filter((a) => a.status === 'IN_PROGRESS').length;

        const scores = recentAttempts
            .filter((a) => a.totalScore !== null)
            .map((a) => a.totalScore!);

        const averageScore =
            scores.length > 0
                ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
                : 0;

        return {
            stats: {
                totalExamsAttempted,
                completedExams,
                inProgressExams,
                averageScore,
            },
            recentAttempts,
            upcomingExams: upcomingExams.map((exam) => ({
                id: exam.id,
                title: exam.title,
                description: exam.description,
                startTime: exam.startTime,
                durationMinutes: exam.durationMinutes,
                totalQuestions: exam._count?.examQuestions || 0,
            })),
        };
    },
};
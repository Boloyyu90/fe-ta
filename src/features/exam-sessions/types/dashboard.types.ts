import { ExamStatus } from '@/shared/types/common.types';

export interface DashboardStats {
    totalExamsAttempted: number;
    completedExams: number;
    inProgressExams: number;
    averageScore: number;
}

export interface RecentExamAttempt {
    id: number;
    examTitle: string;
    examId: number;
    status: ExamStatus;
    totalScore: number | null;
    startedAt: string;
    submittedAt: string | null;
}

export interface UpcomingExam {
    id: number;
    title: string;
    description: string | null;
    startTime: string | null;
    durationMinutes: number;
    totalQuestions: number;
}

export interface DashboardData {
    stats: DashboardStats;
    recentAttempts: RecentExamAttempt[];
    upcomingExams: UpcomingExam[];
}
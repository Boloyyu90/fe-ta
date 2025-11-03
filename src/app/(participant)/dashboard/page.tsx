'use client';

import { useAuthStore } from '@/features/auth/store/authStore';
import { useDashboard } from '@/features/exam-sessions/hooks/useDashboard';
import { StatsCard } from '@/features/exam-sessions/components/StatsCard';
import { RecentAttemptsTable } from '@/features/exam-sessions/components/RecentAttemptsTable';
import { UpcomingExamsList } from '@/features/exam-sessions/components/UpcomingExamsList';
import { Spinner } from '@/shared/components/ui/Spinner';
import { Alert } from '@/shared/components/ui/Alert';

export default function DashboardPage() {
    const { user } = useAuthStore();
    const { data, isLoading, isError, error } = useDashboard();

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (isError) {
        return (
            <Alert variant="error" title="Gagal Memuat Dashboard">
                {error?.message || 'Terjadi kesalahan saat memuat data dashboard'}
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-gray-600">
                    Selamat datang kembali, <span className="font-medium">{user?.name}</span>!
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Ujian"
                    value={data?.stats.totalExamsAttempted || 0}
                    icon={
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    }
                />

                <StatsCard
                    title="Selesai"
                    value={data?.stats.completedExams || 0}
                    icon={
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                />

                <StatsCard
                    title="Sedang Berlangsung"
                    value={data?.stats.inProgressExams || 0}
                    icon={
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                />

                <StatsCard
                    title="Rata-rata Nilai"
                    value={data?.stats.averageScore || 0}
                    icon={
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                        </svg>
                    }
                />
            </div>

            {/* Recent Attempts */}
            <RecentAttemptsTable attempts={data?.recentAttempts || []} />

            {/* Upcoming Exams */}
            <UpcomingExamsList exams={data?.upcomingExams || []} />
        </div>
    );
}
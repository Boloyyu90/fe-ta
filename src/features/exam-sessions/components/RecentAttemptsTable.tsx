import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { formatDateTime } from '@/shared/utils/formatDate';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { RecentExamAttempt } from '../types/dashboard.types';

interface RecentAttemptsTableProps {
    attempts: RecentExamAttempt[];
}

export function RecentAttemptsTable({ attempts }: RecentAttemptsTableProps) {
    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'info' | 'success' | 'warning' | 'error'> = {
            IN_PROGRESS: 'info',
            FINISHED: 'success',
            TIMEOUT: 'warning',
            CANCELLED: 'error',
        };

        const labels: Record<string, string> = {
            IN_PROGRESS: 'Sedang Berlangsung',
            FINISHED: 'Selesai',
            TIMEOUT: 'Waktu Habis',
            CANCELLED: 'Dibatalkan',
        };

        return (
            <Badge variant={variants[status] || 'info'}>
                {labels[status] || status}
            </Badge>
        );
    };

    if (attempts.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold text-gray-900">Ujian Terbaru</h2>
                </CardHeader>
                <CardContent>
                    <div className="py-8 text-center">
                        <p className="text-gray-500">Belum ada ujian yang dikerjakan</p>
                        <Link href={ROUTES.EXAMS} className="mt-4 inline-block">
                            <Button size="sm">Mulai Ujian</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Ujian Terbaru</h2>
                    <Link href={ROUTES.RESULTS}>
                        <Button variant="ghost" size="sm">
                            Lihat Semua
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-gray-200">
                            <th className="pb-3 text-left text-sm font-medium text-gray-700">
                                Ujian
                            </th>
                            <th className="pb-3 text-left text-sm font-medium text-gray-700">
                                Status
                            </th>
                            <th className="pb-3 text-left text-sm font-medium text-gray-700">
                                Nilai
                            </th>
                            <th className="pb-3 text-left text-sm font-medium text-gray-700">
                                Tanggal
                            </th>
                            <th className="pb-3 text-right text-sm font-medium text-gray-700">
                                Aksi
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {attempts.map((attempt) => (
                            <tr key={attempt.id} className="border-b border-gray-100">
                                <td className="py-4 text-sm text-gray-900">
                                    {attempt.examTitle}
                                </td>
                                <td className="py-4 text-sm">
                                    {getStatusBadge(attempt.status)}
                                </td>
                                <td className="py-4 text-sm font-medium text-gray-900">
                                    {attempt.totalScore !== null ? attempt.totalScore : '-'}
                                </td>
                                <td className="py-4 text-sm text-gray-600">
                                    {formatDateTime(attempt.startedAt)}
                                </td>
                                <td className="py-4 text-right text-sm">
                                    {attempt.status === 'FINISHED' ? (
                                        <Link href={ROUTES.RESULT_DETAIL(attempt.id)}>
                                            <Button variant="ghost" size="sm">
                                                Detail
                                            </Button>
                                        </Link>
                                    ) : attempt.status === 'IN_PROGRESS' ? (
                                        <Link href={ROUTES.TAKE_EXAM(attempt.examId)}>
                                            <Button size="sm">Lanjutkan</Button>
                                        </Link>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { formatDate } from '@/shared/utils/formatDate';
import { formatDuration } from '@/shared/utils/formatTime';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { UpcomingExam } from '../types/dashboard.types';

interface UpcomingExamsListProps {
    exams: UpcomingExam[];
}

export function UpcomingExamsList({ exams }: UpcomingExamsListProps) {
    if (exams.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold text-gray-900">Ujian Tersedia</h2>
                </CardHeader>
                <CardContent>
                    <div className="py-8 text-center">
                        <p className="text-gray-500">Tidak ada ujian yang tersedia saat ini</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Ujian Tersedia</h2>
                    <Link href={ROUTES.EXAMS}>
                        <Button variant="ghost" size="sm">
                            Lihat Semua
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {exams.map((exam) => (
                        <div
                            key={exam.id}
                            className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                                    {exam.description && (
                                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                            {exam.description}
                                        </p>
                                    )}
                                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                                        <span>📝 {exam.totalQuestions} soal</span>
                                        <span>⏱️ {formatDuration(exam.durationMinutes * 60)}</span>
                                        {exam.startTime && (
                                            <span>📅 {formatDate(exam.startTime)}</span>
                                        )}
                                    </div>
                                </div>
                                <Link href={ROUTES.EXAM_DETAIL(exam.id)}>
                                    <Button size="sm" className="ml-4">
                                        Mulai
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
'use client';

import { useParams } from 'next/navigation';

export default function ExamDetailPage() {
    const params = useParams();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Detail Ujian #{params.id}</h1>
            <p className="mt-4 text-gray-600">
                Halaman ini akan menampilkan detail ujian dan tombol untuk memulai.
            </p>
            <p className="mt-2 text-sm text-gray-500">
                🚧 Under Construction - Coming Soon
            </p>
        </div>
    );
}
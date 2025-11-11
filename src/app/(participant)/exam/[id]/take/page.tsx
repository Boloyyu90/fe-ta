'use client';

import { useParams } from 'next/navigation';

export default function TakeExamPage() {
    const params = useParams();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Mengerjakan Ujian #{params.id}</h1>
            <p className="mt-4 text-gray-600">
                Halaman ini adalah interface untuk mengerjakan ujian dengan proctoring.
            </p>
            <p className="mt-2 text-sm text-gray-500">
                🚧 Under Construction - Coming Soon (CRITICAL PAGE)
            </p>
        </div>
    );
}

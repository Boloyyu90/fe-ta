'use client';

import { useParams } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/authStore';

export default function EditExamPage() {
    const params = useParams();
    const { user } = useAuthStore();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Ujian #{params.id}</h1>
            <p className="mt-4 text-gray-600">
                Halaman ini akan menampilkan form untuk mengedit ujian.
            </p>
            <p className="mt-2 text-sm text-gray-500">
                🚧 Under Construction - Coming Soon
            </p>
        </div>
    );
}
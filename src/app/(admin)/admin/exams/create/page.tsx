'use client';

import { useAuthStore } from '@/features/auth/store/authStore';

export default function CreateExamPage() {
    const { user } = useAuthStore();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Buat Ujian Baru</h1>
            <p className="mt-4 text-gray-600">
                Halaman ini akan menampilkan form untuk membuat ujian baru.
            </p>
            <p className="mt-2 text-sm text-gray-500">
                🚧 Under Construction - Coming Soon
            </p>
        </div>
    );
}

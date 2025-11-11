'use client';

import { useAuthStore } from '@/features/auth/store/authStore';

export default function DashboardPage() {
    const { user } = useAuthStore();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-4 text-gray-600">Selamat datang, {user?.name}!</p>
            <p className="mt-2 text-sm text-gray-500">
                Halaman ini akan menampilkan statistik dan ringkasan ujian Anda.
            </p>
        </div>
    );
}
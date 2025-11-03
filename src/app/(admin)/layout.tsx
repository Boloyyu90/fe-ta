'use client';

import { ReactNode } from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Header } from '@/shared/components/layouts/Header';
import { Sidebar } from '@/shared/components/layouts/Sidebar';
import { ROUTES } from '@/shared/constants/routes.constants';

const adminSidebarItems = [
    {
        label: 'Dashboard',
        href: ROUTES.ADMIN_DASHBOARD,
    },
    {
        label: 'Kelola User',
        href: ROUTES.ADMIN_USERS,
    },
    {
        label: 'Kelola Ujian',
        href: ROUTES.ADMIN_EXAMS,
    },
    {
        label: 'Bank Soal',
        href: ROUTES.ADMIN_QUESTIONS,
    },
    {
        label: 'Hasil Ujian',
        href: ROUTES.ADMIN_RESULTS,
    },
    {
        label: 'Proctoring',
        href: ROUTES.ADMIN_PROCTORING,
    },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated || user?.role !== 'ADMIN') {
        return null; // Middleware will redirect
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex">
                <Sidebar items={adminSidebarItems} />
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
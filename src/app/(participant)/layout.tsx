'use client';

import { ReactNode } from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Header } from '@/shared/components/layouts/Header';
import { Sidebar } from '@/shared/components/layouts/Sidebar';
import { ROUTES } from '@/shared/constants/routes.constants';

const participantSidebarItems = [
    {
        label: 'Dashboard',
        href: ROUTES.DASHBOARD,
    },
    {
        label: 'Daftar Ujian',
        href: ROUTES.EXAMS,
    },
    {
        label: 'Hasil Saya',
        href: ROUTES.RESULTS,
    },
];

export default function ParticipantLayout({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return null; // Middleware will redirect
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex">
                <Sidebar items={participantSidebarItems} />
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
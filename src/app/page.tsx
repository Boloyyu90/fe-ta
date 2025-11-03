'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/authStore';
import { ROUTES } from '@/shared/constants/routes.constants';
import { Spinner } from '@/shared/components/ui/Spinner';

export default function HomePage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'ADMIN') {
                router.push(ROUTES.ADMIN_DASHBOARD);
            } else {
                router.push(ROUTES.DASHBOARD);
            }
        } else {
            router.push(ROUTES.LOGIN);
        }
    }, [isAuthenticated, user, router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Spinner size="lg" />
        </div>
    );
}
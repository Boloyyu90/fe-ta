'use client';

import Link from 'next/link';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { Button } from '../ui/Button';
import { ROUTES } from '@/shared/constants/routes.constants';

export function Header() {
    const { isAuthenticated, user } = useAuthStore();
    const { mutate: logout, isPending } = useLogout();

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href={ROUTES.HOME} className="text-xl font-bold text-blue-600">
                    Tryout System
                </Link>

                <nav className="flex items-center gap-4">
                    {isAuthenticated && user ? (
                        <>
              <span className="text-sm text-gray-700">
                {user.name} ({user.role})
              </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => logout()}
                                isLoading={isPending}
                                disabled={isPending}
                            >
                                Keluar
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href={ROUTES.LOGIN}>
                                <Button variant="ghost" size="sm">
                                    Masuk
                                </Button>
                            </Link>
                            <Link href={ROUTES.REGISTER}>
                                <Button size="sm">Daftar</Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
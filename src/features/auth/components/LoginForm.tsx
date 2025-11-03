'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { loginSchema, type LoginFormData } from '../schemas/login.schema';
import { useLogin } from '../hooks/useLogin';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Alert } from '@/shared/components/ui/Alert';
import { ROUTES } from '@/shared/constants/routes.constants';

export function LoginForm() {
    const { mutate: login, isPending, isError, error } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        login(data);
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Masuk</h1>
                <p className="mt-2 text-gray-600">Masuk ke akun Anda</p>
            </div>

            {isError && (
                <Alert variant="error">
                    {error?.message || 'Email atau password salah'}
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    {...register('email')}
                    type="email"
                    label="Email"
                    placeholder="nama@email.com"
                    error={errors.email?.message}
                    disabled={isPending}
                />

                <Input
                    {...register('password')}
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    disabled={isPending}
                />

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isPending}
                    disabled={isPending}
                >
                    Masuk
                </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link href={ROUTES.REGISTER} className="font-medium text-blue-600 hover:text-blue-700">
                    Daftar di sini
                </Link>
            </p>
        </div>
    );
}
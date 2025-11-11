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
import { getErrorMessage, getValidationErrors, isNetworkError } from '@/shared/utils/error-handler';
import { useEffect } from 'react';

export function LoginForm() {
    const { mutate: login, isPending, isError, error } = useLogin();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // ✅ IMPROVED: Set field-specific errors from API
    useEffect(() => {
        if (error) {
            const validationErrors = getValidationErrors(error);
            Object.entries(validationErrors).forEach(([field, message]) => {
                setError(field as keyof LoginFormData, {
                    type: 'manual',
                    message,
                });
            });
        }
    }, [error, setError]);

    const onSubmit = (data: LoginFormData) => {
        login(data);
    };

    // ✅ IMPROVED: Better error messages
    const errorMessage = error ? getErrorMessage(error) : null;
    const showNetworkWarning = error ? isNetworkError(error) : false;

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Masuk</h1>
                <p className="mt-2 text-gray-600">Masuk ke akun Anda</p>
            </div>

            {isError && errorMessage && (
                <Alert
                    variant={showNetworkWarning ? 'warning' : 'error'}
                    title={showNetworkWarning ? 'Masalah Koneksi' : 'Login Gagal'}
                >
                    {errorMessage}
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
                    autoComplete="email"
                />

                <Input
                    {...register('password')}
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    disabled={isPending}
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isPending}
                    disabled={isPending}
                >
                    {isPending ? 'Memproses...' : 'Masuk'}
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
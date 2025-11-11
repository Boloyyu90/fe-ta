'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { registerSchema, type RegisterFormData } from '../schemas/register.schema';
import { useRegister } from '../hooks/useRegister';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Alert } from '@/shared/components/ui/Alert';
import { ROUTES } from '@/shared/constants/routes.constants';
import { getErrorMessage, getValidationErrors, isNetworkError } from '@/shared/utils/error-handler';
import { useEffect } from 'react';

export function RegisterForm() {
    const { mutate: register, isPending, isError, error } = useRegister();

    const {
        register: registerField,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    // ✅ IMPROVED: Set field-specific errors from API
    useEffect(() => {
        if (error) {
            const validationErrors = getValidationErrors(error);
            Object.entries(validationErrors).forEach(([field, message]) => {
                setError(field as keyof RegisterFormData, {
                    type: 'manual',
                    message,
                });
            });
        }
    }, [error, setError]);

    const onSubmit = (data: RegisterFormData) => {
        const { confirmPassword, ...registerData } = data;
        register(registerData);
    };

    // ✅ IMPROVED: Better error messages
    const errorMessage = error ? getErrorMessage(error) : null;
    const showNetworkWarning = error ? isNetworkError(error) : false;

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Daftar</h1>
                <p className="mt-2 text-gray-600">Buat akun baru</p>
            </div>

            {isError && errorMessage && (
                <Alert
                    variant={showNetworkWarning ? 'warning' : 'error'}
                    title={showNetworkWarning ? 'Masalah Koneksi' : 'Registrasi Gagal'}
                >
                    {errorMessage}
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    {...registerField('name')}
                    type="text"
                    label="Nama Lengkap"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    disabled={isPending}
                    autoComplete="name"
                />

                <Input
                    {...registerField('email')}
                    type="email"
                    label="Email"
                    placeholder="nama@email.com"
                    error={errors.email?.message}
                    disabled={isPending}
                    autoComplete="email"
                />

                <Input
                    {...registerField('password')}
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    disabled={isPending}
                    autoComplete="new-password"
                    helperText="Min. 8 karakter, huruf besar, huruf kecil, dan angka"
                />

                <Input
                    {...registerField('confirmPassword')}
                    type="password"
                    label="Konfirmasi Password"
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    disabled={isPending}
                    autoComplete="new-password"
                />

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isPending}
                    disabled={isPending}
                >
                    {isPending ? 'Memproses...' : 'Daftar'}
                </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link href={ROUTES.LOGIN} className="font-medium text-blue-600 hover:text-blue-700">
                    Masuk di sini
                </Link>
            </p>
        </div>
    );
}
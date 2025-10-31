'use client';

/**
 * ============================================================================
 * 🔐 LOGIN FORM COMPONENT
 * ============================================================================
 * Features:
 * - React Hook Form + Zod validation
 * - React Query mutation
 * - Loading states
 * - Error handling
 * - Password visibility toggle
 * ============================================================================
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useLogin } from '@/lib/hooks/useAuth';
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema';

export function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await loginMutation.mutateAsync(data);
            router.push('/dashboard');
        } catch (error) {
            // Error handled by mutation
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                </label>
                <input
                    {...register('email')}
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`
            w-full px-4 py-3 rounded-lg border
            ${errors.email ? 'border-red-500' : 'border-gray-300'}
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            placeholder:text-gray-400
          `}
                />
                {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>
                <div className="relative">
                    <input
                        {...register('password')}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className={`
              w-full px-4 py-3 pr-12 rounded-lg border
              ${errors.password ? 'border-red-500' : 'border-gray-300'}
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
              placeholder:text-gray-400
            `}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-end">
                <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                    Forgot password?
                </button>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting || loginMutation.isPending}
                className="
          w-full py-3 px-4 rounded-lg
          bg-blue-600 hover:bg-blue-700
          text-white font-semibold
          focus:ring-4 focus:ring-blue-300
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          flex items-center justify-center gap-2
        "
            >
                {(isSubmitting || loginMutation.isPending) && (
                    <Loader2 size={20} className="animate-spin" />
                )}
                {isSubmitting || loginMutation.isPending ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Error Message */}
            {loginMutation.isError && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-800">
                        {loginMutation.error instanceof Error
                            ? loginMutation.error.message
                            : 'An error occurred during login'}
                    </p>
                </div>
            )}
        </form>
    );
}
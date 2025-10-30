'use client';

/**
 * ============================================================================
 * 📝 REGISTER FORM COMPONENT
 * ============================================================================
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRegister } from '@/lib/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '@/schemas/auth.schema';

export function RegisterForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerMutation.mutateAsync({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            router.push('/dashboard');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                </label>
                <input
                    {...register('name')}
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    className={`
            w-full px-4 py-3 rounded-lg border
            ${errors.name ? 'border-red-500' : 'border-gray-300'}
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
          `}
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>

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
          `}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
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
                        autoComplete="new-password"
                        placeholder="Create a strong password"
                        className={`
              w-full px-4 py-3 pr-12 rounded-lg border
              ${errors.password ? 'border-red-500' : 'border-gray-300'}
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
            `}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        {...register('confirmPassword')}
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        className={`
              w-full px-4 py-3 pr-12 rounded-lg border
              ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
            `}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting || registerMutation.isPending}
                className="
          w-full py-3 px-4 rounded-lg mt-6
          bg-blue-600 hover:bg-blue-700
          text-white font-semibold
          focus:ring-4 focus:ring-blue-300
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          flex items-center justify-center gap-2
        "
            >
                {(isSubmitting || registerMutation.isPending) && (
                    <Loader2 size={20} className="animate-spin" />
                )}
                {isSubmitting || registerMutation.isPending ? 'Creating account...' : 'Create Account'}
            </button>

            {/* Error Message */}
            {registerMutation.isError && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-800">
                        {registerMutation.error instanceof Error
                            ? registerMutation.error.message
                            : 'An error occurred during registration'}
                    </p>
                </div>
            )}
        </form>
    );
}
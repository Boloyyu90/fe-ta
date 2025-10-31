import Link from 'next/link';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h1>
                <p className="text-gray-600">Get started with your tryout preparation</p>
            </div>

            {/* Register Form */}
            <RegisterForm />

            {/* Login Link */}
            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>

            {/* Terms */}
            <p className="mt-8 text-xs text-center text-gray-500">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                </a>
            </p>
        </div>
    );
}
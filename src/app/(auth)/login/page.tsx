import Link from 'next/link';
import { LoginForm } from '@/components/features/auth/LoginForm';

export default function LoginPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
                <p className="text-gray-600">Sign in to continue to your account</p>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Register Link */}
            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/register"
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                        Create account
                    </Link>
                </p>
            </div>

            {/* Demo Credentials (Remove in production) */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium mb-2">🔑 Demo Credentials:</p>
                <div className="text-xs text-yellow-700 space-y-1 font-mono">
                    <p>Email: admin@example.com</p>
                    <p>Password: Admin123</p>
                </div>
            </div>
        </div>
    );
}
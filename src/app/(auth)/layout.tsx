/**
 * ============================================================================
 * 🔐 AUTH LAYOUT
 * ============================================================================
 * Layout untuk halaman authentication (login & register)
 * Features:
 * - Centered layout dengan card design
 * - Responsive untuk mobile & desktop
 * - Background gradient
 * ============================================================================
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Authentication - Tryout System',
    description: 'Login or register to access the tryout system',
};

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                {/* Logo */}
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-2xl font-bold text-blue-600">T</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Tryout System</h1>
                            <p className="text-blue-200 text-sm">Online Exam Platform</p>
                        </div>
                    </Link>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl font-bold text-white leading-tight">
                        Prepare for your
                        <br />
                        success with our
                        <br />
                        comprehensive exams
                    </h2>
                    <p className="text-lg text-blue-100 max-w-md">
                        Practice with real-time proctoring, detailed analytics, and instant feedback to
                        boost your performance.
                    </p>

                    {/* Features */}
                    <div className="space-y-4 pt-8">
                        <FeatureItem
                            icon="🎯"
                            title="Smart Proctoring"
                            description="AI-powered monitoring for exam integrity"
                        />
                        <FeatureItem
                            icon="📊"
                            title="Detailed Analytics"
                            description="Track your progress with comprehensive insights"
                        />
                        <FeatureItem
                            icon="⚡"
                            title="Instant Results"
                            description="Get immediate feedback after submission"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-blue-200 text-sm">
                    <p>&copy; 2025 Tryout System. All rights reserved.</p>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-xl font-bold text-white">T</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Tryout System</span>
                        </Link>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}

// Feature Item Component
function FeatureItem({
                         icon,
                         title,
                         description,
                     }: {
    icon: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="text-3xl">{icon}</div>
            <div>
                <h3 className="text-white font-semibold mb-1">{title}</h3>
                <p className="text-blue-200 text-sm">{description}</p>
            </div>
        </div>
    );
}
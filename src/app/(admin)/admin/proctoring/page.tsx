// src/app/(admin)/admin/page.tsx
'use client';

import { useAuthStore } from '@/features/auth/store/authStore';
import { StatsCard } from '@/features/dashboard/components/StatsCard';
import { Users, FileText, HelpCircle, Video } from 'lucide-react';

export default function AdminDashboardPage() {
    const user = useAuthStore((state) => state.user);

    // TODO: Replace with real data from API
    const stats = {
        totalUsers: 156,
        totalExams: 24,
        totalQuestions: 480,
        activeSessions: 12,
    };

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600">
                    Overview of system statistics and activities.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    description="Registered users"
                    colorClass="bg-blue-500"
                />
                <StatsCard
                    title="Total Exams"
                    value={stats.totalExams}
                    icon={FileText}
                    description="Created exams"
                    colorClass="bg-green-500"
                />
                <StatsCard
                    title="Questions Bank"
                    value={stats.totalQuestions}
                    icon={HelpCircle}
                    description="Available questions"
                    colorClass="bg-purple-500"
                />
                <StatsCard
                    title="Active Sessions"
                    value={stats.activeSessions}
                    icon={Video}
                    description="Live proctoring"
                    colorClass="bg-orange-500"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Recent Activities
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        View latest user activities and exam submissions
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        View All →
                    </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        System Health
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        All systems operational
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-green-600 font-medium">Online</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Quick Actions
                    </h3>
                    <div className="space-y-2">
                        <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">
                            + Create New Exam
                        </button>
                        <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">
                            + Add Questions
                        </button>
                        <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">
                            + Invite Users
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
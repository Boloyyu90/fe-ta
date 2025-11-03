import { Card, CardContent } from '@/shared/components/ui/Card';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                        {trend && (
                            <p
                                className={`mt-2 text-sm ${
                                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {trend.value}
                            </p>
                        )}
                    </div>
                    {icon && (
                        <div className="ml-4 rounded-full bg-blue-50 p-3 text-blue-600">
                            {icon}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
import { cn } from '@/shared/utils/cn';

interface AlertProps {
    variant?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Alert({ variant = 'info', title, children, className }: AlertProps) {
    return (
        <div
            className={cn(
                'rounded-lg border p-4',
                {
                    'border-blue-200 bg-blue-50 text-blue-900': variant === 'info',
                    'border-green-200 bg-green-50 text-green-900': variant === 'success',
                    'border-yellow-200 bg-yellow-50 text-yellow-900': variant === 'warning',
                    'border-red-200 bg-red-50 text-red-900': variant === 'error',
                },
                className
            )}
        >
            {title && <h5 className="mb-1 font-medium">{title}</h5>}
            <div className="text-sm">{children}</div>
        </div>
    );
}
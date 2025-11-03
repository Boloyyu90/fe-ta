import { cn } from '@/shared/utils/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'info' | 'success' | 'warning' | 'error';
    className?: string;
}

export function Badge({ children, variant = 'info', className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                {
                    'bg-blue-100 text-blue-800': variant === 'info',
                    'bg-green-100 text-green-800': variant === 'success',
                    'bg-yellow-100 text-yellow-800': variant === 'warning',
                    'bg-red-100 text-red-800': variant === 'error',
                },
                className
            )}
        >
      {children}
    </span>
    );
}
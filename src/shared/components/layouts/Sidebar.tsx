'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/utils/cn';

interface SidebarItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

interface SidebarProps {
    items: SidebarItem[];
}

export function Sidebar({ items }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-gray-200 bg-white">
            <nav className="flex flex-col gap-1 p-4">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                            pathname === item.href
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-700 hover:bg-gray-50'
                        )}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
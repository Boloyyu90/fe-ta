import Link from 'next/link';
import { Button } from '@/shared/components/ui/Button';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="text-6xl font-bold text-gray-900">404</h1>
            <p className="mt-2 text-xl text-gray-600">Halaman tidak ditemukan</p>
            <Link href="/" className="mt-6">
                <Button>Kembali ke Beranda</Button>
            </Link>
        </div>
    );
}
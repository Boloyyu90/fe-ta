'use client';

import { Button } from '@/shared/components/ui/Button';
import { Alert } from '@/shared/components/ui/Alert';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Alert variant="error" title="Terjadi Kesalahan">
                    <p className="mb-4">{error.message || 'Terjadi kesalahan yang tidak terduga'}</p>
                    <Button onClick={reset} variant="danger" size="sm">
                        Coba Lagi
                    </Button>
                </Alert>
            </div>
        </div>
    );
}
import { Spinner } from '@/shared/components/ui/Spinner';

export default function AuthLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Spinner size="lg" />
        </div>
    );
}
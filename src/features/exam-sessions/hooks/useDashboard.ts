import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboard.api';
import { QUERY_KEYS } from '@/shared/constants/query-keys.contsants';

export function useDashboard() {
    return useQuery({
        queryKey: QUERY_KEYS.DASHBOARD,
        queryFn: () => dashboardApi.getDashboardData(),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
import { useQuery } from '@tanstack/react-query';
import { listTyped } from '@/services/crudService';
import type { ReportsOverviewData } from '@/components/report/main/types/ReportsTypes';

// Reusa o mesmo contrato/cachê de /reports/overview (queryKey idêntica => 1 chamada)
export function useTeamService() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['reports', 'overview'],
    queryFn: () => listTyped<ReportsOverviewData>('reports/overview'),
    staleTime: 60 * 1000,
  });

  return {
    team: data?.team ?? [],
    isLoading,
    error: (error as Error | null) ?? null,
    refetch,
  };
}
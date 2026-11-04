import { useQuery } from '@tanstack/react-query';
import { listTyped } from '@/services/crudService';
import type { DistributionItem } from '../types/TaskDistributionTypes';
import type { ReportsOverviewData } from '../../main/types/ReportsTypes';

export function useTaskDistributionService() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['reports', 'overview'],
    queryFn: () => listTyped<ReportsOverviewData>('reports/overview'),
    staleTime: 60 * 1000,
  });

  const items: DistributionItem[] = data?.distribution ?? [];

  return {
    items,
    isLoading,
    error: (error as Error | null) ?? null,
    refetch,
  };
}
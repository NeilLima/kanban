import { useQuery } from '@tanstack/react-query';
import { listTyped } from '@/services/crudService';
import type { TimeSpentItem } from '../types/TimeSpentTypes';
import type { ReportsOverviewData } from '../../main/types/ReportsTypes';

export function useTimeSpentService() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['reports', 'overview'],
    queryFn: () => listTyped<ReportsOverviewData>('reports/overview'),
    staleTime: 60 * 1000,
  });

  const items: TimeSpentItem[] = data?.timeSpent ?? [];
  const maxHours = items.length > 0 ? Math.max(...items.map((i) => i.horas)) : 1;

  return {
    items,
    maxHours,
    isLoading,
    error: (error as Error | null) ?? null,
    refetch,
  };
}
import { useQuery } from '@tanstack/react-query';
import { listTyped } from '@/services/crudService';
import type { ProductivityPoint } from '../types/ProductivityChartTypes';
import type { ReportsOverviewData } from '../../main/types/ReportsTypes';

export function useProductivityChartService() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['reports', 'overview'],
    queryFn: () => listTyped<ReportsOverviewData>('reports/overview'),
    staleTime: 60 * 1000,
  });

  const points: ProductivityPoint[] = (data?.productivity ?? []).map((p) => ({
    label: p.label,
    concluidas: p.concluidas,
    pendentes: p.pendentes,
  }));

  return {
    points,
    isLoading,
    error: (error as Error | null) ?? null,
    refetch,
  };
}
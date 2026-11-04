import { list } from '@/services/crudService';
import { useQuery } from '@tanstack/react-query';
import type {
  ProductivityData,
  RawOverviewProductivity,
} from '../types/ProductivityChartTypes';

// ============================================
// GET /reports/overview -> productivity (7 semanas)
// criadas = tarefas criadas na semana (concluídas + pendentes)
// ============================================

export function useProductivityChartService() {
  const { data, isLoading } = useQuery({
    queryKey: ['overview', 'productivity'],
    queryFn: async () => (await list('reports/overview')) as RawOverviewProductivity | undefined,
    staleTime: 30 * 1000,
  });

  const chartData: ProductivityData[] = (data?.productivity ?? []).map((week) => ({
    day: week.label,
    criadas: week.concluidas + week.pendentes,
    concluidas: week.concluidas,
  }));

  return { data: chartData, isLoading };
}

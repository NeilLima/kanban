import { list } from '@/services/crudService';
import { useQuery } from '@tanstack/react-query';
import type {
  StatCardProps,
  StatCardDefinition,
  RawOverviewReport,
} from '../types/StatCardTypes';

// ============================================
// Cards fixos — valores vêm 100% do backend
// ============================================

const CARDS: StatCardDefinition[] = [
  {
    id: 'concluidas',
    title: 'Concluídas',
    icon: 'bi bi-check-circle',
    color: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    chartColor: '#10b981',
    kpi: 'done',
  },
  {
    id: 'horas',
    title: 'Horas',
    icon: 'bi bi-clock',
    color: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    chartColor: '#3b82f6',
    kpi: 'hours',
  },
  {
    id: 'atrasadas',
    title: 'Atrasadas',
    icon: 'bi bi-exclamation-triangle',
    color: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    chartColor: '#f59e0b',
    kpi: 'overdue',
  },
  {
    id: 'produtividade',
    title: 'Produtividade',
    icon: 'bi bi-graph-up',
    color: '#8b5cf6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    chartColor: '#8b5cf6',
    kpi: 'productivity',
  },
];

export function useStatCardService() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['overview', 'kpis'],
    queryFn: async () => (await list('reports/overview')) as RawOverviewReport | undefined,
    staleTime: 30 * 1000,
  });

  const kpis = data?.kpis;

  const cards: StatCardProps[] = CARDS.map((card) => {
    const kpi = kpis?.[card.kpi];
    const value = kpi?.value ?? 0;
    return {
      id: card.id,
      title: card.title,
      icon: card.icon,
      color: card.color,
      backgroundColor: card.backgroundColor,
      chartColor: card.chartColor,
      value,
      percentage: kpi?.percentage ?? '0%',
      trend: kpi?.trend ?? 'up',
      chartData: [0, 0, 0, 0, 0, 0, value],
    };
  });

  return {
    stats: cards,
    isLoading,
    error: (error as Error | null) ?? null,
    refetch,
  };
}

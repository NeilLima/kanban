import { useQuery } from '@tanstack/react-query';
import { listTyped } from '@/services/crudService';
import type { ReportKpi } from '../types/ReportKpisTypes';
import type { ReportsOverviewData } from '../../main/types/ReportsTypes';

const QUERY_KEY = ['reports', 'overview'];
const OVERVIEW_PATH = 'reports/overview';

function paraKpis(data: ReportsOverviewData): ReportKpi[] {
  const semanas = data.productivity;
  const produtividadeSemanal = semanas.map((p) =>
    Math.round((p.concluidas / Math.max(p.concluidas + p.pendentes, 1)) * 100),
  );

  return [
    {
      id: 'kpi-1',
      title: 'Tarefas Concluídas',
      value: data.kpis.done.value,
      percentage: data.kpis.done.percentage,
      trend: data.kpis.done.trend,
      icon: 'bi bi-check-circle',
      color: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      chartData: semanas.map((p) => p.concluidas),
    },
    {
      id: 'kpi-2',
      title: 'Tempo Gasto (h)',
      value: data.kpis.hours.value,
      suffix: 'h',
      percentage: data.kpis.hours.percentage,
      trend: data.kpis.hours.trend,
      icon: 'bi bi-clock',
      color: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      chartData: semanas.map((p) => p.horas),
    },
    {
      id: 'kpi-3',
      title: 'Produtividade',
      value: data.kpis.productivity.value,
      suffix: '%',
      percentage: data.kpis.productivity.percentage,
      trend: data.kpis.productivity.trend,
      icon: 'bi bi-graph-up',
      color: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      chartData: produtividadeSemanal,
    },
    {
      id: 'kpi-4',
      title: 'Atrasadas',
      value: data.kpis.overdue.value,
      percentage: data.kpis.overdue.percentage,
      trend: data.kpis.overdue.trend,
      icon: 'bi bi-exclamation-triangle',
      color: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      chartData: semanas.map((p) => p.atrasadas),
    },
  ];
}

export function useReportKpisService() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => listTyped<ReportsOverviewData>(OVERVIEW_PATH),
    staleTime: 60 * 1000,
  });

  return {
    kpis: data ? paraKpis(data) : [],
    isLoading,
    error: (error as Error | null) ?? null,
    refetch,
  };
}
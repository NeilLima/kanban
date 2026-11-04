import { useQuery } from '@tanstack/react-query';
import { listTyped } from '@/services/crudService';
import type { TeamMember } from '../types/TeamPerformanceTypes';
import type { ReportsOverviewData } from '../../main/types/ReportsTypes';

export function useTeamPerformanceService() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['reports', 'overview'],
    queryFn: () => listTyped<ReportsOverviewData>('reports/overview'),
    staleTime: 60 * 1000,
  });

  const team: TeamMember[] = (data?.team ?? []).map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    tarefasConcluidas: m.done,
    produtividade: m.produtividade,
    color: m.color,
  }));

  return {
    team,
    isLoading,
    error: (error as Error | null) ?? null,
    refetch,
  };
}
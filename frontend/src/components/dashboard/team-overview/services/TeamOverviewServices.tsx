import { list } from '@/services/crudService';
import { useQuery } from '@tanstack/react-query';
import type { TeamMember, RawOverviewTeam } from '../types/TeamOverviewTypes';

// ============================================
// GET /reports/overview -> team (membros dos projetos)
// ============================================

export function useTeamOverviewService() {
  const { data, isLoading } = useQuery({
    queryKey: ['overview', 'team'],
    queryFn: async () => (await list('reports/overview')) as RawOverviewTeam | undefined,
    staleTime: 30 * 1000,
  });

  const members: TeamMember[] = (data?.team ?? []).map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    email: member.email,
    color: member.color,
    tasksTotal: member.tarefas,
    tasksDone: member.done,
  }));

  return { members, isLoading };
}

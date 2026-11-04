import { list } from '@/services/crudService';
import { useQuery } from '@tanstack/react-query';
import type {
  ProjectInfo,
  TeamMember,
  RawProject,
  RawOverviewHeader,
} from '../types/ProjectHeaderTypes';

const STATUS_LABEL: Record<string, string> = {
  PLANNING: 'Planejamento',
  ACTIVE: 'Ativo',
  PAUSED: 'Pausado',
  COMPLETED: 'Concluído',
  ARCHIVED: 'Arquivado',
};

const TEAM_VISIBLE_COUNT = 3;

// ============================================
// GET /projects (primeiro projeto) + GET /reports/overview (equipe)
// ============================================

export function useProjectHeaderService() {
  const projectsQuery = useQuery({
    queryKey: ['projects', 'header'],
    queryFn: async () => (await list('projects')) as RawProject[] | undefined,
    staleTime: 30 * 1000,
  });

  const overviewQuery = useQuery({
    queryKey: ['overview', 'header'],
    queryFn: async () => (await list('reports/overview')) as RawOverviewHeader | undefined,
    staleTime: 30 * 1000,
  });

  const first = projectsQuery.data?.[0];

  const project: ProjectInfo = first
    ? {
        name: first.name,
        description: first.description || 'Sem descrição.',
        status: STATUS_LABEL[first.status] ?? first.status,
      }
    : { name: 'Nenhum projeto', description: 'Crie um projeto para começar.', status: '—' };

  const team: TeamMember[] = (overviewQuery.data?.team ?? [])
    .slice(0, TEAM_VISIBLE_COUNT)
    .map((member) => ({
      name: member.name,
      color: member.color,
    }));

  return {
    project,
    teamMembers: team,
    teamTotal: overviewQuery.data?.team?.length ?? 0,
    teamVisibleCount: TEAM_VISIBLE_COUNT,
    isLoading: projectsQuery.isLoading || overviewQuery.isLoading,
    error: (projectsQuery.error as Error | null) ?? (overviewQuery.error as Error | null),
  };
}

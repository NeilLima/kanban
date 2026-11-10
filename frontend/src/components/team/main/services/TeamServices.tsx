import { useQuery } from '@tanstack/react-query';
import { list, getById } from '@/services/crudService';
import type { TeamMember, TeamMemberDetail } from '../types/TeamTypes';

const TEAM_RESOURCE = 'team/members';

export function useTeamService() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['team', 'members'],
    queryFn: () => list(TEAM_RESOURCE) as Promise<TeamMember[]>,
    staleTime: 30 * 1000,
  });

  return {
    team: data ?? [],
    isLoading,
    error: (error as Error | null) ?? null,
    refetch,
  };
}

export function useTeamMemberService(memberId: string | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['team', 'member', memberId],
    queryFn: () => getById(TEAM_RESOURCE, memberId as string) as Promise<TeamMemberDetail>,
    enabled: !!memberId,
  });

  return {
    member: data ?? null,
    isLoading,
    error: (error as Error | null) ?? null,
  };
}

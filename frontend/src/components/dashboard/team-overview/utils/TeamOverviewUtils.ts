import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTeamOverviewService } from '../services/TeamOverviewServices';
import type { TeamMember, TeamMemberView } from '../types/TeamOverviewTypes';

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function getWorkloadLabel(tasksTotal: number): { label: string; color: string } {
  if (tasksTotal >= 12) return { label: 'Alta carga', color: '#ef4444' };
  if (tasksTotal >= 8) return { label: 'Carga média', color: '#fbbf24' };
  return { label: 'Disponível', color: '#34d399' };
}

function toView(member: TeamMember): TeamMemberView {
  const workload = getWorkloadLabel(member.tasksTotal);
  return {
    id: member.id,
    name: member.name,
    role: member.role,
    color: member.color,
    initials: getInitials(member.name),
    tasksTotal: member.tasksTotal,
    tasksDone: member.tasksDone,
    workloadLabel: workload.label,
    workloadColor: workload.color,
  };
}

export function useTeamOverview() {
  const router = useRouter();
  const { members, isLoading } = useTeamOverviewService();

  const viewTeam = useCallback(() => {
    router.push('/team');
  }, [router]);

  const state = { members: members.map(toView), loading: isLoading };
  const actions = { viewTeam };
  return { state, actions };
}

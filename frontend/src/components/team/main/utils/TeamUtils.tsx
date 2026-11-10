import { useMemo, useState, useCallback } from 'react';
import { useTeamService, useTeamMemberService } from '../services/TeamServices';
import { useAuth } from '@/contexts/AuthContext';
import type { TeamMemberView, TeamState } from '../types/TeamTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const PAPEL_PADRAO = 'Membro';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useTeam() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useTeamService();
  const { user } = useAuth();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const detail = useTeamMemberService(selectedMemberId);

  const members: TeamMemberView[] = useMemo(
    () =>
      service.team.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role || PAPEL_PADRAO,
        email: m.email,
        color: m.color,
        badge: m.projectsCount > 0 ? `${m.projectsCount} projeto(s)` : (m.role || PAPEL_PADRAO),
        avatarUrl: m.avatar ?? undefined,
        isMe: user ? m.email === user.email : false,
        projectsCount: m.projectsCount,
        tasks: m.tasks,
        done: m.done,
        percent: m.productivity,
      })),
    [service.team, user],
  );

  const state: TeamState = {
    members,
    loading: service.isLoading,
    error: service.error,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const openMember = useCallback((memberId: string) => {
    setSelectedMemberId(memberId);
  }, []);

  const closeMember = useCallback(() => {
    setSelectedMemberId(null);
  }, []);

  const actions = {
    refetch: service.refetch,
    openMember,
    closeMember,
  };

  return {
    state,
    actions,
    selectedMemberId,
    detail: {
      member: detail.member,
      loading: detail.isLoading,
      error: detail.error,
    },
  };
}

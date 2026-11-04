import { useMemo } from 'react';
import { useTeamService } from '../services/TeamServices';
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

  const members: TeamMemberView[] = useMemo(
    () =>
      service.team.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role || PAPEL_PADRAO,
        email: m.email,
        color: m.color,
        badge: m.role || PAPEL_PADRAO,
        avatarUrl: undefined,
        isMe: user ? m.email === user.email : false,
        tasks: m.tarefas,
        done: m.done,
        percent: m.tarefas > 0 ? Math.round((m.done / m.tarefas) * 100) : 0,
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
  const actions = {
    refetch: service.refetch,
  };

  return { state, actions };
}
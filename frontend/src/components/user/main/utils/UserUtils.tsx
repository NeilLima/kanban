import { useMemo } from 'react';
import { useTeamService } from '@/components/team/main/services/TeamServices';
import { useAuth } from '@/contexts/AuthContext';
import type { UserView, UserState, UserActions } from '../types/UserTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const PAPEL_PADRAO = 'Membro';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useUser(userId: string) {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useTeamService();
  const { user: loginUser } = useAuth();

  const membro = service.team.find((m) => m.id === userId);

  const user: UserView | null = useMemo(
    () =>
      membro
        ? {
            id: membro.id,
            name: membro.name,
            email: membro.email,
            role: membro.role || PAPEL_PADRAO,
            avatarUrl: membro.avatar ?? undefined,
            tasksTotal: membro.tasks,
            tasksDone: membro.done,
            tasksPending: membro.tasks - membro.done,
            percent: membro.productivity,
            color: membro.color,
            isMe: loginUser ? membro.email === loginUser.email : false,
          }
        : null,
    [membro, loginUser],
  );

  const state: UserState = {
    user,
    loading: service.isLoading,
    error: service.error,
  };

  const actions: UserActions = {
    refetch: service.refetch,
  };

  return { state, actions };
}

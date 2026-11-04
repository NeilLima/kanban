import { useCallback } from 'react';
import { useProjectHeaderService } from '../services/ProjectHeaderServices';
import type {
  ProjectHeaderState,
  ProjectHeaderActions,
  TeamMember,
  TeamMemberView,
} from '../types/ProjectHeaderTypes';

function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

function toView(member: TeamMember): TeamMemberView {
  return {
    name: member.name,
    avatar: member.avatar,
    color: member.color,
    initial: getInitial(member.name),
  };
}

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useProjectHeader() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useProjectHeaderService();

  const state: ProjectHeaderState = {
    project: service.project || { name: '', description: '', status: '' },
    teamMembers: (service.teamMembers || []).map(toView),
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleShare = useCallback(() => {
    // Lógica de compartilhar
  }, []);

  const handleMoreOptions = useCallback(() => {
    // Lógica de mais opções
  }, []);

  const actions: ProjectHeaderActions = {
    handleShare,
    handleMoreOptions,
  };

  const extraCount = Math.max(service.teamTotal - service.teamVisibleCount, 0);

  return { state, actions, extraCount };
}
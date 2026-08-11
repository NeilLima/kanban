import { useCallback } from 'react';
import { useProjectHeaderService } from '../services/ProjectHeaderServices';
import type { ProjectHeaderState, ProjectHeaderActions } from '../types/ProjectHeaderTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const EXTRA_MEMBERS_COUNT = 5;

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
    teamMembers: service.teamMembers || [],
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

  return { state, actions, extraCount: EXTRA_MEMBERS_COUNT };
}
import { useTeamPerformanceService } from '../services/TeamPerformanceServices';
import type { TeamPerformanceState } from '../types/TeamPerformanceTypes';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useTeamPerformance() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useTeamPerformanceService();

  const state: TeamPerformanceState = {
    team: service.team || [],
    loading: service.isLoading,
    error: service.error || null,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const actions = {
    refetch: service.refetch,
  };

  return { state, actions };
}
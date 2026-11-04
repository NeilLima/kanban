import { useTaskDistributionService } from '../services/TaskDistributionServices';
import type { TaskDistributionState } from '../types/TaskDistributionTypes';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useTaskDistribution() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useTaskDistributionService();

  const state: TaskDistributionState = {
    items: service.items || [],
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
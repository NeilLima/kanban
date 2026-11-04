import { useTimeSpentService } from '../services/TimeSpentServices';
import type { TimeSpentState } from '../types/TimeSpentTypes';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useTimeSpent() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useTimeSpentService();

  const state: TimeSpentState = {
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

  return { state, actions, maxHours: service.maxHours };
}
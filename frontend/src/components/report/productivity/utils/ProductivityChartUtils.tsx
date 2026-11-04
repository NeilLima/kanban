import { useProductivityChartService } from '../services/ProductivityChartServices';
import type { ProductivityChartState } from '../types/ProductivityChartTypes';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useProductivityChart() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useProductivityChartService();

  const state: ProductivityChartState = {
    points: service.points || [],
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
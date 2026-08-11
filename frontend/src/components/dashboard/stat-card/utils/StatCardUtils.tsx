import { useCallback } from 'react';
import { useStatCardService } from '../services/StatCardServices';
import type { StatCardState, StatCardActions } from '../types/StatCardTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const CHART_WIDTH = 80;
const CHART_HEIGHT = 40;
const CHART_PADDING = 2;

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useStatCard() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useStatCardService();

  const state: StatCardState = {
    stats: service.stats || [],
    loading: service.isLoading,
    error: service.error || null,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleClick = useCallback((_id: string) => {
    // Lógica de clique do card
  }, []);

  const actions: StatCardActions = {
    handleClick,
    refetch: service.refetch,
  };

  return { state, actions };
}

export function generateChartPath(data: number[]): string {
  if (data.length === 0) return '';

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * CHART_WIDTH;
    const y = CHART_HEIGHT - CHART_PADDING - ((value - min) / range) * (CHART_HEIGHT - 2 * CHART_PADDING);
    return `${x},${y}`;
  });

  return `M ${points.join(' L ')}`;
}

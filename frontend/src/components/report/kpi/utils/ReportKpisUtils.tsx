import { useReportKpisService } from '../services/ReportKpisServices';
import type { ReportKpisState } from '../types/ReportKpisTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const CHART_WIDTH = 80;
const CHART_HEIGHT = 40;
const CHART_PADDING = 2;

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useReportKpis() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useReportKpisService();

  const state: ReportKpisState = {
    kpis: service.kpis || [],
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

// Gera o caminho SVG do minigráfico
export function generateChartPath(data: number[]): string {
  if (data.length === 0) return '';

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * CHART_WIDTH;
    const y =
      CHART_HEIGHT -
      CHART_PADDING -
      ((value - min) / range) * (CHART_HEIGHT - 2 * CHART_PADDING);
    return `${x},${y}`;
  });

  return `M ${points.join(' L ')}`;
}
import type {
  ProductivityData,
  ProductivityTotals,
  ProductivityChartTooltipProps,
} from '../types/ProductivityChartTypes';
import { useProductivityChartService } from '../services/ProductivityChartServices';

export const CHART_MARGIN = { top: 5, right: 5, left: -20, bottom: 0 };

export function useProductivityChart() {
  const { data, isLoading } = useProductivityChartService();
  const totals: ProductivityTotals = {
    criadas: sumField(data, 'criadas'),
    concluidas: sumField(data, 'concluidas'),
  };
  const state = { data, totals, loading: isLoading };
  const actions = { refresh: () => {} };
  return { state, actions };
}

export function getTotal(data: ProductivityData[], key: 'criadas' | 'concluidas'): number {
  return data.reduce((acc, item) => acc + item[key], 0);
}

export function isTooltipVisible(active?: boolean, payload?: ProductivityChartTooltipProps['payload']): boolean {
  return Boolean(active && payload?.length);
}

function sumField(data: ProductivityData[], key: 'criadas' | 'concluidas'): number {
  return data.reduce((acc, item) => acc + item[key], 0);
}

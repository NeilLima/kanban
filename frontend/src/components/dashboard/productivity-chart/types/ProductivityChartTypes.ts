export interface ProductivityData {
  day: string;
  criadas: number;
  concluidas: number;
}

export interface ProductivityChartState {
  data: ProductivityData[];
  totals: ProductivityTotals;
  loading: boolean;
}

export interface ProductivityTotals {
  criadas: number;
  concluidas: number;
}

export interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

export interface ProductivityChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

export interface ProductivityChartActions {
  refresh: () => void;
}

// ============================================
// Contrato cru do backend — GET /reports/overview
// ============================================

export interface RawProductivityWeek {
  label: string;
  concluidas: number;
  pendentes: number;
  horas: number;
  atrasadas: number;
}

export interface RawOverviewProductivity {
  productivity: RawProductivityWeek[];
}

export interface StatCardProps {
  id: string;
  title: string;
  value: number;
  percentage: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
  backgroundColor: string;
  chartData: number[];
  chartColor: string;
}

export interface StatCardCompProps {
  stat: StatCardProps;
}

export interface StatCardState {
  stats: StatCardProps[];
  loading: boolean;
  error: Error | null;
}

export interface StatCardActions {
  handleClick: (id: string) => void;
  refetch: () => void;
}

// ============================================
// Definição dos cards fixos (visual)
// ============================================

export type StatCardKpiKey = 'done' | 'hours' | 'overdue' | 'productivity';

export interface StatCardDefinition {
  id: string;
  title: string;
  icon: string;
  color: string;
  backgroundColor: string;
  chartColor: string;
  kpi: StatCardKpiKey;
}

// ============================================
// Contrato cru do backend — GET /reports/overview
// ============================================

export interface RawKpi {
  value: number;
  percentage: string;
  trend: 'up' | 'down';
}

export interface RawOverviewKpis {
  done: RawKpi;
  hours: RawKpi;
  productivity: RawKpi;
  overdue: RawKpi;
}

export interface RawOverviewReport {
  kpis: RawOverviewKpis;
}

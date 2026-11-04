export interface ReportKpi {
  id: string;
  title: string;
  value: number;
  suffix?: string;
  percentage: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
  backgroundColor: string;
  chartData: number[];
}

export interface ReportKpisState {
  kpis: ReportKpi[];
  loading: boolean;
  error: Error | null;
}
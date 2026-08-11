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

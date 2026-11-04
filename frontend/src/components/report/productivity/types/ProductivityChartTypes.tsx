export interface ProductivityPoint {
  label: string;
  concluidas: number;
  pendentes: number;
}

export interface ProductivityChartState {
  points: ProductivityPoint[];
  loading: boolean;
  error: Error | null;
}
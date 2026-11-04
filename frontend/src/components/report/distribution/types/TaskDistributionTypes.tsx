export interface DistributionItem {
  name: string;
  value: number;
  color: string;
}

export interface TaskDistributionState {
  items: DistributionItem[];
  loading: boolean;
  error: Error | null;
}
export interface TimeSpentItem {
  project: string;
  tarefas: number;
  horas: number;
  color: string;
}

export interface TimeSpentState {
  items: TimeSpentItem[];
  loading: boolean;
  error: Error | null;
}
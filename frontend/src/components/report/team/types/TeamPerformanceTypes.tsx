export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tarefasConcluidas: number;
  produtividade: number;
  color: string;
}

export interface TeamPerformanceState {
  team: TeamMember[];
  loading: boolean;
  error: Error | null;
}
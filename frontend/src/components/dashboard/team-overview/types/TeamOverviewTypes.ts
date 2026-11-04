export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  color: string;
  tasksTotal: number;
  tasksDone: number;
}

export interface TeamMemberView {
  id: string;
  name: string;
  role: string;
  color: string;
  initials: string;
  tasksTotal: number;
  tasksDone: number;
  workloadLabel: string;
  workloadColor: string;
}

export interface TeamOverviewState {
  members: TeamMemberView[];
  loading: boolean;
}

export interface TeamOverviewActions {
  viewTeam: () => void;
}

// ============================================
// Contrato cru do backend — GET /reports/overview
// ============================================

export interface RawTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  tarefas: number;
  done: number;
  produtividade: number;
  color: string;
}

export interface RawOverviewTeam {
  team: RawTeamMember[];
}

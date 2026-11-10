// Membro da equipe retornado por GET /team/members
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  roleKey: string;
  projectsCount: number;
  tasks: number;
  done: number;
  productivity: number;
  color: string;
}

// Detalhe retornado por GET /team/members/:userId
export interface TeamMemberProject {
  id: string;
  name: string;
  color: string;
  isOwner: boolean;
  role: string;
}

export interface TeamMemberTask {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string | null;
  project: { id: string; name: string; color: string };
}

export interface TeamMemberDetail {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  color: string;
  projects: TeamMemberProject[];
  stats: {
    total: number;
    done: number;
    productivity: number;
    overdue: number;
    spentHours: number;
    byStatus: Record<string, number>;
  };
  recentTasks: TeamMemberTask[];
}

// Item exibido no card de membro da equipe (formato pronto para render)
export interface TeamMemberView {
  id: string;
  name: string;
  role: string;
  email: string;
  color: string;
  badge: string;
  avatarUrl?: string;
  isMe: boolean;
  projectsCount: number;
  tasks: number;
  done: number;
  percent: number;
}

export interface TeamState {
  members: TeamMemberView[];
  loading: boolean;
  error: Error | null;
}

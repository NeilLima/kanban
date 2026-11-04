import type { ReportsTeamMember } from '@/components/report/main/types/ReportsTypes';

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
  tasks: number;
  done: number;
  percent: number;
}

export interface TeamState {
  members: TeamMemberView[];
  loading: boolean;
  error: Error | null;
}

// Cru da API (reuso do contrato de /reports/overview)
export type { ReportsTeamMember };

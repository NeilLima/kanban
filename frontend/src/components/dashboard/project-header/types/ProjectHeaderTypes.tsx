export type ProjectHeaderTypes = object;

export interface ProjectInfo {
  name: string;
  description: string;
  status: string;
}

export interface TeamMember {
  name: string;
  avatar?: string;
  color: string;
}

export interface TeamMemberView {
  name: string;
  avatar?: string;
  color: string;
  initial: string;
}

export interface ProjectHeaderState {
  project: ProjectInfo;
  teamMembers: TeamMemberView[];
}

export interface ProjectHeaderActions {
  handleShare: () => void;
  handleMoreOptions: () => void;
}

// ============================================
// Contrato cru do backend — GET /projects + GET /reports/overview
// ============================================

export interface RawProject {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  color?: string;
}

export interface RawTeamMember {
  name: string;
  color: string;
}

export interface RawOverviewHeader {
  team: RawTeamMember[];
}
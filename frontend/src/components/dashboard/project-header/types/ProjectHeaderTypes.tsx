export type ProjectHeaderTypes = object;

export interface ProjectInfo {
  name: string;
  description: string;
  status: string;
}

export interface TeamMember {
  name: string;
  avatar: string;
  color: string;
}

export interface ProjectHeaderState {
  project: ProjectInfo;
  teamMembers: TeamMember[];
}

export interface ProjectHeaderActions {
  handleShare: () => void;
  handleMoreOptions: () => void;
}
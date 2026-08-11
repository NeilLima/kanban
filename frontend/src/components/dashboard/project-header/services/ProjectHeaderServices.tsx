import type { ProjectInfo, TeamMember } from '../types/ProjectHeaderTypes';

// Dados mock
const MOCK_PROJECT: ProjectInfo = {
  name: 'Plataforma Nexus',
  description: 'Sistema completo de gerenciamento de projetos com Kanban intuitivo e colaborativo.',
  status: 'Em andamento',
};

const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { name: 'L', avatar: 'https://i.pravatar.cc/150?img=11', color: '#3b82f6' },
  { name: 'M', avatar: 'https://i.pravatar.cc/150?img=12', color: '#10b981' },
  { name: 'J', avatar: 'https://i.pravatar.cc/150?img=13', color: '#f59e0b' },
];

export function useProjectHeaderService() {
  return {
    project: MOCK_PROJECT,
    teamMembers: MOCK_TEAM_MEMBERS,
    isLoading: false,
    error: null,
  };
}
import type { CreateProjectData, Project } from '@/components/project/main/types/ProjectsTypes';

export interface ProjectModalProps {
  onClose: () => void;
  onCreate: (data: CreateProjectData) => void;
  /** Quando presente, o modal entra no modo edição (regra 8.1) */
  project?: Project;
  onUpdate?: (id: string, data: CreateProjectData) => void;
}

export interface ProjectModalState {
  name: string;
  description: string;
  color: string;
}

export const PROJECT_COLOR_OPTIONS = [
  '#3b82f6',
  '#8b5cf6',
  '#10b981',
  '#f59e0b',
  '#14b8a6',
  '#ef4444',
];
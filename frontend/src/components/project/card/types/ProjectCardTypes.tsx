import type { Project } from '@/components/project/main/types/ProjectsTypes';

export interface ProjectCardProps {
  project: Project;
  onToggleFavorite: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
  onEdit: (id: string) => void;
}
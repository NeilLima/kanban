export interface ProjectMember {
  id: string;
  name: string;
  color?: string;
  userId?: string;
  role?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color?: string;
  isFavorite: boolean;
  isArchived: boolean;
  progress: number;
  members: ProjectMember[];
  tasksTotal: number;
  tasksDone: number;
  dueDate?: string;
  createdAt: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  color?: string;
}

export interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: Error | null;
  showCreate: boolean;
  /** Projeto em modo edição (null = fechado) */
  editingProject: Project | null;
}

export interface ProjectsActions {
  toggleFavorite: (id: string) => void;
  archiveProject: (id: string) => void;
  deleteProject: (id: string) => void;
  addProject: (data: CreateProjectData) => void;
  openCreate: () => void;
  closeCreate: () => void;
  openEdit: (id: string) => void;
  closeEdit: () => void;
  updateProject: (id: string, data: CreateProjectData) => void;
}

// Contrato cru da API de projetos (backend Nest/Prisma)
export interface ApiProject {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  tasksTotal: number;
  tasksDone: number;
  progress: number;
  members: { id: string; userId: string; role: string; name: string }[];
}
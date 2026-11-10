import type { Project } from '@/components/project/main/types/ProjectsTypes';
import type { CreateProjectData } from '@/components/project/main/types/ProjectsTypes';
import type { UserOption } from '@/components/task/main/types/TaskTypes';

export interface ProjectDetailTypes {
  projectId: string;
}

export interface ProjectDetailState {
  project: Project | null;
  loading: boolean;
  isAdmin: boolean;
  tasksTotal: number;
  tasksDone: number;
  progress: number;
  showEdit: boolean;
  showAddTask: boolean;
  showAddMember: boolean;
  showRegisterUser: boolean;
  registerForm: { name: string; email: string; password: string };
  registering: boolean;
  registerError: string;
  users: UserOption[];
  membersCount: number;
}

export interface ProjectDetailActions {
  handleVoltar: () => void;
  handleEditar: () => void;
  handleFecharEdicao: () => void;
  handleExcluir: () => void;
  updateProject: (id: string, data: CreateProjectData) => void;
  handleAddTask: () => void;
  handleCloseAddTask: () => void;
  handleAddMember: () => void;
  handleCloseAddMember: () => void;
  handleToggleRegisterUser: () => void;
  handleRegisterFormChange: (field: 'name' | 'email' | 'password', value: string) => void;
  handleRegisterSubmit: (projectId: string) => void;
  refetch: () => void;
}

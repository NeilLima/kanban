export interface TaskAssignee {
  name: string;
  email?: string;
  color?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'baixa' | 'media' | 'alta' | 'urgente';
  color: string;
  category?: string;
  assigneeId?: string;
  projectId: string;
  columnId: string;
  startDate?: string;
  dueDate?: string;
  estimatedTime?: number;
  spentTime?: number;
  tags?: string[];
  assignees?: TaskAssignee[];
  comments?: number;
  attachments?: number;
  progress?: number;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

// Contrato cru da API para o detalhe da tarefa (backend Nest/Prisma)
export interface ApiTaskDetail {
  id: string;
  title: string;
  description?: string | null;
  status?: string;
  priority?: string;
  color?: string | null;
  category?: string | null;
  dueDate?: string | null;
  progress?: number;
  projectId?: string;
  columnId?: string;
  createdAt?: string;
  updatedAt?: string;
  assignees?: {
    user?: { email?: string; profile?: { firstName?: string; lastName?: string } | null };
  }[];
}

export interface DetailTypes {
  taskId: string;
  show: boolean;
  onHide: () => void;
}

export interface DetailState {
  task: Task | null;
  loading: boolean;
  titulo: string;
  descricao: string;
  status: string;
}

export interface DetailActions {
  handleSaveTask: () => void;
  handleDeleteTask: () => void;
  handleStatusChange: (value: string) => void;
  handleTituloChange: (value: string) => void;
  handleDescricaoChange: (value: string) => void;
}
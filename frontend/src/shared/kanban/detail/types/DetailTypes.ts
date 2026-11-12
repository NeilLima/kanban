export interface TaskAssignee {
  name: string;
  email?: string;
  color?: string;
}

export interface TaskAttachment {
  id: string;
  fileName: string;
  mimeType: string;
  size: number;
  uploadedById?: string;
  uploadedByName?: string;
  createdAt?: string;
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
  labels?: { id: string; name: string; color?: string }[];
  assignees?: TaskAssignee[];
  comments?: number;
  attachments?: TaskAttachment[];
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
  attachments?: {
    id: string;
    fileName: string;
    mimeType: string;
    size: number;
    uploadedById?: string;
    createdAt?: string;
    uploadedBy?: {
      email?: string;
      profile?: { firstName?: string; lastName?: string } | null;
    } | null;
  }[];
  checklistItems?: { id: string; title: string; isDone: boolean; taskId: string }[];
  labels?: { label?: { id: string; name: string; color?: string } | null }[];
  comments?: {
    id: string;
    content: string;
    taskId: string;
    authorId?: string;
    parentId?: string | null;
    createdAt?: string;
    updatedAt?: string;
    author?: { email?: string; profile?: { firstName?: string; lastName?: string } | null } | null;
    replies?: {
      id: string;
      content: string;
      createdAt?: string;
      author?: { email?: string; profile?: { firstName?: string; lastName?: string } | null } | null;
    }[];
  }[];
  history?: {
    id: string;
    field: string;
    oldValue?: string | null;
    newValue?: string | null;
    createdAt?: string;
    user?: { email?: string; profile?: { firstName?: string; lastName?: string } | null } | null;
  }[];
}

export interface Checklist {
  id: string;
  title: string;
  completed: boolean;
  taskId: string;
}

export interface Comment {
  id: string;
  content: string;
  taskId: string;
  userId?: string;
  parentId?: string;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  replies?: Comment[];
}

export interface HistoryEntry {
  id: string;
  field: string;
  oldValue?: string | null;
  newValue?: string | null;
  createdAt?: string;
  userName?: string;
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
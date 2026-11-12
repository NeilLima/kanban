export interface TaskTypes {
  openCreate: () => void;
  closeCreate: () => void;
  showCreate: boolean;
}

export interface TaskCreateData {
  title: string;
  description?: string;
  columnId?: string;
  status: string;
  priority: string;
  dueDate?: string;
  assigneeIds?: string[];
  projectId?: string;
  /** Nomes das etiquetas digitados (vírgula) — backend resolve/cria Label */
  tagNames?: string[];
  category?: string;
  color?: string;
  estimatedTime?: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  projectId: string;
  category?: string;
  color?: string;
  dueDate?: string;
  estimatedTime?: number;
  status: string;
  priority: string;
  progress: number;
  order: number;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  assignees: { id: string; userId: string; name: string }[];
  labels: { id: string; labelId: string; name: string; color: string }[];
}

export interface ProjectOption {
  id: string;
  name: string;
}

export interface UserOption {
  id: string;
  name: string;
  email?: string;
}

export interface TaskCreateState {
  title: string;
  description: string;
  columnId: string;
  status: string;
  priority: string;
  dueDate: string;
  assigneeId: string;
  tags: string;
  projectId: string;
  isSaving: boolean;
  projects: ProjectOption[];
  users: UserOption[];
}

export interface TaskCreateActions {
  handleTitleChange: (value: string) => void;
  handleDescriptionChange: (value: string) => void;
  handleColumnChange: (value: string) => void;
  handleStatusChange: (value: string) => void;
  handlePriorityChange: (value: string) => void;
  handleDueDateChange: (value: string) => void;
  handleAssigneeIdChange: (value: string) => void;
  handleTagsChange: (value: string) => void;
  handleProjectIdChange: (value: string) => void;
  handleSubmit: () => void;
}

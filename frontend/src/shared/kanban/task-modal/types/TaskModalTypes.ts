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
  userId: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  taskId: string;
  createdAt: string;
}

export interface TaskModalTypes {
  taskId: string;
  show: boolean;
  onHide: () => void;
}

export interface TaskModalState {
  task: Task | null;
  checklists: Checklist[];
  comments: Comment[];
  attachments: Attachment[];
  activeTab: string;
  loading: boolean;
}

export interface TaskModalActions {
  handleSaveTask: () => void;
  handleDeleteTask: () => void;
  handleAddChecklist: () => void;
  handleAddComment: (content: string) => void;
  handleTabChange: (tab: string) => void;
}
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

export interface CardTypes {
  task: Task;
  onEdit?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

export interface CardState {
  isDragging: boolean;
  priorityLabel: string;
  isOverdue: boolean;
  formattedDate: string;
}

export const TAG_COLORS: Record<string, string> = {
  'Design': '#3b82f6',
  'Frontend': '#8b5cf6',
  'Backend': '#10b981',
  'UI/UX': '#f59e0b',
  'Segurança': '#ef4444',
  'API': '#06b6d4',
  'Kanban': '#8b5cf6',
  'Testes': '#f97316',
  'QA': '#f97316',
  'DevOps': '#14b8a6',
  'Infra': '#14b8a6',
  'Docs': '#64748b',
};
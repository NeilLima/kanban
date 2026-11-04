import type { DragEndEvent } from '@dnd-kit/core';

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

export interface Column {
  id: string;
  name: string;
  color: string;
  order: number;
  projectId: string;
}

export interface BoardTypes {
  projectId: string;
}

export interface BoardState {
  columns: Column[];
  tasks: Task[];
  loading: boolean;
}

export interface BoardActions {
  handleAddColumn: () => void;
  handleEditColumn: (columnId: string) => void;
  handleDeleteColumn: (columnId: string) => void;
  handleTaskClick: (taskId: string) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

// ============================================
// Contratos cruos da API (backend Nest/Prisma)
// ============================================

export interface RawColumn {
  id: string;
  name: string;
  color: string;
  order: number;
  projectId: string;
}

export interface RawAssigneeUser {
  email?: string;
  profile?: { firstName?: string; lastName?: string } | null;
}

export interface RawTask {
  id: string;
  title: string;
  description?: string | null;
  columnId: string;
  projectId: string;
  status?: string;
  priority?: string | null;
  color?: string | null;
  category?: string | null;
  progress?: number | null;
  order?: number | null;
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
  labels?: { label: { name: string } }[];
  assignees?: { user?: RawAssigneeUser }[];
  _count?: { comments?: number; attachments?: number };
}

export interface RawBoardData {
  columns: RawColumn[];
  tasks: RawTask[];
}

export interface RawProjectRef {
  id: string;
}
// ============================================
// TIPOS GLOBAIS
// ============================================

// Re-exporta tipos de autenticação
export type { User, AuthContextType } from '@/contexts/types/AuthTypes';

// Re-exporta tipos de tema
export type { AppTheme, ThemeMode, ThemeContextType } from '@/contexts/types/ThemeTypes';

// ============================================
// TIPOS DE API
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ============================================
// TIPOS DE MODELOS
// ============================================

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'archived';
  color?: string;
  icon?: string;
  isFavorite?: boolean;
  isArchived?: boolean;
  ownerId: string;
  members?: ProjectMember[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  color?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
}

export interface Column {
  id: string;
  name: string;
  color: string;
  order: number;
  projectId: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
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

export interface TaskAssignee {
  name: string;
  email?: string;
  color?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  likes?: number;
  replies?: Comment[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

// ============================================
// TIPOS DE HOOKS
// ============================================

export interface UseQueryOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

export interface UseMutationOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}
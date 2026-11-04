import { list, create } from '@/services/crudService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import type { Task, TaskCreateData } from '../types/TaskTypes';

function apiToTask(t: any): Task {
  return {
    id: t.id,
    title: t.title,
    description: t.description,
    columnId: t.columnId,
    projectId: t.projectId,
    category: t.category,
    color: t.color,
    dueDate: t.dueDate,
    estimatedTime: t.estimatedTime,
    status: t.status,
    priority: t.priority,
    progress: t.progress,
    order: t.order,
    creatorId: t.creatorId,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
    assignees: (t.assignees || []).map((a: any) => ({
      id: a.id,
      userId: a.userId,
      name: a.user?.name || a.name,
    })),
    labels: (t.labels || []).map((l: any) => ({
      id: l.id,
      labelId: l.labelId,
      name: l.label?.name || l.name,
      color: l.label?.color || l.color,
    })),
  };
}

export function useTasksService(columnId: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tasks', columnId],
    queryFn: () => list(`tasks?columnId=${columnId}`),
    enabled: !!user && !!columnId,
    staleTime: 30 * 1000,
  });

  const tasks = ((data as Task[]) || []).map(apiToTask);

  const criarMutation = useMutation({
    mutationFn: (payload: TaskCreateData) => create('tasks', payload as unknown as Record<string, unknown>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['kanban'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    tasks,
    isLoading,
    error: (error as Error | null) ?? null,
    refetch,
    criar: criarMutation.mutateAsync,
    isSaving: criarMutation.isPending,
  };
}

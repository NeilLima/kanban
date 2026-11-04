'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, remove, update, patchAction } from '@/services/crudService';
import type { Task, Column, RawColumn, RawTask, RawBoardData, RawProjectRef } from '../types/BoardTypes';

// ============================================
// MAPEAMENTO Backend (Prisma) -> Frontend
// ============================================

const STATUS_MAP: Record<string, string> = {
  TODO: 'A Fazer',
  IN_PROGRESS: 'Em Desenvolvimento',
  REVIEW: 'Em Revisão',
  DONE: 'Concluído',
};

const EMPTY_BOARD: RawBoardData = { columns: [], tasks: [] };
const PROJECTS_RESOURCE = 'projects';
const TASKS_RESOURCE = 'tasks';

function mapColumn(c: RawColumn): Column {
  return { id: c.id, name: c.name, color: c.color, order: c.order, projectId: c.projectId };
}

function mapTask(t: RawTask): Task {
  return {
    id: t.id,
    title: t.title,
    description: t.description ?? undefined,
    columnId: t.columnId,
    projectId: t.projectId,
    priority: (t.priority ?? 'MEDIUM').toLowerCase() as Task['priority'],
    status: STATUS_MAP[t.status ?? ''] ?? t.status ?? 'TODO',
    color: t.color ?? '#3b82f6',
    category: t.category ?? undefined,
    tags: t.labels?.map((l) => l.label?.name).filter((n): n is string => Boolean(n)),
    assignees: t.assignees?.map((a) => ({
      name:
        [a.user?.profile?.firstName, a.user?.profile?.lastName].filter(Boolean).join(' ') ||
        a.user?.email ||
        'Usuário',
      email: a.user?.email,
      color: '#3b82f6',
    })),
    comments: t._count?.comments ?? 0,
    attachments: t._count?.attachments ?? 0,
    progress: t.progress ?? 0,
    order: t.order ?? 0,
    dueDate: t.dueDate ? String(t.dueDate).slice(0, 10) : undefined,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
}

// ============================================
// HOOK: dados do board via crudService (fallback: vazio)
// ============================================

export function useBoardService(projectId: string) {
  const queryClient = useQueryClient();

  function invalidarBoard() {
    queryClient.invalidateQueries({ queryKey: ['board'] });
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  }

  // Busca o board real; se 'default-project', usa o primeiro projeto do usuário.
  const boardQuery = useQuery<RawBoardData>({
    queryKey: ['board', projectId],
    queryFn: async () => {
      let id = projectId;
      if (id === 'default-project') {
        const projects = (await list(PROJECTS_RESOURCE)) as RawProjectRef[] | undefined;
        const first = projects?.[0];
        if (!first) return EMPTY_BOARD;
        id = first.id;
      }

      const board = (await list(`${PROJECTS_RESOURCE}/${id}/board`)) as RawBoardData | undefined;
      return {
        columns: board?.columns ?? [],
        tasks: board?.tasks ?? [],
      };
    },
    enabled: !!projectId,
    staleTime: 10 * 1000,
  });

  const addColumnMutation = useMutation({
    mutationFn: (data: { name: string; color: string }) =>
      create<RawColumn>(`${PROJECTS_RESOURCE}/${projectId}/columns`, data),
    onSuccess: invalidarBoard,
  });

  const deleteColumnMutation = useMutation({
    mutationFn: (columnId: string) => remove(`${PROJECTS_RESOURCE}/columns`, columnId),
    onSuccess: invalidarBoard,
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Record<string, unknown> }) =>
      update<RawTask>(TASKS_RESOURCE, taskId, data),
    onSuccess: invalidarBoard,
  });

  const moveTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      columnId,
      order,
    }: {
      taskId: string;
      columnId: string;
      order?: number;
    }) => patchAction<RawTask>(TASKS_RESOURCE, taskId, 'move', { columnId, order }),
    onSuccess: invalidarBoard,
  });

  const addTaskMutation = useMutation({
    mutationFn: (data: { title: string; columnId: string }) => create<RawTask>(TASKS_RESOURCE, data),
    onSuccess: invalidarBoard,
  });

  const columns = (boardQuery.data?.columns ?? []).map(mapColumn);
  const tasks = (boardQuery.data?.tasks ?? []).map(mapTask);

  const addColumn = (name: string, color: string) => addColumnMutation.mutateAsync({ name, color });
  const deleteColumn = (columnId: string) => deleteColumnMutation.mutateAsync(columnId);
  const updateTask = (taskId: string, data: Record<string, unknown>) =>
    updateTaskMutation.mutateAsync({ taskId, data });
  const moveTask = (taskId: string, columnId: string, order?: number) =>
    moveTaskMutation.mutateAsync({ taskId, columnId, order });
  const addTask = (title: string, columnId: string) =>
    addTaskMutation.mutateAsync({ title, columnId });

  return {
    columns,
    tasks,
    loading: boardQuery.isLoading,
    addColumn,
    deleteColumn,
    updateTask,
    moveTask,
    addTask,
  };
}

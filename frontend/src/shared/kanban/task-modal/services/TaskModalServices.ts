import { getById, list, create, update, remove } from '@/services/crudService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useTaskModalService(taskId: string) {
  const queryClient = useQueryClient();

  const { data: task, isLoading: taskLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getById('tasks', taskId),
    enabled: !!taskId,
  });

  const { data: checklists } = useQuery({
    queryKey: ['checklists', taskId],
    queryFn: () => list('checklists', { taskId }),
    enabled: !!taskId,
  });

  const { data: comments } = useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => list('comments', { taskId }),
    enabled: !!taskId,
  });

  const { data: attachments } = useQuery({
    queryKey: ['attachments', taskId],
    queryFn: () => list('attachments', { taskId }),
    enabled: !!taskId,
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => update('tasks', taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: () => remove('tasks', taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const addChecklistMutation = useMutation({
    mutationFn: (data: { title: string; taskId: string }) => create('checklists', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists', taskId] });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (data: { content: string; taskId: string }) => create('comments', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });

  return {
    task: task ?? null,
    checklists: checklists ?? [],
    comments: comments ?? [],
    attachments: attachments ?? [],
    loading: taskLoading,
    updateTask: (data: Record<string, unknown>) => updateTaskMutation.mutate(data),
    deleteTask: () => deleteTaskMutation.mutate(),
    addChecklist: (title: string) => addChecklistMutation.mutate({ title, taskId }),
    addComment: (content: string) => addCommentMutation.mutate({ content, taskId }),
  };
}
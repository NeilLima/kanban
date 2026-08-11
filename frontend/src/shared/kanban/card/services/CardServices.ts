import { update, remove } from '@/services/crudService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCardService(taskId: string, projectId: string) {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: () => remove('tasks', taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => update('tasks', taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });

  return {
    deleteTask: () => deleteTaskMutation.mutate(),
    updateTask: (data: Record<string, unknown>) => updateTaskMutation.mutate(data),
  };
}
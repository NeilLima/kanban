import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/contexts/AuthContext';
import type { Project, CreateProjectData, ProjectMember, ApiProject } from '../types/ProjectsTypes';

function apiToProject(p: ApiProject): Project {
  const members: ProjectMember[] = (p.members || []).map((m) => ({
    id: m.id,
    name: m.name,
    color: '#3b82f6',
    userId: m.userId,
    role: m.role,
  }));
  return {
    id: p.id,
    name: p.name,
    description: p.description || undefined,
    color: p.color || '#3b82f6',
    isFavorite: p.isFavorite,
    isArchived: p.isArchived,
    progress: p.progress,
    members,
    tasksTotal: p.tasksTotal,
    tasksDone: p.tasksDone,
    createdAt: p.createdAt,
  };
}

export function useProjectsService() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['projects', user?.id],
    queryFn: () => list('projects'),
    enabled: !!user,
    staleTime: 30 * 1000,
  });

  function invalidar() {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    queryClient.invalidateQueries({ queryKey: ['kanban'] });
  }

  const criarMutation = useMutation({
    mutationFn: (payload: CreateProjectData) =>
      create('projects', {
        name: payload.name,
        description: payload.description || undefined,
        color: payload.color || undefined,
      }),
    onSuccess: invalidar,
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      update('projects', id, data),
    onSuccess: invalidar,
  });

  const removerMutation = useMutation({
    mutationFn: (id: string) => remove('projects', id),
    onSuccess: invalidar,
  });

  const projects = ((data as ApiProject[]) || []).map(apiToProject);

  return {
    projects,
    isLoading,
    error: (error as Error | null) ?? null,
    refetch,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    remover: removerMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}
import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';

export function useTaskSupportData() {
  const projectsQuery = useQuery({
    queryKey: ['task-support-projects'],
    queryFn: async () => {
      const data = (await list('projects')) as Array<{ id: string; name: string }> | undefined;
      return (data ?? []).map((p) => ({ id: p.id, name: p.name }));
    },
  });

  const usersQuery = useQuery({
    queryKey: ['task-support-users'],
    queryFn: async () => {
      const data = (await list('users')) as Array<{ id: string; email?: string; profile?: { firstName?: string; lastName?: string } | null }> | undefined;
      return (data ?? []).map((u) => ({
        id: u.id,
        name: `${u.profile?.firstName ?? ''} ${u.profile?.lastName ?? ''}`.trim() || u.email || 'Usuário',
      }));
    },
  });

  return {
    projects: projectsQuery.data ?? [],
    users: usersQuery.data ?? [],
    isLoading: projectsQuery.isLoading || usersQuery.isLoading,
  };
}
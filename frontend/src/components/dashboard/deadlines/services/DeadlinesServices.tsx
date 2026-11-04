import { list } from '@/services/crudService';
import { useQuery } from '@tanstack/react-query';
import type { DeadlineItem, RawOverviewUpcoming } from '../types/DeadlinesTypes';

// ============================================
// GET /reports/overview -> upcoming (tarefas abertas com prazo)
// ============================================

export function useDeadlinesService(limit = 6) {
  const { data, isLoading } = useQuery({
    queryKey: ['overview', 'upcoming'],
    queryFn: async () => (await list('reports/overview')) as RawOverviewUpcoming | undefined,
    staleTime: 30 * 1000,
  });

  const deadlines: DeadlineItem[] = (data?.upcoming ?? [])
    .filter((task) => task.status !== 'Concluído' && task.dueDate)
    .slice(0, limit)
    .map((task) => ({
      id: task.id,
      title: task.title,
      dueDate: String(task.dueDate).slice(0, 10),
      priority: task.priority,
      category: task.category,
      color: task.color,
    }));

  return { deadlines, isLoading };
}

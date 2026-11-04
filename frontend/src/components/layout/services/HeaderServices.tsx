import { list } from '@/services/crudService';
import { useQuery } from '@tanstack/react-query';

// GET /notifications/unread-count -> number
export function useUnreadCountService() {
  const { data, isLoading } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: async () => (await list('notifications/unread-count')) as number | undefined,
    staleTime: 30 * 1000,
  });

  return { unreadCount: data ?? 0, isLoading };
}
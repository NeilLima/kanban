import { list } from '@/services/crudService';
import { useQuery } from '@tanstack/react-query';
import type { ActivityItem, RawOverviewActivity } from '../types/ActivityFeedTypes';

// ============================================
// GET /reports/overview -> activity (histórico de tarefas)
// ============================================

const PALETA = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#ef4444'];

/** Cor derivada do nome (apresentação — mesmo critério do backend) */
function corDoUsuario(nome: string): string {
  let hash = 0;
  for (let i = 0; i < nome.length; i++) hash = (hash * 31 + nome.charCodeAt(i)) >>> 0;
  return PALETA[hash % PALETA.length];
}

function inferirTipo(action: string): ActivityItem['type'] {
  const texto = action.toLowerCase();
  if (texto.includes('status')) return 'status_change';
  if (texto.includes('criad') || texto.includes('created')) return 'task_created';
  if (texto.includes('done') || texto.includes('conclu')) return 'task_completed';
  return 'update';
}

export function useActivityFeedService(limit = 6) {
  const { data, isLoading } = useQuery({
    queryKey: ['overview', 'activity'],
    queryFn: async () => (await list('reports/overview')) as RawOverviewActivity | undefined,
    staleTime: 30 * 1000,
  });

  const activities: ActivityItem[] = (data?.activity ?? []).slice(0, limit).map((entry) => ({
    id: entry.id,
    userName: entry.userName,
    userColor: corDoUsuario(entry.userName),
    action: entry.action,
    target: entry.taskTitle,
    type: inferirTipo(entry.action),
    timestamp: new Date(entry.createdAt),
  }));

  return { activities, isLoading };
}

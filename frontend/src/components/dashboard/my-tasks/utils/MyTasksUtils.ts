import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useBoardService } from '@/shared/kanban/board/services/BoardServices';
import type { Task } from '@/shared/kanban/card/types/CardTypes';
import type { MyTasksState, MyTasksActions, MyTasksPriority } from '../types/MyTasksTypes';

const PRIORITY_MAP: Record<string, MyTasksPriority> = {
  urgente: { label: 'Urgente', color: '#ef4444' },
  alta: { label: 'Alta', color: '#f87171' },
  media: { label: 'Média', color: '#fbbf24' },
  medium: { label: 'Média', color: '#fbbf24' },
  baixa: { label: 'Baixa', color: '#34d399' },
  low: { label: 'Baixa', color: '#34d399' },
  high: { label: 'Alta', color: '#f87171' },
};

export function getPriority(priority: string): MyTasksPriority {
  return PRIORITY_MAP[priority] ?? { label: priority, color: '#94a3b8' };
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function formatDueDate(dueDate?: string): string {
  if (!dueDate) return 'Sem prazo';
  const date = new Date(`${dueDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return 'Sem prazo';
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

// ============================================
// Ordena por prazo mais próximo e status pendente
// ============================================
export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks]
    .filter((task) => task.status !== 'Concluído')
    .sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB;
    });
}

export function useMyTasks(limit = 5) {
  const router = useRouter();
  const service = useBoardService('default-project');

  const state: MyTasksState = {
    tasks: sortTasks(service.tasks).slice(0, limit),
    loading: service.loading,
  };

  const openKanban = useCallback(() => {
    router.push('/kanban');
  }, [router]);

  const openTask = useCallback(() => {
    // Prévia não abre o painel de detalhes: direciona para o quadro completo
    router.push('/kanban');
  }, [router]);

  const actions: MyTasksActions = { openKanban, openTask };

  return { state, actions };
}

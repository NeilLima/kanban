import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDeadlinesService } from '../services/DeadlinesServices';
import type { DeadlineItem, DeadlineDisplay } from '../types/DeadlinesTypes';

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

const PRIORITY_COLORS: Record<string, string> = {
  urgente: '#ef4444',
  alta: '#f87171',
  média: '#fbbf24',
  media: '#fbbf24',
  baixa: '#34d399',
};

export function getPriorityColor(priority: string): string {
  return PRIORITY_COLORS[priority.toLowerCase()] ?? '#94a3b8';
}

export function getDaysUntil(dueDate: string): { days: number; isOverdue: boolean } {
  const target = new Date(`${dueDate}T23:59:59`);
  const today = new Date();
  const days = Math.ceil((target.getTime() - today.getTime()) / 86400000);
  return { days, isOverdue: days < 0 };
}

function getDaysLabel(days: number, isOverdue: boolean): string {
  if (isOverdue) return `${Math.abs(days)}d atrasada`;
  if (days === 0) return 'Hoje';
  if (days === 1) return 'Amanhã';
  return `em ${days}d`;
}

function toDisplay(deadline: DeadlineItem): DeadlineDisplay {
  const date = new Date(`${deadline.dueDate}T00:00:00`);
  const { days, isOverdue } = getDaysUntil(deadline.dueDate);
  return {
    id: deadline.id,
    title: deadline.title,
    meta: `${deadline.category ?? 'Tarefa'} · ${deadline.priority}`,
    color: getPriorityColor(deadline.priority),
    day: date.getDate(),
    monthLabel: MONTHS[date.getMonth()],
    overdue: isOverdue,
    daysLabel: getDaysLabel(days, isOverdue),
  };
}

export function useDeadlines(limit = 6) {
  const router = useRouter();
  const { deadlines, isLoading } = useDeadlinesService(limit);

  const openKanban = useCallback(() => {
    router.push('/kanban');
  }, [router]);

  const state: { deadlines: DeadlineDisplay[]; loading: boolean } = {
    deadlines: deadlines.map(toDisplay),
    loading: isLoading,
  };
  const actions = { openKanban };
  return { state, actions };
}

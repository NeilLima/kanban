import { useDetailService as useKanbanDetailService } from '@/shared/kanban/detail/services/DetailServices';
import type { TaskDetailData } from '../types/DetailTypes';

// Monta um rótulo de tempo relativo ("há 2h") a partir de uma data ISO.
function tempoRelativo(iso?: string): string {
  if (!iso) return '';
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutos = Math.floor(diffMs / 60000);
  if (minutos < 1) return 'agora';
  if (minutos < 60) return `há ${minutos}min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `há ${horas}h`;
  const dias = Math.floor(horas / 24);
  return `há ${dias}d`;
}

// Converte o estado real do board (shared/kanban/detail) para o shape do painel.
function mapParaTaskDetail(
  task: ReturnType<typeof useKanbanDetailService>['task'],
  checklists: ReturnType<typeof useKanbanDetailService>['checklists'],
  comments: ReturnType<typeof useKanbanDetailService>['comments'],
  history: ReturnType<typeof useKanbanDetailService>['history'],
): TaskDetailData | null {
  if (!task) return null;
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    description: task.description,
    tags: (task.tags || []).map((nome) => ({ name: nome, color: task.color })),
    assignees: (task.assignees || []).map((a) => ({
      name: a.name,
      email: a.email,
      color: a.color,
    })),
    comments: comments.map((c) => ({
      id: c.id,
      content: c.content,
      author: c.authorName || 'Usuário',
      time: tempoRelativo(c.createdAt),
    })),
    attachments: [],
    checklist: checklists.map((item) => ({
      id: item.id,
      title: item.title,
      completed: item.completed,
    })),
  };
}

export function useDetailService(taskId: string) {
  const kanban = useKanbanDetailService(taskId);

  return {
    task: mapParaTaskDetail(kanban.task, kanban.checklists, kanban.comments, kanban.history),
    loading: kanban.loading,
  };
}
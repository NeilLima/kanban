import { useDetailService as useKanbanDetailService } from '@/shared/kanban/detail/services/DetailServices';
import { formatImageSize } from '@/services/crudService';
import type { TaskDetailData, TaskCommentData } from '../types/DetailTypes';

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

const FIELD_LABELS: Record<string, string> = {
  status: 'status',
  priority: 'prioridade',
  column: 'coluna',
  title: 'título',
  description: 'descrição',
  dueDate: 'prazo',
};

function mapComment(c: {
  id: string;
  content: string;
  userId?: string;
  createdAt?: string;
  authorName?: string;
  replies?: { id: string; content: string; createdAt?: string; authorName?: string }[];
}): TaskCommentData {
  return {
    id: c.id,
    content: c.content,
    author: c.authorName || 'Usuário',
    time: tempoRelativo(c.createdAt),
    userId: c.userId,
    replies: (c.replies || []).map((r) => ({
      id: r.id,
      content: r.content,
      author: r.authorName || 'Usuário',
      time: tempoRelativo(r.createdAt),
    })),
  };
}

// Converte o estado real do board (shared/kanban/detail) para o shape do painel.
function mapParaTaskDetail(
  kanban: ReturnType<typeof useKanbanDetailService>,
): TaskDetailData | null {
  const task = kanban.task;
  if (!task) return null;
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    description: task.description,
    tags: (task.labels?.length
      ? task.labels.map((l) => ({ name: l.name, color: l.color || task.color }))
      : (task.tags || []).map((nome) => ({ name: nome, color: task.color }))),
    assignees: (task.assignees || []).map((a) => ({
      name: a.name,
      email: a.email,
      color: a.color,
    })),
    comments: kanban.comments.map(mapComment),
    attachments: kanban.attachments.map((a) => ({
      id: a.id,
      name: a.fileName,
      size: formatImageSize(a.size),
      mimeType: a.mimeType,
      uploadedByName: a.uploadedByName,
    })),
    checklist: kanban.checklists.map((item) => ({
      id: item.id,
      title: item.title,
      completed: item.completed,
    })),
    history: kanban.history.map((h) => ({
      id: h.id,
      field: FIELD_LABELS[h.field] || h.field,
      oldValue: h.oldValue,
      newValue: h.newValue,
      userName: h.userName,
      time: tempoRelativo(h.createdAt),
    })),
  };
}

export function useDetailService(taskId: string) {
  const kanban = useKanbanDetailService(taskId);

  return {
    task: mapParaTaskDetail(kanban),
    loading: kanban.loading,
    /** Ações reais do backend (checklist, comentários, anexos, edição, exclusão) */
    kanban,
  };
}

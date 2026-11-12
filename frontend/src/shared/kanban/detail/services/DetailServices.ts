import { getById, create, update, remove, customRequest, fileToBase64 } from '@/services/crudService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  Task,
  TaskAttachment,
  Checklist,
  Comment,
  HistoryEntry,
  TaskAssignee,
  ApiTaskDetail,
} from '../types/DetailTypes';

function nomeDe(user?: { email?: string; profile?: { firstName?: string; lastName?: string } | null } | null): string {
  if (!user) return 'Usuário';
  return (
    `${user.profile?.firstName ?? ''} ${user.profile?.lastName ?? ''}`.trim() ||
    user.email ||
    'Usuário'
  );
}

function mapApiTask(data: ApiTaskDetail): Task {
  const assignees: TaskAssignee[] = (data.assignees || []).map((a) => ({
    name: nomeDe(a.user),
    email: a.user?.email,
    color: '#3b82f6',
  }));
  return {
    id: data.id,
    title: data.title,
    description: data.description ?? undefined,
    status: data.status ?? 'TODO',
    priority: (data.priority ?? 'MEDIUM').toLowerCase() as Task['priority'],
    color: data.color ?? '#3b82f6',
    category: data.category ?? undefined,
    dueDate: data.dueDate ? String(data.dueDate).slice(0, 10) : undefined,
    progress: data.progress ?? 0,
    projectId: data.projectId ?? '',
    columnId: data.columnId ?? '',
    assignees,
    labels: (data.labels || [])
      .map((l) => l.label)
      .filter((l): l is { id: string; name: string; color?: string } => !!l)
      .map((l) => ({ id: l.id, name: l.name, color: l.color })),
    attachments: (data.attachments || []).map((a) => ({
      id: a.id,
      fileName: a.fileName,
      mimeType: a.mimeType,
      size: a.size,
      uploadedById: a.uploadedById,
      uploadedByName: nomeDe(a.uploadedBy),
      createdAt: a.createdAt,
    })),
    createdAt: data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt ?? new Date().toISOString(),
  };
}

export function useDetailService(taskId: string) {
  const queryClient = useQueryClient();

  const { data: rawTask, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getById('tasks', taskId) as unknown as Promise<ApiTaskDetail>,
    enabled: !!taskId,
  });

  const task = rawTask ? mapApiTask(rawTask) : null;

  const checklists: Checklist[] = (rawTask?.checklistItems || []).map((item) => ({
    id: item.id,
    title: item.title,
    completed: item.isDone,
    taskId: item.taskId,
  }));

  const comments: Comment[] = (rawTask?.comments || []).map((c) => ({
    id: c.id,
    content: c.content,
    taskId: c.taskId,
    userId: c.authorId,
    parentId: c.parentId ?? undefined,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    authorName: nomeDe(c.author),
    replies: (c.replies || []).map((r) => ({
      id: r.id,
      content: r.content,
      taskId: c.taskId,
      userId: '',
      createdAt: r.createdAt,
      updatedAt: r.createdAt,
      authorName: nomeDe(r.author),
    })),
  }));

  const history: HistoryEntry[] = (rawTask?.history || []).map((h) => ({
    id: h.id,
    field: h.field,
    oldValue: h.oldValue,
    newValue: h.newValue,
    createdAt: h.createdAt,
    userName: nomeDe(h.user),
  }));

  function invalidar() {
    queryClient.invalidateQueries({ queryKey: ['task', taskId] });
    queryClient.invalidateQueries({ queryKey: ['kanban'] });
  }

  const updateTaskMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => update('tasks', taskId, data),
    onSuccess: invalidar,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: () => remove('tasks', taskId),
    onSuccess: invalidar,
  });

  const addChecklistMutation = useMutation({
    mutationFn: (title: string) => create(`tasks/${taskId}/checklist`, { title }),
    onSuccess: invalidar,
  });

  const toggleChecklistMutation = useMutation({
    mutationFn: ({ itemId, isDone }: { itemId: string; isDone: boolean }) =>
      update('tasks/checklist', itemId, { isDone }),
    onSuccess: invalidar,
  });

  const removeChecklistMutation = useMutation({
    mutationFn: (itemId: string) => remove('tasks/checklist', itemId),
    onSuccess: invalidar,
  });

  const addCommentMutation = useMutation({
    mutationFn: ({ content, parentId }: { content: string; parentId?: string }) =>
      create(`tasks/${taskId}/comments`, { content, parentId }),
    onSuccess: invalidar,
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) =>
      update('tasks/comments', commentId, { content }),
    onSuccess: invalidar,
  });

  const removeCommentMutation = useMutation({
    mutationFn: (commentId: string) => remove('tasks/comments', commentId),
    onSuccess: invalidar,
  });

  /** 📎 Upload de anexo: File → base64 → POST /tasks/:id/attachments */
  const uploadAttachmentMutation = useMutation({
    mutationFn: async (file: File) => {
      const data = await fileToBase64(file);
      return create(`tasks/${taskId}/attachments`, {
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        data,
      });
    },
    onSuccess: invalidar,
  });

  const removeAttachmentMutation = useMutation({
    mutationFn: (attachmentId: string) => remove('tasks/attachments', attachmentId),
    onSuccess: invalidar,
  });

  /** Baixa/abre o anexo: GET /tasks/attachments/:id/file (auth via axios) */
  async function getAttachmentBlob(attachmentId: string): Promise<Blob> {
    return customRequest<Blob>('get', `tasks/attachments/${attachmentId}/file`, null, {
      responseType: 'blob',
    });
  }

  return {
    task,
    checklists,
    comments,
    attachments: task?.attachments ?? [],
    history,
    loading: isLoading,
    updateTask: (data: Record<string, unknown>) => updateTaskMutation.mutateAsync(data),
    deleteTask: () => deleteTaskMutation.mutateAsync(),
    addChecklist: (title: string) => addChecklistMutation.mutateAsync(title),
    toggleChecklist: (itemId: string, isDone: boolean) =>
      toggleChecklistMutation.mutateAsync({ itemId, isDone }),
    removeChecklist: (itemId: string) => removeChecklistMutation.mutateAsync(itemId),
    addComment: (content: string, parentId?: string) =>
      addCommentMutation.mutateAsync({ content, parentId }),
    updateComment: (commentId: string, content: string) =>
      updateCommentMutation.mutateAsync({ commentId, content }),
    removeComment: (commentId: string) => removeCommentMutation.mutateAsync(commentId),
    uploadAttachment: (file: File) => uploadAttachmentMutation.mutateAsync(file),
    removeAttachment: (attachmentId: string) => removeAttachmentMutation.mutateAsync(attachmentId),
    getAttachmentBlob,
  };
}
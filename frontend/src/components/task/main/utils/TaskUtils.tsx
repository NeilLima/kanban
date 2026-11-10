import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from '@/services/crudService';
import { useTaskSupportData } from '../services/TaskSupportService';
import { useFeedbackActions } from '@/shared/feedback/utils/FeedbackUtils';
import type {
  TaskCreateState,
  TaskCreateActions,
  TaskCreateData,
  ProjectOption,
  UserOption,
} from '../types/TaskTypes';

const STATUS_OPTIONS = ['A Fazer', 'Em Desenvolvimento', 'Em Revisão', 'Concluído'] as const;
const PRIORITY_OPTIONS = ['Baixa', 'Média', 'Alta', 'Urgente'] as const;

export function useTaskCreate(columnId: string, defaultProjectId?: string) {
  const [form, setForm] = useState<TaskCreateState>({
    title: '',
    description: '',
    columnId,
    status: 'A Fazer',
    priority: 'Média',
    dueDate: '',
    assigneeId: '',
    tags: '',
    projectId: defaultProjectId && defaultProjectId !== 'default-project' ? defaultProjectId : '',
    isSaving: false,
    projects: [],
    users: [],
  });

  const queryClient = useQueryClient();
  const feedback = useFeedbackActions();
  const { projects, users, isLoading } = useTaskSupportData();

  useEffect(() => {
    setForm((prev) => ({ ...prev, projects, users }));
  }, [projects, users]);

  const criarMutation = useMutation({
    mutationFn: (payload: TaskCreateData) =>
      create('tasks', payload as unknown as Record<string, unknown>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['kanban'] });
      queryClient.invalidateQueries({ queryKey: ['board'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      feedback.showFeedback({
        variant: 'success',
        message: 'Tarefa criada com sucesso.',
      });
      setForm((prev) => ({
        ...prev,
        title: '',
        description: '',
        status: 'A Fazer',
        priority: 'Média',
        dueDate: '',
        assigneeId: '',
        tags: '',
        projectId: defaultProjectId && defaultProjectId !== 'default-project' ? defaultProjectId : '',
        isSaving: false,
      }));
    },
    onError: (err: unknown) => {
      const axiosErr = err as { response?: { data?: { message?: string | string[] } } };
      const msg = axiosErr?.response?.data?.message;
      const text = Array.isArray(msg) ? msg[0] : msg;
      feedback.showFeedback({
        variant: 'error',
        message: text || 'Erro ao criar tarefa.',
      });
    },
  });

  const handleTitleChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, title: value }));
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, description: value }));
  }, []);

  const handleColumnChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, columnId: value }));
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, status: value }));
  }, []);

  const handlePriorityChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, priority: value }));
  }, []);

  const handleDueDateChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, dueDate: value }));
  }, []);

  const handleAssigneeIdChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, assigneeId: value }));
  }, []);

  const handleTagsChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, tags: value }));
  }, []);

  const handleProjectIdChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, projectId: value }));
  }, []);

  const STATUS_TO_BACKEND: Record<string, string> = {
    'A Fazer': 'TODO',
    'Em Desenvolvimento': 'IN_PROGRESS',
    'Em Revisão': 'REVIEW',
    'Concluído': 'DONE',
  };

  const PRIORITY_TO_BACKEND: Record<string, string> = {
    Baixa: 'LOW',
    Média: 'MEDIUM',
    Alta: 'HIGH',
    Urgente: 'URGENT',
  };

  const handleSubmit = useCallback(() => {
    if (!form.title.trim()) return;
    if (!form.status) return;
    if (!form.priority) return;
    if (criarMutation.isPending) return;

    const assigneeIds = form.assigneeId ? [form.assigneeId] : undefined;

    // columnId pode vir como placeholder ('default-column', '', etc.) —
    // nesse caso omitimos e o backend usa a primeira coluna do projeto.
    const isPlaceholderColumn =
      !form.columnId || form.columnId.startsWith('default') || form.columnId === 'column-1';
    const resolvedColumnId = isPlaceholderColumn ? undefined : form.columnId;

    // Se não há coluna válida, o backend precisa de um projectId para
    // resolver a primeira coluna — usa o selecionado ou o primeiro da lista.
    const selectedProject =
      form.projectId && form.projectId !== 'default-project' ? form.projectId : undefined;
    const resolvedProjectId =
      selectedProject || (!resolvedColumnId ? form.projects[0]?.id : undefined) || undefined;

    if (!resolvedColumnId && !resolvedProjectId) {
      feedback.showFeedback({
        variant: 'error',
        message: 'Não foi possível criar a tarefa: nenhum projeto disponível.',
      });
      return;
    }

    const payload: TaskCreateData = {
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      columnId: resolvedColumnId,
      status: STATUS_TO_BACKEND[form.status] || form.status,
      priority: PRIORITY_TO_BACKEND[form.priority] || form.priority,
      dueDate: form.dueDate || undefined,
      assigneeIds,
      projectId: resolvedProjectId,
    };

    criarMutation.mutate(payload);
  }, [form, criarMutation, feedback]);

  const state: TaskCreateState = {
    ...form,
    isSaving: criarMutation.isPending,
  };

  const actions: TaskCreateActions = {
    handleTitleChange,
    handleDescriptionChange,
    handleColumnChange,
    handleStatusChange,
    handlePriorityChange,
    handleDueDateChange,
    handleAssigneeIdChange,
    handleTagsChange,
    handleProjectIdChange,
    handleSubmit,
  };

  return { state, actions, isLoading, STATUS_OPTIONS, PRIORITY_OPTIONS };
}

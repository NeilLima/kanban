import { useState, useCallback, useEffect } from 'react';
import { useDetailService } from '../services/DetailServices';
import { useFeedbackActions } from '@/shared/feedback/utils/FeedbackUtils';
import type { DetailState, DetailActions } from '../types/DetailTypes';

const STATUS_OPTIONS = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'] as const;

const STATUS_LABELS: Record<string, string> = {
  TODO: 'A Fazer',
  IN_PROGRESS: 'Em Desenvolvimento',
  REVIEW: 'Em Revisão',
  DONE: 'Concluído',
};

const STATUS_TO_COLUMN: Record<string, string> = {
  TODO: 'A Fazer',
  IN_PROGRESS: 'Em Desenvolvimento',
  REVIEW: 'Em Revisão',
  DONE: 'Concluído',
};

export function useDetail(taskId: string) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('TODO');

  const service = useDetailService(taskId);
  const feedback = useFeedbackActions();

  useEffect(() => {
    if (service.task) {
      setTitulo(service.task.title);
      setDescricao(service.task.description || '');
      setStatus(service.task.status || 'TODO');
    }
  }, [service.task]);

  const state: DetailState = {
    task: service.task,
    loading: service.loading,
    titulo,
    descricao,
    status,
  };

  const handleSaveTask = useCallback(() => {
    void service
      .updateTask({ title: titulo, description: descricao })
      .then(() => feedback.showFeedback({ variant: 'success', message: 'Tarefa salva.' }))
      .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao salvar tarefa.' }));
  }, [service, titulo, descricao, feedback]);

  const handleDeleteTask = useCallback(() => {
    feedback.showConfirm({
      title: 'Excluir tarefa',
      message: 'Tem certeza que deseja excluir esta tarefa? Essa ação não pode ser desfeita.',
      confirmLabel: 'Excluir',
      onConfirm: () => {
        void service
          .deleteTask()
          .then(() => feedback.showFeedback({ variant: 'success', message: 'Tarefa excluída.' }))
          .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao excluir tarefa.' }));
      },
    });
  }, [service, feedback]);

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value);
    void service
      .updateTask({ status: value })
      .then(() => {
        feedback.showFeedback({
          variant: 'success',
          message: `Status alterado para ${STATUS_LABELS[value] || value}.`,
        });
      })
      .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao alterar status.' }));
  }, [service, feedback]);

  const handleTituloChange = useCallback((value: string) => setTitulo(value), []);
  const handleDescricaoChange = useCallback((value: string) => setDescricao(value), []);

  const actions: DetailActions = {
    handleSaveTask,
    handleDeleteTask,
    handleStatusChange,
    handleTituloChange,
    handleDescricaoChange,
  };

  return { state, actions, STATUS_OPTIONS, STATUS_LABELS };
}
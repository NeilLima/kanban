import { useState, useCallback } from 'react';
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useBoardService } from '../services/BoardServices';
import { useFeedbackActions } from '@/shared/feedback/utils/FeedbackUtils';
import type { BoardState, BoardActions } from '../types/BoardTypes';
import type { DragEndEvent } from '@dnd-kit/core';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const DEFAULT_COLUMN_COLOR = '#6366f1';
const DEFAULT_COLUMN_NAME = 'Nova Coluna';

// Restrição de ativação: exige um movimento mínimo de 6px antes de iniciar o arrasto.
// Isso permite que cliques simples disparem o onClick (abrir painel de detalhes)
// e apenas arrastos intencionais ativem o drag-and-drop.
const POINTER_ACTIVATION_CONSTRAINT = { distance: 6 };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useBoard(projectId: string) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showAddColumn, setShowAddColumn] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useBoardService(projectId);
  const feedback = useFeedbackActions();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: POINTER_ACTIVATION_CONSTRAINT }),
    useSensor(KeyboardSensor)
  );

  const state: BoardState = {
    columns: service.columns && service.columns.length > 0 ? service.columns : [],
    tasks: service.tasks ?? [],
    loading: service.loading,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleAddColumn = useCallback(() => {
    service
      .addColumn(DEFAULT_COLUMN_NAME, DEFAULT_COLUMN_COLOR)
      .then(() => feedback.showFeedback({ variant: 'success', message: 'Coluna criada com sucesso.' }))
      .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao criar coluna.' }))
      .finally(() => setShowAddColumn(false));
  }, [service, feedback]);

  const handleEditColumn = useCallback((columnId: string) => {
    console.log('Edit column:', columnId);
  }, []);

  const handleDeleteColumn = useCallback(
    (columnId: string) => {
      feedback.showConfirm({
        title: 'Excluir coluna',
        message: 'Tem certeza que deseja excluir esta coluna? As tarefas dela também serão removidas.',
        confirmLabel: 'Excluir',
        onConfirm: () => {
          service
            .deleteColumn(columnId)
            .then(() => feedback.showFeedback({ variant: 'success', message: 'Coluna excluída.' }))
            .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao excluir coluna.' }));
        },
      });
    },
    [service, feedback],
  );

  const handleTaskClick = useCallback((taskId: string) => {
    setSelectedTaskId(taskId);
  }, []);

  const handleCloseTaskModal = useCallback(() => {
    setSelectedTaskId(null);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    if (!event.over) return;
    const taskId = String(event.active.id);
    const newColumnId = String(event.over.id);
    service.moveTask(taskId, newColumnId);
  }, [service]);

  const handleAddTask = useCallback(
    (columnId: string, title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      service
        .addTask(trimmed, columnId)
        .then(() => feedback.showFeedback({ variant: 'success', message: 'Tarefa criada.' }))
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao criar tarefa.' }));
    },
    [service, feedback],
  );

  const actions: BoardActions = {
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
    handleTaskClick,
    handleDragEnd,
  };

  return { state, actions, selectedTaskId, handleCloseTaskModal, showAddColumn, setShowAddColumn, sensors };
}
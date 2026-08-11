import { useState, useCallback } from 'react';
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useBoardService } from '../services/BoardServices';
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
    service.addColumn(DEFAULT_COLUMN_NAME, DEFAULT_COLUMN_COLOR);
    setShowAddColumn(false);
  }, [service]);

  const handleEditColumn = useCallback((columnId: string) => {
    console.log('Edit column:', columnId);
  }, []);

  const handleDeleteColumn = useCallback((columnId: string) => {
    service.deleteColumn(columnId);
  }, [service]);

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
    service.updateTask(taskId, { columnId: newColumnId });
  }, [service]);

  const actions: BoardActions = {
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
    handleTaskClick,
    handleDragEnd,
  };

  return { state, actions, selectedTaskId, handleCloseTaskModal, showAddColumn, setShowAddColumn, sensors };
}
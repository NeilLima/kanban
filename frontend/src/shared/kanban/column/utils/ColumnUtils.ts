import { useState, useCallback } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Task } from '../types/ColumnTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const SORTING_STRATEGY = verticalListSortingStrategy;
const TITULO_VAZIO = '';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useColumn(columnId: string) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: columnId });
  const [isAdding, setIsAdding] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(TITULO_VAZIO);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const getSortableContext = (tasks: Task[]) => ({
    items: tasks.map(t => t.id),
    strategy: SORTING_STRATEGY,
  });

  const handleOpenAdd = useCallback(() => {
    setIsAdding(true);
    setNovoTitulo(TITULO_VAZIO);
  }, []);

  const handleCancelAdd = useCallback(() => {
    setIsAdding(false);
    setNovoTitulo(TITULO_VAZIO);
  }, []);

  const handleTituloChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNovoTitulo(e.target.value);
  }, []);

  const handleConfirmAdd = useCallback(
    (onAddTask: (columnId: string, title: string) => void) => {
      const trimmed = novoTitulo.trim();
      if (!trimmed) return;
      onAddTask(columnId, trimmed);
      setNovoTitulo(TITULO_VAZIO);
      setIsAdding(false);
    },
    [columnId, novoTitulo],
  );

  const handleTituloKeyDown = useCallback(
    (onAddTask: (columnId: string, title: string) => void) =>
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleConfirmAdd(onAddTask);
        if (e.key === 'Escape') handleCancelAdd();
      },
    [handleConfirmAdd, handleCancelAdd],
  );

  return {
    attributes,
    listeners,
    setNodeRef,
    style,
    isDragging,
    getSortableContext,
    isAdding,
    novoTitulo,
    handleOpenAdd,
    handleCancelAdd,
    handleTituloChange,
    handleConfirmAdd,
    handleTituloKeyDown,
  };
}
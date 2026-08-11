import { useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Task } from '../types/ColumnTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const SORTING_STRATEGY = verticalListSortingStrategy;

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useColumn(columnId: string) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: columnId });

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

  return { attributes, listeners, setNodeRef, style, isDragging, getSortableContext };
}
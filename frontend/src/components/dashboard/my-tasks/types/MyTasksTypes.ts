import type { Task } from '@/shared/kanban/card/types/CardTypes';

export interface MyTasksTypes {
  /** Quantidade máxima de tarefas exibidas na prévia */
  limit?: number;
}

export interface MyTasksState {
  tasks: Task[];
  loading: boolean;
}

export interface MyTasksActions {
  openKanban: () => void;
  openTask: (taskId: string) => void;
}

export interface MyTasksPriority {
  label: string;
  color: string;
}

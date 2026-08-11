import { useState, useCallback } from 'react';
import { useTaskDetailPanelService } from '../services/TaskDetailPanelServices';
import type { TaskDetailPanelState, TaskDetailPanelActions } from '../types/TaskDetailPanelTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const DEFAULT_TABS = ['Informações', 'Checklist', 'Comentários', 'Arquivos'];

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useTaskDetailPanel(taskId: string) {
  const [activeTab, setActiveTab] = useState(0);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useTaskDetailPanelService(taskId);

  const state: TaskDetailPanelState = {
    activeTab,
    task: service.task,
    tabs: DEFAULT_TABS,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleTabChange = useCallback((tabIndex: number) => {
    setActiveTab(tabIndex);
  }, []);

  const handleClose = useCallback(() => {
    // Close logic when needed
  }, []);

  const actions: TaskDetailPanelActions = {
    handleTabChange,
    handleClose,
  };

  return { state, actions };
}
import { useState, useCallback } from 'react';
import { useTaskModalService } from '../services/TaskModalServices';
import type { TaskModalState, TaskModalActions } from '../types/TaskModalTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const TABS = ['Informações', 'Checklist', 'Comentários', 'Arquivos', 'Histórico', 'Atividade'];
const DEFAULT_TAB = 'Informações';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useTaskModal(taskId: string) {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useTaskModalService(taskId);

  const state: TaskModalState = {
    task: service.task,
    checklists: service.checklists,
    comments: service.comments,
    attachments: service.attachments,
    activeTab,
    loading: service.loading,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleSaveTask = useCallback(() => {
    service.updateTask({});
  }, [service]);

  const handleDeleteTask = useCallback(() => {
    service.deleteTask();
  }, [service]);

  const handleAddChecklist = useCallback(() => {
    service.addChecklist('Novo item');
  }, [service]);

  const handleAddComment = useCallback((content: string) => {
    service.addComment(content);
  }, [service]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const actions: TaskModalActions = {
    handleSaveTask,
    handleDeleteTask,
    handleAddChecklist,
    handleAddComment,
    handleTabChange,
  };

  return { state, actions, tabs: TABS };
}
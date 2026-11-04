import { useState, useCallback } from 'react';
import { useDetailService } from '../services/DetailServices';
import type { DetailState, DetailActions } from '../types/DetailTypes';

// ============================================
// 1ï¸âƒ£ VARIÃVEIS
// ============================================
const DEFAULT_TABS = ['InformaÃ§Ãµes', 'Checklist', 'ComentÃ¡rios', 'Arquivos'];

// ============================================
// 2ï¸âƒ£ ESTADOS
// ============================================
export function useDetail(taskId: string) {
  const [activeTab, setActiveTab] = useState(0);

  // ============================================
  // 3ï¸âƒ£ OBJETOS
  // ============================================
  const service = useDetailService(taskId);

  const state: DetailState = {
    activeTab,
    task: service.task,
    tabs: DEFAULT_TABS,
    loading: service.loading,
  };

  // ============================================
  // 4ï¸âƒ£ FUNÃ‡Ã•ES
  // ============================================
  const handleTabChange = useCallback((tabIndex: number) => {
    setActiveTab(tabIndex);
  }, []);

  const handleClose = useCallback(() => {
    // Close logic when needed
  }, []);

  const actions: DetailActions = {
    handleTabChange,
    handleClose,
  };

  return { state, actions };
}
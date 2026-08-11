import { useState, useCallback } from 'react';
import { useButtonService } from '../services/ButtonServices';
import { useTheme } from '@/contexts/ThemeContext';
import type { ButtonState, ButtonActions } from '../types/ButtonTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const DEFAULT_LOADING = false;
const DEFAULT_DISABLED = false;

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useButton() {
  const [internalLoading, setInternalLoading] = useState(DEFAULT_LOADING);
  const { theme } = useTheme();

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useButtonService();

  const state: ButtonState = {
    loading: internalLoading,
    disabled: DEFAULT_DISABLED,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleClick = useCallback(() => {
    service.trackClick('button');
  }, [service]);

  const actions: ButtonActions = {
    handleClick,
  };

  return {
    state,
    actions,
    theme,
    setInternalLoading,
  };
}
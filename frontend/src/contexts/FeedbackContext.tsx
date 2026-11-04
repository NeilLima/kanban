'use client';
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type {
  ConfirmData,
  ConfirmState,
  FeedbackContextValue,
  FeedbackData,
  FeedbackInternals,
  FeedbackState,
} from '@/shared/feedback/types/FeedbackTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FEEDBACK_DURATION_MS = 4000;
const CONFIRM_LABEL_PADRAO = 'Confirmar';

const FEEDBACK_INICIAL: FeedbackState = { show: false, variant: 'success', message: '' };
const CONFIRM_INICIAL: ConfirmState = {
  show: false,
  title: '',
  message: '',
  confirmLabel: CONFIRM_LABEL_PADRAO,
};

const FeedbackContext = createContext<FeedbackInternals | null>(null);

// ============================================
// 2️⃣ ESTADOS (provider)
// ============================================
export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [feedback, setFeedback] = useState<FeedbackState>(FEEDBACK_INICIAL);
  const [confirm, setConfirm] = useState<ConfirmState>(CONFIRM_INICIAL);
  const onConfirmRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const showFeedback = useCallback((data: FeedbackData) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFeedback({ show: true, variant: data.variant, message: data.message });
    timerRef.current = setTimeout(() => setFeedback(FEEDBACK_INICIAL), FEEDBACK_DURATION_MS);
  }, []);

  const hideFeedback = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFeedback(FEEDBACK_INICIAL);
  }, []);

  const showConfirm = useCallback((data: ConfirmData) => {
    onConfirmRef.current = data.onConfirm;
    setConfirm({
      show: true,
      title: data.title,
      message: data.message,
      confirmLabel: data.confirmLabel || CONFIRM_LABEL_PADRAO,
    });
  }, []);

  const hideConfirm = useCallback(() => {
    onConfirmRef.current = null;
    setConfirm(CONFIRM_INICIAL);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirmRef.current?.();
    hideConfirm();
  }, [hideConfirm]);

  const value = useMemo<FeedbackInternals>(
    () => ({
      showFeedback,
      showConfirm,
      feedback,
      confirm,
      hideFeedback,
      hideConfirm,
      handleConfirm,
    }),
    [showFeedback, showConfirm, feedback, confirm, hideFeedback, hideConfirm, handleConfirm],
  );

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}

// ============================================
// HOOK de consumo (fallback seguro sem provider)
// ============================================
export function useFeedback(): FeedbackContextValue {
  const ctx = useContext(FeedbackContext);
  if (!ctx) {
    return { showFeedback: () => {}, showConfirm: () => {} };
  }
  return ctx;
}

// Estado interno dos modais (consumido pelos componentes do shared/feedback)
export function useFeedbackInternals() {
  const ctx = useContext(FeedbackContext);
  return ctx ?? null;
}
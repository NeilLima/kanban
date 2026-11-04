import { useFeedback, useFeedbackInternals } from '@/contexts/FeedbackContext';
import type { FeedbackInternals } from '../types/FeedbackTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const ICONE_SUCESSO = 'bi-check-circle-fill';
const ICONE_ERRO = 'bi-exclamation-triangle-fill';

const FEEDBACK_FALLBACK: FeedbackInternals = {
  showFeedback: () => {},
  showConfirm: () => {},
  feedback: { show: false, variant: 'success', message: '' },
  confirm: { show: false, title: '', message: '', confirmLabel: 'Confirmar' },
  hideFeedback: () => {},
  hideConfirm: () => {},
  handleConfirm: () => {},
};

// ============================================
// 4️⃣ FUNÇÕES (exposição para outros utils)
// ============================================
export function useFeedbackActions() {
  return useFeedback();
}

// Estado dos modais para os componentes renderizarem
export function useFeedbackView(): FeedbackInternals {
  const internals = useFeedbackInternals();
  return internals ?? FEEDBACK_FALLBACK;
}

export const FEEDBACK_ICONS = { success: ICONE_SUCESSO, error: ICONE_ERRO };
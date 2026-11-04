export type FeedbackVariant = 'success' | 'error';

export interface FeedbackState {
  show: boolean;
  variant: FeedbackVariant;
  message: string;
}

export interface ConfirmState {
  show: boolean;
  title: string;
  message: string;
  confirmLabel: string;
}

export interface FeedbackData {
  variant: FeedbackVariant;
  message: string;
}

export interface ConfirmData {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

export interface FeedbackContextValue {
  showFeedback: (data: FeedbackData) => void;
  showConfirm: (data: ConfirmData) => void;
}

// Estado interno completo exposto pelo provider (consumido pelos componentes de feedback)
export interface FeedbackInternals extends FeedbackContextValue {
  feedback: FeedbackState;
  confirm: ConfirmState;
  hideFeedback: () => void;
  hideConfirm: () => void;
  handleConfirm: () => void;
}
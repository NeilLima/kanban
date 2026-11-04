'use client';
import React from 'react';
import { useFeedbackView } from '../utils/FeedbackUtils';
import {
  StyledOverlay,
  StyledDialog,
  StyledTitle,
  StyledMessage,
  StyledActions,
  StyledConfirmButton,
  StyledCancelButton,
} from '../styles/FeedbackStyles';

export default function ConfirmModalComp() {
  const { confirm, hideConfirm, handleConfirm } = useFeedbackView();

  if (!confirm.show) return null;

  return (
    <StyledOverlay onClick={hideConfirm}>
      <StyledDialog
        role="alertdialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        data-testid="confirm-dialog"
      >
        <StyledTitle data-testid="confirm-title">{confirm.title}</StyledTitle>
        <StyledMessage data-testid="confirm-message">{confirm.message}</StyledMessage>
        <StyledActions>
          <StyledCancelButton onClick={hideConfirm} data-testid="confirm-cancel">
            Cancelar
          </StyledCancelButton>
          <StyledConfirmButton onClick={handleConfirm} data-testid="confirm-ok">
            {confirm.confirmLabel}
          </StyledConfirmButton>
        </StyledActions>
      </StyledDialog>
    </StyledOverlay>
  );
}
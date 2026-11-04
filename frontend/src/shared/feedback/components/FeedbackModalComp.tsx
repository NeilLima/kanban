'use client';
import React from 'react';
import { useFeedbackView, FEEDBACK_ICONS } from '../utils/FeedbackUtils';
import { StyledToast, StyledToastIcon, StyledToastClose } from '../styles/FeedbackStyles';

export default function FeedbackModalComp() {
  const { feedback, hideFeedback } = useFeedbackView();

  if (!feedback.show) return null;

  return (
    <StyledToast $variant={feedback.variant} role="status" data-testid="feedback-toast">
      <StyledToastIcon $variant={feedback.variant}>
        <i className={FEEDBACK_ICONS[feedback.variant]}></i>
      </StyledToastIcon>
      <span>{feedback.message}</span>
      <StyledToastClose onClick={hideFeedback} data-testid="feedback-close">
        <i className="bi bi-x-lg"></i>
      </StyledToastClose>
    </StyledToast>
  );
}
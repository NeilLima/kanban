import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease;
`;

export const StyledDialog = styled.div`
  background: #0f172a;
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  animation: ${slideUp} 0.25s ease;
`;

export const StyledTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: #f8fafc;
`;

export const StyledMessage = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #94a3b8;
`;

export const StyledActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const buttonBase = css`
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const StyledConfirmButton = styled.button`
  ${buttonBase}
  background: #3b82f6;
  color: #fff;
`;

export const StyledCancelButton = styled.button`
  ${buttonBase}
  background: rgba(148, 163, 184, 0.15);
  color: #cbd5e1;
`;

export const StyledToast = styled.div<{ $variant: 'success' | 'error' }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #f8fafc;
  z-index: 9999;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  animation: ${slideUp} 0.25s ease;
  max-width: 340px;

  ${(props) =>
    props.$variant === 'success'
      ? css`
          background: #064e3b;
          border: 1px solid rgba(16, 185, 129, 0.4);
        `
      : css`
          background: #450a0a;
          border: 1px solid rgba(239, 68, 68, 0.4);
        `}
`;

export const StyledToastIcon = styled.span<{ $variant: 'success' | 'error' }>`
  font-size: 18px;
  color: ${(props) => (props.$variant === 'success' ? '#34d399' : '#f87171')};
`;

export const StyledToastClose = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  margin-left: 4px;

  &:hover {
    color: #f8fafc;
  }
`;
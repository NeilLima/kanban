import styled from 'styled-components';

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1100;
`;

export const StyledModal = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  width: 100%;
  max-width: 460px;
  padding: clamp(18px, 2vw, 24px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const StyledModalTitle = styled.h2`
  font-size: clamp(15px, 1.5vw, 18px);
  font-weight: 600;
  color: #f8fafc;
  margin: 0;
`;

export const StyledCloseButton = styled.button`
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 20px;
  cursor: pointer;
  padding: 2px;
  transition: color 0.2s ease;

  &:hover {
    color: #f8fafc;
  }
`;

export const StyledField = styled.div`
  margin-bottom: 16px;
`;

export const StyledLabel = styled.label`
  display: block;
  color: #94a3b8;
  font-size: 12px;
  margin-bottom: 6px;
  font-weight: 500;
`;

export const StyledInput = styled.input`
  width: 100%;
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: #f8fafc;
  font-size: 13px;
  padding: 10px 12px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: #f8fafc;
  font-size: 13px;
  padding: 10px 12px;
  outline: none;
  resize: vertical;
  min-height: 70px;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }
`;

export const StyledColorRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const StyledColorButton = styled.button<{ $color: string; $selected: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(p) =>
    p.$selected &&
    `
    border-color: #fff;
    box-shadow: 0 0 0 2px ${p.$color};
  `}

  &:hover {
    transform: scale(1.1);
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const StyledCancelButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  border-radius: 8px;
  padding: 9px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const StyledSubmitButton = styled.button`
  background: #3b82f6;
  border: none;
  color: #fff;
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
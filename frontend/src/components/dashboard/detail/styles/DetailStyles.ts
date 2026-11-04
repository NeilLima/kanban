import styled from 'styled-components';
import { Chip, Button } from '@mui/material';

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1999;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const StyledPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: rgba(15, 23, 42, 0.98);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 2001;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.4);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const StyledPanelHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const StyledPanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const StyledPanelSection = styled.div`
  margin-bottom: 20px;
`;

export const StyledSectionTitle = styled.h4`
  color: #94a3b8;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 8px 0;
`;

export const StyledDescription = styled.p`
  color: #e2e8f0;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
`;

export const StyledField = styled.div`
  display: flex;
  align-items: center;
  color: #e2e8f0;
  font-size: 13px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const StyledLabel = styled.span`
  color: #94a3b8;
  font-size: 12px;
`;

export const StyledAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledAvatar = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
`;

export const StyledMemberItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const StyledMemberInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledMemberName = styled.div`
  color: #fff;
  font-size: 13px;
  font-weight: 500;
`;

export const StyledMemberEmail = styled.div`
  color: #64748b;
  font-size: 11px;
`;

export const StyledTabContent = styled.div`
  animation: fadeIn 0.2s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StyledCommentInput = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const StyledCommentButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #3b82f6;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
    transform: scale(1.05);
  }
`;

export const StyledFileChip = styled(Chip)`
  && {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
    height: auto;
    padding: 8px 12px;
  }
`;

export const StyledActionButton = styled(Button)`
  && {
    text-transform: none;
    font-size: 13px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
  }
`;

export const StyledHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const StyledBadge = styled.span<{ $bgColor: string; $textColor: string; $borderColor: string }>`
  background-color: ${props => props.$bgColor};
  color: ${props => props.$textColor};
  border: 1px solid ${props => props.$borderColor};
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
`;

export const StyledTaskTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 8px 0;
`;

export const StyledBadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledTabsContainer = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 16px;
`;

export const StyledTabLabel = styled.span<{ $active: boolean }>`
  font-size: 12px;
  color: ${props => props.$active ? '#fff' : '#94a3b8'};
`;

export const StyledTagChip = styled.div<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  background-color: ${props => props.$color}20;
  color: ${props => props.$color};
  border: 1px solid ${props => props.$color}40;
  font-size: 11px;
  border-radius: 16px;
`;

export const StyledPriorityDot = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.$color};
`;

export const StyledPriorityText = styled.span<{ $color: string }>`
  color: ${props => props.$color};
  font-size: 13px;
`;

export const StyledChecklistItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
`;

export const StyledChecklistText = styled.span<{ $completed: boolean }>`
  color: ${props => props.$completed ? '#64748b' : '#fff'};
  font-size: 13px;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  margin-left: 8px;
`;

export const StyledCommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
`;

export const StyledCommentAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const StyledCommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledCommentAuthor = styled.span`
  color: #fff;
  font-size: 13px;
  font-weight: 500;
`;

export const StyledCommentTime = styled.span`
  color: #64748b;
  font-size: 11px;
`;

export const StyledCommentContent = styled.span`
  color: #94a3b8;
  font-size: 12px;
  display: block;
  margin-top: 4px;
`;

export const StyledTextField = styled.input`
  width: 100%;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 13px;
  margin-bottom: 8px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #64748b;
  }
`;

export const StyledAddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: #3b82f6;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 0;
  margin-top: 12px;

  &:hover {
    color: #2563eb;
  }
`;

export const StyledFileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 8px;
  width: 100%;
`;

export const StyledFileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledFileName = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #e2e8f0;
`;

export const StyledFileSize = styled.div`
  font-size: 10px;
  opacity: 0.7;
  color: #94a3b8;
`;

export const StyledFooterActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const StyledDeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }
`;

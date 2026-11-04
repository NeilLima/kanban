import styled from 'styled-components';

export const StyledActivityCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: clamp(12px, 1.4vw, 20px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  height: 100%;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const StyledTitle = styled.h6`
  color: #fff;
  font-size: clamp(13px, 1.2vw, 15px);
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #3b82f6;
  }
`;

export const StyledLinkButton = styled.button`
  background: transparent;
  border: none;
  color: #3b82f6;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: #60a5fa;
  }
`;

export const StyledTimeline = styled.div`
  position: relative;
  padding-left: 4px;
`;

export const StyledItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 40px;
    bottom: -10px;
    width: 1px;
    background: rgba(255, 255, 255, 0.06);
  }

  &:last-child::before {
    display: none;
  }
`;

export const StyledIconBubble = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(p) => p.$color}1a;
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
  z-index: 1;
`;

export const StyledContent = styled.div`
  min-width: 0;
  flex: 1;
`;

export const StyledText = styled.p`
  margin: 0;
  font-size: 12.5px;
  color: #94a3b8;
  line-height: 1.45;

  strong {
    color: #f8fafc;
    font-weight: 600;
  }

  span {
    color: #cbd5e1;
  }
`;

export const StyledTime = styled.span`
  font-size: 11px;
  color: #64748b;
`;

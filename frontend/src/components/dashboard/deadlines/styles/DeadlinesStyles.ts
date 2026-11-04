import styled from 'styled-components';

export const StyledDeadlinesCard = styled.div`
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

  i {
    font-size: 11px;
  }

  &:hover {
    color: #60a5fa;
  }
`;

export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledDeadlineRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border-radius: 8px;
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #263548;
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

export const StyledDateBadge = styled.div<{ $color: string; $overdue: boolean }>`
  width: 46px;
  flex-shrink: 0;
  text-align: center;
  border-radius: 8px;
  padding: 5px 0;
  border: 1px solid ${(p) => (p.$overdue ? p.$color : 'rgba(255,255,255,0.08)')};
  background: ${(p) => (p.$overdue ? `${p.$color}1a` : '#1e293b')};
`;

export const StyledDateDay = styled.div<{ $overdue: boolean }>`
  font-size: 15px;
  font-weight: 700;
  color: ${(p) => (p.$overdue ? '#f87171' : '#f8fafc')};
  line-height: 1.1;
`;

export const StyledDateMonth = styled.div<{ $overdue: boolean }>`
  font-size: 10px;
  text-transform: uppercase;
  color: ${(p) => (p.$overdue ? '#f87171' : '#94a3b8')};
`;

export const StyledDeadlineInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StyledDeadlineTitle = styled.div`
  color: #f8fafc;
  font-size: 12.5px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledDeadlineMeta = styled.div<{ $color: string }>`
  font-size: 11px;
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${(p) => p.$color};
  }
`;

export const StyledDaysLeft = styled.span<{ $overdue: boolean }>`
  font-size: 11px;
  font-weight: 600;
  color: ${(p) => (p.$overdue ? '#f87171' : '#94a3b8')};
  white-space: nowrap;
  flex-shrink: 0;
`;

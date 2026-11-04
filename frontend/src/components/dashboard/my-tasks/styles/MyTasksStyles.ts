import styled from 'styled-components';

export const StyledMyTasksCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: clamp(12px, 1.4vw, 20px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
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
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #60a5fa;
  }
`;

export const StyledTaskRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #263548;
    border-color: rgba(255, 255, 255, 0.1);
  }

  & + & {
    margin-top: 8px;
  }
`;

export const StyledTaskTitle = styled.span`
  color: #f8fafc;
  font-size: 13px;
  font-weight: 500;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledCategory = styled.span<{ $color: string }>`
  font-size: 11px;
  font-weight: 600;
  color: ${(p) => p.$color};
  background: ${(p) => p.$color}1a;
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
`;

export const StyledPriority = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
  white-space: nowrap;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(p) => p.$color};
  }
`;

export const StyledDueDate = styled.span<{ $overdue: boolean }>`
  font-size: 11px;
  color: ${(p) => (p.$overdue ? '#f87171' : '#94a3b8')};
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;

export const StyledAvatar = styled.div<{ $color: string }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StyledProgress = styled.div`
  width: 70px;
  height: 4px;
  border-radius: 999px;
  background: #334155;
  overflow: hidden;
  flex-shrink: 0;

  > div {
    height: 100%;
    border-radius: 999px;
    background: #3b82f6;
    transition: width 0.3s ease;
  }
`;

export const StyledEmpty = styled.div`
  color: #94a3b8;
  font-size: 13px;
  text-align: center;
  padding: 24px 0;
`;

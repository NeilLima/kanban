import styled from 'styled-components';

export const StyledColumn = styled.div`
  min-width: clamp(240px, 28vw, 320px);
  max-width: clamp(240px, 28vw, 320px);
  width: clamp(240px, 28vw, 320px);
  flex: 0 0 auto;
  background: #111827;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.04);
`;

export const StyledColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(8px, 1.2vw, 16px);
  padding-bottom: clamp(6px, 0.8vw, 12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: #111827;
  flex-shrink: 0;
  border-radius: 12px 12px 0 0;
`;

export const StyledColumnTitle = styled.h3<{ color: string }>`
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 600;
  color: #fff;
  margin: 0;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.color || '#3b82f6'};
    flex-shrink: 0;
  }
`;

export const StyledAddTaskButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
`;

export const StyledColumnPlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #94a3b8;
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }
`;

export const StyledTaskCount = styled.span`
  font-size: clamp(10px, 0.9vw, 12px);
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 8px;
`;

export const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: clamp(6px, 0.8vw, 12px);
  padding-top: clamp(4px, 0.5vw, 8px);
`;

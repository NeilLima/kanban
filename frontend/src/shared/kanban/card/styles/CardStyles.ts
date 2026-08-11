import styled from 'styled-components';

export const StyledCard = styled.div<{ $isDragging: boolean; $color?: string }>`
  background: #1E293B;
  border-radius: clamp(6px, 0.8vw, 8px);
  padding: clamp(8px, 1vw, 12px);
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${props => props.$isDragging ? 0.5 : 1};
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-left: 3px solid ${props => props.$color || '#3b82f6'};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #263548;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

export const StyledCardDescription = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 4px 0;
`;

export const StyledCardTitle = styled.p`
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 500;
  color: #fff;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

export const StyledCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  gap: 8px;
`;

export const StyledPriorityBadge = styled.span<{ $priority: string }>`
  font-size: 11px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${props =>
    props.$priority === 'high' ? '#ef4444' :
    props.$priority === 'medium' ? '#f59e0b' :
    '#22c55e'};

  &::before {
    content: '●';
    font-size: 8px;
  }
`;

export const StyledDueDate = styled.span<{ $overdue: boolean }>`
  font-size: 11px;
  color: ${props => props.$overdue ? '#ef4444' : 'rgba(255, 255, 255, 0.5)'};
  margin-left: auto;
`;

export const StyledCategoryBadge = styled.span<{ $category: string }>`
  font-size: 10px;
  padding: 3px 10px;
  border-radius: 4px;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 8px;
  background: ${props => {
    switch(props.$category) {
      case 'Design': return 'rgba(59, 130, 246, 0.2)';
      case 'Frontend': return 'rgba(34, 197, 94, 0.2)';
      case 'Backend': return 'rgba(139, 92, 246, 0.2)';
      case 'Planejamento': return 'rgba(245, 158, 11, 0.2)';
      case 'DevOps': return 'rgba(6, 182, 212, 0.2)';
      default: return 'rgba(100, 116, 139, 0.2)';
    }
  }};
  color: ${props => {
    switch(props.$category) {
      case 'Design': return '#3b82f6';
      case 'Frontend': return '#22c55e';
      case 'Backend': return '#8b5cf6';
      case 'Planejamento': return '#f59e0b';
      case 'DevOps': return '#06b6d4';
      default: return '#64748b';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$category) {
      case 'Design': return 'rgba(59, 130, 246, 0.3)';
      case 'Frontend': return 'rgba(34, 197, 94, 0.3)';
      case 'Backend': return 'rgba(139, 92, 246, 0.3)';
      case 'Planejamento': return 'rgba(245, 158, 11, 0.3)';
      case 'DevOps': return 'rgba(6, 182, 212, 0.3)';
      default: return 'rgba(100, 116, 139, 0.3)';
    }
  }};
`;

export const StyledCardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  gap: 8px;
`;

export const StyledMetaItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  gap: 4px;
`;

export const StyledMetaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledAvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledAvatar = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  border: 2px solid #1E293B;
  margin-left: -8px;
  
  &:first-child {
    margin-left: 0;
  }
`;

export const StyledProgressBar = styled.div`
  width: 100%;
  height: clamp(2px, 0.3vw, 3px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
`;

export const StyledProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 2px;
  transition: width 0.3s ease;
`;

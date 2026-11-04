import styled from 'styled-components';

export const StyledDetailCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px 18px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
`;

export const StyledDetailValue = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const StyledDetailValueDone = styled(StyledDetailValue)`
  color: #10b981;
`;

export const StyledDetailValueProgress = styled(StyledDetailValue)`
  color: #3b82f6;
`;

export const StyledDetailValueMembers = styled(StyledDetailValue)`
  color: #8b5cf6;
`;

export const StyledDetailLabel = styled.p`
  font-size: 12px;
  color: #94a3b8;
  margin: 4px 0 0 0;
`;

export const StyledProgressWrapper = styled(StyledDetailCard)`
  padding: 12px 18px;
`;

export const StyledProgressTrack = styled.div`
  height: 10px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  overflow: hidden;
`;

export const StyledProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${(p) => p.$progress}%;
  background: #3b82f6;
  border-radius: 6px;
  transition: width 0.3s ease;
`;

export const StyledTeamCard = styled(StyledDetailCard)``;

export const StyledTeamTitle = styled.h6`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
`;

export const StyledTeamList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StyledTeamBadge = styled.span<{ $isOwner: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(59, 130, 246, 0.12);
  color: ${(p) => (p.$isOwner ? '#fbbf24' : '#93c5fd')};
  border: 1px solid
    ${(p) => (p.$isOwner ? 'rgba(251, 191, 36, 0.35)' : 'rgba(59, 130, 246, 0.3)')};
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
`;

export const StyledTeamIcon = styled.i<{ $fontSize?: number }>`
  font-size: ${(p) => (p.$fontSize ? `${p.$fontSize}px` : '11px')};
`;

export const StyledTeamRole = styled.small`
  opacity: 0.8;
  font-size: 11px;
`;

export const StyledBoardSection = styled.div`
  margin-top: 20px;
`;

export const StyledBoardTitle = styled.h6`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

export const StyledActionsRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
`;

export const StyledEmptyText = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0 0 12px 0;
`;

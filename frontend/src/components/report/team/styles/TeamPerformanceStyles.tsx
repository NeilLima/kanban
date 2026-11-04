import styled from 'styled-components';

export const StyledCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: clamp(8px, 1vw, 12px);
  padding: clamp(12px, 1.4vw, 20px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const StyledCardTitle = styled.h3`
  font-size: clamp(13px, 1.4vw, 16px);
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

export const StyledTeamRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledTeamAvatar = styled.div<{ $color: string }>`
  width: clamp(30px, 3vw, 36px);
  height: clamp(30px, 3vw, 36px);
  border-radius: 50%;
  background: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: clamp(11px, 1vw, 13px);
  flex-shrink: 0;
`;

export const StyledTeamInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StyledTeamName = styled.p`
  color: #fff;
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 500;
  margin: 0;
`;

export const StyledTeamRole = styled.p`
  color: #64748b;
  font-size: clamp(10px, 0.8vw, 11px);
  margin: 0;
`;

export const StyledTeamTasks = styled.span`
  color: #94a3b8;
  font-size: clamp(10px, 0.9vw, 12px);
  min-width: 88px;
  text-align: right;
`;

export const StyledTeamProgress = styled.div`
  width: clamp(60px, 12vw, 120px);
`;

export const StyledTeamTrack = styled.div`
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
`;

export const StyledTeamFill = styled.div<{ $color: string; $width: number }>`
  height: 100%;
  width: ${(p) => p.$width}%;
  background: linear-gradient(90deg, ${(p) => p.$color} 0%, rgba(255, 255, 255, 0.3) 100%);
  border-radius: 3px;
  transition: width 0.4s ease;
`;

export const StyledTeamValue = styled.span`
  color: #94a3b8;
  font-size: clamp(10px, 0.9vw, 12px);
  min-width: 40px;
  text-align: right;
`;
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

export const StyledBarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledBarLabel = styled.span`
  color: #cbd5e1;
  font-size: clamp(11px, 1vw, 13px);
  min-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledBarTrack = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
`;

export const StyledBarFill = styled.div<{ $color: string; $width: number }>`
  height: 100%;
  width: ${(p) => p.$width}%;
  background: ${(p) => p.$color};
  border-radius: 4px;
  transition: width 0.4s ease;
`;

export const StyledBarValue = styled.span`
  color: #94a3b8;
  font-size: clamp(11px, 1vw, 12px);
  min-width: 60px;
  text-align: right;
`;

export const StyledTaskCount = styled.small`
  display: block;
  color: #64748b;
  font-size: 10px;
  margin-top: 2px;
`;
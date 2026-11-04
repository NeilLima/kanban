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

export const StyledChartWrapper = styled.div`
  width: 100%;
  height: clamp(200px, 26vw, 260px);
`;

export const StyledTooltip = styled.div`
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

export const StyledTooltipLabel = styled.p`
  color: #94a3b8;
  font-size: 11px;
  margin: 0 0 4px 0;
  font-weight: 600;
`;

export const StyledTooltipValue = styled.p<{ $color?: string }>`
  color: ${(p) => p.$color || '#fff'};
  font-size: 12px;
  margin: 0;
`;
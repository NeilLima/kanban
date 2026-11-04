import styled from 'styled-components';

export const StyledChartCard = styled.div`
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
  flex-wrap: wrap;
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

export const StyledSummary = styled.div`
  display: flex;
  gap: 16px;
`;

export const StyledSummaryItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(p) => p.$color};
  }
`;

export const StyledChartWrapper = styled.div`
  width: 100%;
  height: 220px;

  .recharts-cartesian-axis-tick text {
    fill: #94a3b8;
    font-size: 11px;
  }

  .recharts-tooltip-wrapper {
    outline: none;
  }
`;

export const StyledTooltipBox = styled.div`
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: #f8fafc;
`;

export const StyledTooltipTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

export const StyledTooltipRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #94a3b8;
`;

export const StyledTooltipDot = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
`;

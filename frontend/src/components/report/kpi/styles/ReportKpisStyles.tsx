import styled from 'styled-components';

export const StyledKpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: clamp(10px, 1.2vw, 16px);
  margin-bottom: clamp(14px, 2vw, 24px);
`;

export const StyledKpiCard = styled.div<{ $color: string }>`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(11, 17, 32, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: clamp(8px, 1vw, 12px);
  padding: clamp(12px, 1.2vw, 16px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, ${(p) => p.$color}15 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px ${(p) => p.$color}20;
    border-color: ${(p) => p.$color}30;
  }
`;

export const StyledKpiContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StyledKpiInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const StyledKpiTitle = styled.p`
  color: #94a3b8;
  font-size: clamp(10px, 0.9vw, 13px);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledKpiValue = styled.h3`
  color: #fff;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 600;
  margin: 0;
  line-height: 1.1;
`;

export const StyledKpiTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  flex-wrap: wrap;
`;

export const StyledTrendPercentage = styled.span<{ $trend: 'up' | 'down' }>`
  color: ${(p) => (p.$trend === 'up' ? '#10b981' : '#ef4444')};
  font-size: clamp(10px, 0.8vw, 12px);
`;

export const StyledTrendPeriod = styled.span`
  color: #64748b;
  font-size: clamp(9px, 0.7vw, 11px);
`;

export const StyledKpiIcon = styled.div<{ $backgroundColor: string; $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(30px, 3vw, 40px);
  height: clamp(30px, 3vw, 40px);
  background: ${(p) => p.$backgroundColor};
  border-radius: 10px;
  box-shadow: 0 0 20px ${(p) => p.$color}30;
  flex-shrink: 0;

  i {
    font-size: clamp(12px, 1.3vw, 18px);
    color: ${(p) => p.$color};
    filter: drop-shadow(0 0 8px ${(p) => p.$color}60);
  }
`;

export const StyledKpiChart = styled.div<{ $color: string }>`
  width: clamp(40px, 5vw, 70px);
  height: clamp(20px, 2.5vw, 35px);
  margin-top: 6px;
  position: relative;

  svg path {
    stroke: ${(p) => p.$color};
    filter: drop-shadow(0 0 3px ${(p) => p.$color}60);
  }
`;
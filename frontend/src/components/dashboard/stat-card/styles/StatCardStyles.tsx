import styled from 'styled-components';

export const StyledCard = styled.div<{ $color: string }>`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(11, 17, 32, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: clamp(8px, 1vw, 12px);
  padding: clamp(10px, 1.2vw, 16px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, ${props => props.$color}15 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(135deg, ${props => props.$color}40 0%, transparent 50%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px ${props => props.$color}20;
    border-color: ${props => props.$color}30;
  }
`;

export const StyledCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StyledCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 0.5vw, 8px);
  min-width: 0;
`;

export const StyledCardTitle = styled.p`
  color: #94a3b8;
  font-size: clamp(10px, 0.9vw, 13px);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledCardValue = styled.h3`
  color: #fff;
  font-size: clamp(16px, 2vw, 24px);
  font-weight: 600;
  margin: 0;
  line-height: 1.1;
`;

export const StyledCardTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: clamp(2px, 0.3vw, 6px);
  flex-wrap: wrap;
`;

export const StyledTrendPercentage = styled.span<{ $trend: 'up' | 'down' }>`
  color: ${props => props.$trend === 'up' ? '#10b981' : '#ef4444'};
  font-size: clamp(10px, 0.8vw, 12px);
`;

export const StyledTrendPeriod = styled.span`
  color: #64748b;
  font-size: clamp(9px, 0.7vw, 11px);
`;

export const StyledIconContainer = styled.div<{ $backgroundColor: string; $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(28px, 3vw, 40px);
  height: clamp(28px, 3vw, 40px);
  background: ${props => props.$backgroundColor};
  border-radius: clamp(8px, 0.8vw, 10px);
  position: relative;
  box-shadow: 0 0 20px ${props => props.$color}30;
  flex-shrink: 0;
  
  i {
    font-size: clamp(12px, 1.3vw, 18px);
    color: ${props => props.$color};
    filter: drop-shadow(0 0 8px ${props => props.$color}60);
  }
`;

export const StyledChartContainer = styled.div<{ $color: string }>`
  width: clamp(40px, 5vw, 70px);
  height: clamp(20px, 2.5vw, 35px);
  margin-top: clamp(4px, 0.5vw, 8px);
  position: relative;
  
  svg {
    path {
      stroke: ${props => props.$color};
      filter: drop-shadow(0 0 3px ${props => props.$color}60);
    }
  }
`;
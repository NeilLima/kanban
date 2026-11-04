'use client';

import React from 'react';
import { useStatCard } from '../utils/StatCardUtils';
import { generateChartPath } from '../utils/StatCardUtils';
import { StyledCard, StyledCardContent, StyledCardInfo, StyledCardTitleRow, StyledCardTitle, StyledCardValue, StyledCardTrend, StyledTrendPercentage, StyledTrendPeriod, StyledIconContainer, StyledChartContainer } from '../styles/StatCardStyles';
import type { StatCardCompProps } from '../types/StatCardTypes';

export default function StatCardComp({ stat }: StatCardCompProps) {
  const { actions } = useStatCard();

  return (
    <StyledCard $color={stat.color} onClick={() => actions.handleClick(stat.id)} data-testid="stat-card">
      <StyledCardContent>
        <StyledCardInfo>
          <StyledCardTitleRow>
            <StyledIconContainer $backgroundColor={stat.backgroundColor} $color={stat.color}>
              <i className={stat.icon}></i>
            </StyledIconContainer>
            <StyledCardTitle>{stat.title}</StyledCardTitle>
          </StyledCardTitleRow>
          <StyledCardValue>{stat.value}</StyledCardValue>
          <StyledCardTrend>
            <StyledTrendPercentage $trend={stat.trend}>
              {stat.trend === 'up' ? '↑' : '↓'} {stat.percentage}
            </StyledTrendPercentage>
            <StyledTrendPeriod>este mês</StyledTrendPeriod>
          </StyledCardTrend>
        </StyledCardInfo>
        <StyledChartContainer $color={stat.chartColor}>
          <svg width="100%" height="100%" viewBox="0 0 80 40" preserveAspectRatio="none">
            <path
              d={generateChartPath(stat.chartData)}
              fill="none"
              strokeWidth="2"
            />
          </svg>
        </StyledChartContainer>
      </StyledCardContent>
    </StyledCard>
  );
}

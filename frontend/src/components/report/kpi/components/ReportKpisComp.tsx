'use client';

import React from 'react';
import { useReportKpis, generateChartPath } from '../utils/ReportKpisUtils';
import {
  StyledKpiGrid,
  StyledKpiCard,
  StyledKpiContent,
  StyledKpiInfo,
  StyledKpiTitle,
  StyledKpiValue,
  StyledKpiTrend,
  StyledTrendPercentage,
  StyledTrendPeriod,
  StyledKpiIcon,
  StyledKpiChart,
} from '../styles/ReportKpisStyles';

export default function ReportKpisComp() {
  const { state } = useReportKpis();

  return (
    <StyledKpiGrid>
      {state.kpis.map((kpi) => (
        <StyledKpiCard key={kpi.id} $color={kpi.color}>
          <StyledKpiContent>
            <StyledKpiInfo>
              <StyledKpiTitle>{kpi.title}</StyledKpiTitle>
              <StyledKpiValue>
                {kpi.value}
                {kpi.suffix}
              </StyledKpiValue>
              <StyledKpiTrend>
                <StyledTrendPercentage $trend={kpi.trend}>
                  {kpi.trend === 'up' ? '↑' : '↓'} {kpi.percentage}
                </StyledTrendPercentage>
                <StyledTrendPeriod>período</StyledTrendPeriod>
              </StyledKpiTrend>
            </StyledKpiInfo>
            <StyledKpiIcon $backgroundColor={kpi.backgroundColor} $color={kpi.color}>
              <i className={kpi.icon}></i>
            </StyledKpiIcon>
          </StyledKpiContent>
          <StyledKpiChart $color={kpi.color}>
            <svg width="100%" height="100%" viewBox="0 0 80 40" preserveAspectRatio="none">
              <path d={generateChartPath(kpi.chartData)} fill="none" strokeWidth="2" />
            </svg>
          </StyledKpiChart>
        </StyledKpiCard>
      ))}
    </StyledKpiGrid>
  );
}
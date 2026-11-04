'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ProductivityChartTooltip from './ProductivityChartTooltip';
import {
  StyledChartCard,
  StyledHeader,
  StyledTitle,
  StyledSummary,
  StyledSummaryItem,
  StyledChartWrapper,
} from '../styles/ProductivityChartStyles';
import { useProductivityChart, CHART_MARGIN } from '../utils/ProductivityChartUtils';

export default function ProductivityChartComp() {
  const { state } = useProductivityChart();

  return (
    <StyledChartCard>
      <StyledHeader>
        <StyledTitle>
          <i className="bi bi-graph-up-arrow"></i>
          Produtividade da Semana
        </StyledTitle>
        <StyledSummary>
          <StyledSummaryItem $color="#3b82f6">{state.totals.criadas} criadas</StyledSummaryItem>
          <StyledSummaryItem $color="#10b981">{state.totals.concluidas} concluídas</StyledSummaryItem>
        </StyledSummary>
      </StyledHeader>

      <StyledChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={state.data} margin={CHART_MARGIN}>
            <defs>
              <linearGradient id="gradCriadas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradConcluidas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<ProductivityChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.15)' }} />
            <Area
              type="monotone"
              dataKey="criadas"
              name="Criadas"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#gradCriadas)"
            />
            <Area
              type="monotone"
              dataKey="concluidas"
              name="Concluídas"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#gradConcluidas)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </StyledChartWrapper>
    </StyledChartCard>
  );
}

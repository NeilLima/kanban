'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { useTaskDistribution } from '../utils/TaskDistributionUtils';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledChartWrapper,
  StyledLegend,
  StyledLegendItem,
  StyledLegendDot,
  StyledTooltip,
  StyledTooltipLabel,
  StyledTooltipValue,
} from '../styles/TaskDistributionStyles';

interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0];
  return (
    <StyledTooltip>
      <StyledTooltipLabel>{entry.name}</StyledTooltipLabel>
      <StyledTooltipValue $color={entry.color}>
        {entry.value} tarefas
      </StyledTooltipValue>
    </StyledTooltip>
  );
}

export default function TaskDistributionComp() {
  const { state } = useTaskDistribution();

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Distribuição por Status</StyledCardTitle>
      </StyledCardHeader>
      <StyledChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={state.items} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} width={30} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="value" name="Tarefas" radius={[6, 6, 0, 0]}>
              {state.items.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </StyledChartWrapper>
      <StyledLegend>
        {state.items.map((item) => (
          <StyledLegendItem key={item.name}>
            <StyledLegendDot $color={item.color} />
            {item.name}
          </StyledLegendItem>
        ))}
      </StyledLegend>
    </StyledCard>
  );
}
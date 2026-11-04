'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useProductivityChart } from '../utils/ProductivityChartUtils';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledChartWrapper,
  StyledTooltip,
  StyledTooltipLabel,
  StyledTooltipValue,
} from '../styles/ProductivityChartStyles';

interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <StyledTooltip>
      <StyledTooltipLabel>Semana {label}</StyledTooltipLabel>
      {payload.map((entry, idx) => (
        <StyledTooltipValue key={idx} $color={entry.color}>
          {entry.name}: {entry.value}
        </StyledTooltipValue>
      ))}
    </StyledTooltip>
  );
}

export default function ProductivityChartComp() {
  const { state } = useProductivityChart();

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Produtividade Semanal</StyledCardTitle>
      </StyledCardHeader>
      <StyledChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={state.points} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} width={30} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
            <Line
              type="monotone"
              dataKey="concluidas"
              name="Concluídas"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3, fill: '#10b981' }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="pendentes"
              name="Pendentes"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3, fill: '#f59e0b' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </StyledChartWrapper>
    </StyledCard>
  );
}
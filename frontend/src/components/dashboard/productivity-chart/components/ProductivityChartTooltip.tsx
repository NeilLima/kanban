import React from 'react';
import type { ProductivityChartTooltipProps } from '../types/ProductivityChartTypes';
import { isTooltipVisible } from '../utils/ProductivityChartUtils';
import {
  StyledTooltipBox,
  StyledTooltipTitle,
  StyledTooltipRow,
  StyledTooltipDot,
} from '../styles/ProductivityChartStyles';

export default function ProductivityChartTooltip({ active, payload, label }: ProductivityChartTooltipProps) {
  if (!isTooltipVisible(active, payload)) return null;

  return (
    <StyledTooltipBox>
      <StyledTooltipTitle>{label}</StyledTooltipTitle>
      {payload?.map((item) => (
        <StyledTooltipRow key={item.name}>
          <StyledTooltipDot $color={item.color}>●</StyledTooltipDot>
          {item.name}: <strong>{item.value}</strong>
        </StyledTooltipRow>
      ))}
    </StyledTooltipBox>
  );
}
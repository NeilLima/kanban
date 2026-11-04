'use client';

import React from 'react';
import { useTimeSpent } from '../utils/TimeSpentUtils';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledBarRow,
  StyledBarLabel,
  StyledBarTrack,
  StyledBarFill,
  StyledBarValue,
  StyledTaskCount,
} from '../styles/TimeSpentStyles';

export default function TimeSpentComp() {
  const { state, maxHours } = useTimeSpent();

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Tempo Gasto por Projeto</StyledCardTitle>
      </StyledCardHeader>
      {state.items.map((item) => {
        const width = maxHours > 0 ? Math.round((item.horas / maxHours) * 100) : 0;
        return (
          <StyledBarRow key={item.project}>
            <StyledBarLabel>{item.project}</StyledBarLabel>
            <StyledBarTrack>
              <StyledBarFill $color={item.color} $width={width} />
            </StyledBarTrack>
            <StyledBarValue>
              {item.horas}h
              <StyledTaskCount>{item.tarefas} tarefas</StyledTaskCount>
            </StyledBarValue>
          </StyledBarRow>
        );
      })}
    </StyledCard>
  );
}
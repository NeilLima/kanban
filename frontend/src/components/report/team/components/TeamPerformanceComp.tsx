'use client';

import React from 'react';
import { useTeamPerformance } from '../utils/TeamPerformanceUtils';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledTeamRow,
  StyledTeamAvatar,
  StyledTeamInfo,
  StyledTeamName,
  StyledTeamRole,
  StyledTeamTasks,
  StyledTeamProgress,
  StyledTeamTrack,
  StyledTeamFill,
  StyledTeamValue,
} from '../styles/TeamPerformanceStyles';

export default function TeamPerformanceComp() {
  const { state } = useTeamPerformance();

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Desempenho da Equipe</StyledCardTitle>
      </StyledCardHeader>
      {state.team.map((member) => (
        <StyledTeamRow key={member.id}>
          <StyledTeamAvatar $color={member.color}>
            {member.name.charAt(0).toUpperCase()}
          </StyledTeamAvatar>
          <StyledTeamInfo>
            <StyledTeamName>{member.name}</StyledTeamName>
            <StyledTeamRole>{member.role}</StyledTeamRole>
          </StyledTeamInfo>
          <StyledTeamTasks>{member.tarefasConcluidas} concluídas</StyledTeamTasks>
          <StyledTeamProgress>
            <StyledTeamTrack>
              <StyledTeamFill $color={member.color} $width={member.produtividade} />
            </StyledTeamTrack>
          </StyledTeamProgress>
          <StyledTeamValue>{member.produtividade}%</StyledTeamValue>
        </StyledTeamRow>
      ))}
    </StyledCard>
  );
}
'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useTeam } from '../utils/TeamUtils';
import {
  StyledTeamGrid,
  StyledMemberCard,
  StyledMemberAvatar,
  StyledMemberName,
  StyledMemberRole,
  StyledMemberEmail,
  StyledMemberStats,
  StyledStat,
  StyledStatValue,
  StyledStatLabel,
  StyledRoleBadge,
  StyledMemberYou,
} from '../styles/TeamStyles';

export default function TeamComp() {
  const { state } = useTeam();

  return (
    <AppShell
      title="Equipe"
      subtitle="Gerencie os membros, cargos e permissões da sua equipe."
    >
      {state.loading && (
        <p className="text-secondary" data-testid="team-loading">
          Carregando equipe...
        </p>
      )}

      {!state.loading && state.members.length === 0 && (
        <p className="text-secondary" data-testid="team-empty">
          Nenhum membro encontrado nos seus projetos.
        </p>
      )}

      <StyledTeamGrid data-testid="team-grid">
        {state.members.map((m) => (
          <StyledMemberCard key={m.id} data-testid={`team-member-${m.id}`}>
            <StyledMemberAvatar
              $color={m.color}
              $avatarUrl={m.avatarUrl}
              data-testid={`team-avatar-${m.id}`}
            >
              {m.avatarUrl ? (
                <img src={m.avatarUrl} alt={m.name} data-testid={`team-avatar-img-${m.id}`} />
              ) : (
                m.name.charAt(0)
              )}
            </StyledMemberAvatar>
            <StyledMemberName data-testid={`team-name-${m.id}`}>
              {m.name}
              {m.isMe && <StyledMemberYou data-testid={`team-you-${m.id}`}>(Você)</StyledMemberYou>}
            </StyledMemberName>
            <StyledMemberRole>{m.role}</StyledMemberRole>
            <StyledMemberEmail>{m.email}</StyledMemberEmail>
            <StyledRoleBadge $color={m.color}>{m.badge}</StyledRoleBadge>
            <StyledMemberStats>
              <StyledStat>
                <StyledStatValue $color="#3b82f6">{m.tasks}</StyledStatValue>
                <StyledStatLabel>Tarefas</StyledStatLabel>
              </StyledStat>
              <StyledStat>
                <StyledStatValue $color="#10b981">{m.done}</StyledStatValue>
                <StyledStatLabel>Concluídas</StyledStatLabel>
              </StyledStat>
              <StyledStat>
                <StyledStatValue $color="#f59e0b">{m.percent}%</StyledStatValue>
                <StyledStatLabel>Aproveit.</StyledStatLabel>
              </StyledStat>
            </StyledMemberStats>
          </StyledMemberCard>
        ))}
      </StyledTeamGrid>
    </AppShell>
  );
}

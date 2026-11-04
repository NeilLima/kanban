'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useUser } from '../utils/UserUtils';
import type { UserTypes } from '../types/UserTypes';
import {
  StyledUserCard,
  StyledUserAvatar,
  StyledUserName,
  StyledUserMe,
  StyledUserEmail,
  StyledUserRole,
  StyledUserStats,
  StyledUserStat,
  StyledUserStatValue,
  StyledUserStatLabel,
  StyledEmpty,
  StyledEmptyText,
} from '../styles/UserStyles';

export default function UserComp({ userId }: UserTypes) {
  const { state } = useUser(userId);

  if (state.loading && !state.user) {
    return (
      <AppShell title="Usuário" subtitle="Carregando...">
        <p className="text-secondary" data-testid="user-loading">
          Carregando usuário...
        </p>
      </AppShell>
    );
  }

  if (!state.user) {
    return (
      <AppShell title="Usuário" subtitle="Não encontrado">
        <StyledEmpty data-testid="user-empty">
          <StyledEmptyText data-testid="user-empty-text">Usuário não encontrado.</StyledEmptyText>
        </StyledEmpty>
      </AppShell>
    );
  }

  const u = state.user;

  return (
    <AppShell
      title={u.name}
      subtitle={`Perfil de ${u.email} • ${u.role}`}
      headerActions={
        <button className="btn btn-outline-primary btn-sm" data-testid="user-back">
          <i className="bi bi-arrow-left me-1"></i>Voltar
        </button>
      }
    >
      <StyledUserCard data-testid="user-card">
        <StyledUserAvatar $color={u.color} $avatarUrl={u.avatarUrl} data-testid="user-avatar">
          {u.avatarUrl ? (
            <img src={u.avatarUrl} alt={u.name} data-testid="user-avatar-img" />
          ) : (
            u.name.charAt(0)
          )}
        </StyledUserAvatar>
        <StyledUserName data-testid="user-name">
          {u.name}
          {u.isMe && <StyledUserMe data-testid="user-me">(Você)</StyledUserMe>}
        </StyledUserName>
        <StyledUserEmail data-testid="user-email">{u.email}</StyledUserEmail>
        <StyledUserRole data-testid="user-role">{u.role}</StyledUserRole>
        <StyledUserStats data-testid="user-stats">
          <StyledUserStat data-testid="user-stat-total">
            <StyledUserStatValue $color="#3b82f6" data-testid="user-stat-total-value">
              {u.tasksTotal}
            </StyledUserStatValue>
            <StyledUserStatLabel data-testid="user-stat-total-label">Tarefas</StyledUserStatLabel>
          </StyledUserStat>
          <StyledUserStat data-testid="user-stat-done">
            <StyledUserStatValue $color="#10b981" data-testid="user-stat-done-value">
              {u.tasksDone}
            </StyledUserStatValue>
            <StyledUserStatLabel data-testid="user-stat-done-label">Concluídas</StyledUserStatLabel>
          </StyledUserStat>
          <StyledUserStat data-testid="user-stat-pending">
            <StyledUserStatValue $color="#f59e0b" data-testid="user-stat-pending-value">
              {u.tasksPending}
            </StyledUserStatValue>
            <StyledUserStatLabel data-testid="user-stat-pending-label">Pendentes</StyledUserStatLabel>
          </StyledUserStat>
        </StyledUserStats>
      </StyledUserCard>
    </AppShell>
  );
}

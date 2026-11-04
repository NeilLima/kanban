'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useProfile } from '../utils/ProfileUtils';
import type { ProfileTypes } from '../types/ProfileTypes';
import {
  StyledProfileContainer,
  StyledProfileTitle,
  StyledProfileCard,
  StyledProfileAvatar,
  StyledProfileName,
  StyledProfileEmail,
  StyledProfileRole,
} from '../styles/ProfileStyles';

export default function ProfileComp({ userId }: ProfileTypes) {
  const { state } = useProfile(userId);

  return (
    <AppShell title="Perfil" subtitle="Suas informações pessoais">
      <StyledProfileContainer data-testid="profile-container">
        <StyledProfileTitle data-testid="profile-title">Perfil</StyledProfileTitle>
        <StyledProfileCard data-testid="profile-card">
          <StyledProfileAvatar $avatarUrl={state.profile?.avatarUrl} data-testid="profile-avatar">
            {state.profile?.avatarUrl ? (
              <img src={state.profile.avatarUrl} alt={state.profile.name} data-testid="profile-avatar-img" />
            ) : (
              state.profile?.name.charAt(0) || 'U'
            )}
          </StyledProfileAvatar>
          <StyledProfileName data-testid="profile-name">{state.profile?.name || 'Usuário'}</StyledProfileName>
          <StyledProfileEmail data-testid="profile-email">{state.profile?.email}</StyledProfileEmail>
          <StyledProfileRole data-testid="profile-role">{state.profile?.role}</StyledProfileRole>
        </StyledProfileCard>
      </StyledProfileContainer>
    </AppShell>
  );
}

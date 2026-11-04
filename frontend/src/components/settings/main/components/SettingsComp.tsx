'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useSettings } from '../utils/SettingsUtils';
import type { SettingsTypes } from '../types/SettingsTypes';
import {
  StyledSettingsContainer,
  StyledSettingsTitle,
  StyledSettingsCard,
  StyledSettingsLabel,
  StyledSettingsInput,
  StyledSettingsButton,
} from '../styles/SettingsStyles';

export default function SettingsComp({ userId }: SettingsTypes) {
  const { state } = useSettings(userId);

  return (
    <AppShell title="Configurações" subtitle="Suas preferências e conta">
      <StyledSettingsContainer data-testid="settings-container">
        <StyledSettingsTitle data-testid="settings-title">Configurações</StyledSettingsTitle>
        <StyledSettingsCard data-testid="settings-card">
          <StyledSettingsLabel htmlFor="name" data-testid="settings-label-name">Nome</StyledSettingsLabel>
          <StyledSettingsInput id="name" defaultValue={state.settings?.name} data-testid="settings-input-name" />
          <StyledSettingsLabel htmlFor="email" data-testid="settings-label-email">E-mail</StyledSettingsLabel>
          <StyledSettingsInput id="email" defaultValue={state.settings?.email} data-testid="settings-input-email" />
          <StyledSettingsButton data-testid="settings-save">Salvar</StyledSettingsButton>
        </StyledSettingsCard>
      </StyledSettingsContainer>
    </AppShell>
  );
}

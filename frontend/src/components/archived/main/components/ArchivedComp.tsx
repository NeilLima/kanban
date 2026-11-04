'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useArchived } from '../utils/ArchivedUtils';
import type { ArchivedTypes } from '../types/ArchivedTypes';
import {
  StyledArchivedContainer,
  StyledArchivedTitle,
  StyledEmpty,
} from '../styles/ArchivedStyles';

export default function ArchivedComp({ archivedItems }: ArchivedTypes) {
  const { state } = useArchived();

  return (
    <AppShell title="Arquivados" subtitle="Itens arquivados">
      <StyledArchivedContainer data-testid="archived-container">
        <StyledArchivedTitle data-testid="archived-title">Arquivados</StyledArchivedTitle>
        {state.items.length === 0 ? (
          <StyledEmpty data-testid="archived-empty">
            <p data-testid="archived-empty-text">Nenhum item arquivado.</p>
          </StyledEmpty>
        ) : (
          <div data-testid="archived-list">
            {state.items.map((item) => (
              <div key={item.id} data-testid={`archived-item-${item.id}`}>
                {item.title} ({item.type})
              </div>
            ))}
          </div>
        )}
      </StyledArchivedContainer>
    </AppShell>
  );
}

'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useTrash } from '../utils/TrashUtils';
import type { TrashTypes } from '../types/TrashTypes';
import {
  StyledTrashContainer,
  StyledTrashTitle,
  StyledEmpty,
} from '../styles/TrashStyles';

export default function TrashComp({ trashedItems }: TrashTypes) {
  const { state } = useTrash();

  return (
    <AppShell title="Lixeira" subtitle="Itens excluídos">
      <StyledTrashContainer data-testid="trash-container">
        <StyledTrashTitle data-testid="trash-title">Lixeira</StyledTrashTitle>
        {state.items.length === 0 ? (
          <StyledEmpty data-testid="trash-empty">
            <p data-testid="trash-empty-text">Nenhum item na lixeira.</p>
          </StyledEmpty>
        ) : (
          <div data-testid="trash-list">
            {state.items.map((item) => (
              <div key={item.id} data-testid={`trash-item-${item.id}`}>
                {item.title} ({item.type})
              </div>
            ))}
          </div>
        )}
      </StyledTrashContainer>
    </AppShell>
  );
}

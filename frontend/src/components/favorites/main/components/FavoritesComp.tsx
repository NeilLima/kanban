'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import ItemsListComp from '@/components/items/main/components/ItemsListComp';
import { useFavorites } from '../utils/FavoritesUtils';

export default function FavoritesComp() {
  const { state, actions } = useFavorites();

  return (
    <AppShell
      title="Favoritos"
      subtitle="Acesso rápido aos projetos que você mais usa."
    >
      {state.loading && (
        <p className="text-secondary" data-testid="favorites-loading">
          Carregando favoritos...
        </p>
      )}
      {!state.loading && state.items.length === 0 && (
        <p className="text-secondary d-none" data-testid="favorites-vazio-indutor" />
      )}
      <div data-testid="favorites-list">
        <ItemsListComp
          items={state.items}
          emptyIcon="bi-star"
          emptyTitle="Nenhum favorito ainda"
          emptyText="Marque projetos como favoritos para vê-los aqui."
          restoreLabel="Abrir"
          deleteLabel="Remover"
          onRestore={actions.handleAbrir}
          onDelete={actions.handleRemover}
        />
      </div>
    </AppShell>
  );
}
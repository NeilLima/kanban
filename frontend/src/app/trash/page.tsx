'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import ItemsListComp from '@/components/items/main/components/ItemsListComp';
import type { ItemEntry } from '@/components/items/main/components/ItemsListComp';

const TRASH_ITEMS: ItemEntry[] = [
  { id: '1', name: 'Campanha de Marketing', description: 'Projeto de campanha de marketing digital do Q1.', date: 'Excluído em 12 Mai', icon: 'bi-megaphone', color: '#ef4444' },
  { id: '2', name: 'Protótipo antigo', description: 'Protótipo descartado após mudança de escopo.', date: 'Excluído em 05 Mai', icon: 'bi-file-earmark', color: '#f59e0b' },
];

export default function TrashComp() {
  return (
    <AppShell
      title="Lixeira"
      subtitle="Itens excluídos. Restaure ou exclua permanentemente."
      headerActions={
        <button className="btn btn-outline-danger" style={{ fontSize: 13, fontWeight: 500 }}>
          <i className="bi bi-trash me-1"></i>Esvaziar Lixeira
        </button>
      }
    >
      <ItemsListComp
        items={TRASH_ITEMS}
        emptyIcon="bi-trash2"
        emptyTitle="A lixeira está vazia"
        emptyText="Itens excluídos aparecerão aqui por 30 dias."
        restoreLabel="Restaurar"
        deleteLabel="Excluir"
      />
    </AppShell>
  );
}

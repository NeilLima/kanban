'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import ItemsListComp from '@/components/items/main/components/ItemsListComp';
import type { ItemEntry } from '@/components/items/main/components/ItemsListComp';

const ARCHIVED_ITEMS: ItemEntry[] = [
  { id: '1', name: 'Website Redesign', description: 'Redesign completo do site institucional com nova identidade visual.', date: 'Arquivado em 10 Mai', icon: 'bi-globe', color: '#3b82f6' },
  { id: '2', name: 'App Mobile v1.0', description: 'Primeira versão do aplicativo mobile para iOS e Android.', date: 'Arquivado em 28 Abr', icon: 'bi-phone', color: '#8b5cf6' },
  { id: '3', name: 'Integração CRM', description: 'Integração do sistema com o CRM de vendas da empresa.', date: 'Arquivado em 15 Abr', icon: 'bi-diagram-3', color: '#10b981' },
];

export default function ArchivedComp() {
  return (
    <AppShell
      title="Arquivados"
      subtitle="Projetos e tarefas arquivados. Restaure quando precisar."
    >
      <ItemsListComp
        items={ARCHIVED_ITEMS}
        emptyIcon="bi-archive"
        emptyTitle="Nenhum item arquivado"
        emptyText="Itens arquivados aparecerão aqui."
        restoreLabel="Restaurar"
        deleteLabel="Excluir"
      />
    </AppShell>
  );
}

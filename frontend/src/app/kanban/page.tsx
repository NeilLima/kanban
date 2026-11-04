'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import BoardComp from '@/shared/kanban/board/components/BoardComp';
import { kanbanFilterActions, kanbanFilterConfig } from '@/app/kanban/kanbanData';

const FILTER_BAR_STYLE: React.CSSProperties = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12,
  padding: '10px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  flexWrap: 'wrap',
};

const FILTER_BUTTON_STYLE: React.CSSProperties = { fontSize: 13 };

function KanbanPageInner() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project') || 'default-project';

  return (
    <AppShell
      title="Kanban"
      subtitle="Acompanhe e mova as tarefas entre as colunas do quadro."
      headerActions={
        <button className="btn btn-primary" style={{ fontSize: 13, fontWeight: 500 }}>
          <i className="bi bi-plus-lg me-1"></i>Nova Tarefa
        </button>
      }
    >
      <div style={FILTER_BAR_STYLE}>
        <input
          className="form-control form-control-sm"
          placeholder="Buscar tarefa..."
          style={{ maxWidth: 320, backgroundColor: '#0B1120', borderColor: 'rgba(255,255,255,0.06)', color: '#F8FAFC', fontSize: 13 }}
        />
        <div className="d-flex align-items-center gap-2 flex-wrap">
          {kanbanFilterConfig.map((filter) => (
            <button key={filter} className="btn btn-outline-secondary btn-sm" style={FILTER_BUTTON_STYLE} onClick={kanbanFilterActions.onFilterClick}>
              <i className="bi bi-funnel me-1"></i>{filter} <i className="bi bi-chevron-down ms-1" style={{ fontSize: 10 }}></i>
            </button>
          ))}
        </div>
      </div>

      <BoardComp projectId={projectId} />
    </AppShell>
  );
}

export default function KanbanPage() {
  return (
    <Suspense fallback={null}>
      <KanbanPageInner />
    </Suspense>
  );
}

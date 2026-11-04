'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import BoardComp from '@/shared/kanban/board/components/BoardComp';
import TaskCreateModalComp from '@/components/task/main/components/TaskCreateModalComp';
import { useTarefas } from '../utils/TarefasUtils';
import type { TarefasTypes } from '../types/TarefasTypes';
import {
  StyledFilterBar,
  StyledSearchInput,
  StyledFilterGroup,
  StyledFilterButton,
  StyledNovaTarefaButton,
} from '../styles/TarefasStyles';

const FILTER_CONFIG = ['Filtros', 'Ordenar', 'Etiquetas', 'Responsável', 'Prioridade'];

export default function TarefasComp({ projectId }: TarefasTypes) {
  const { state, actions } = useTarefas();

  return (
    <AppShell
      title="Tarefas"
      subtitle="Acompanhe e mova as tarefas entre as colunas do quadro."
      headerActions={
        <StyledNovaTarefaButton
          className="btn btn-primary"
          onClick={actions.handleAbrirCreate}
          data-testid="tarefas-nova-tarefa"
        >
          <i className="bi bi-plus-lg me-1"></i>Nova Tarefa
        </StyledNovaTarefaButton>
      }
    >
      <StyledFilterBar data-testid="tarefas-filter-bar">
        <StyledSearchInput
          className="form-control form-control-sm"
          placeholder="Buscar tarefa..."
          data-testid="tarefas-search-input"
        />
        <StyledFilterGroup className="d-flex align-items-center gap-2 flex-wrap" data-testid="tarefas-filter-group">
          {FILTER_CONFIG.map((filter) => (
            <StyledFilterButton
              key={filter}
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {}}
              data-testid={`tarefas-filter-${filter}`}
            >
              <i className="bi bi-funnel me-1"></i>{filter}
              <i className="bi bi-chevron-down ms-1"></i>
            </StyledFilterButton>
          ))}
        </StyledFilterGroup>
      </StyledFilterBar>

      <BoardComp projectId={projectId} />

      {state.showCreate && (
        <TaskCreateModalComp onClose={actions.handleFecharCreate} columnId="default-column" />
      )}
    </AppShell>
  );
}

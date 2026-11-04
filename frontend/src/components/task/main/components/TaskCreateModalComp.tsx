'use client';

import React from 'react';
import { useTaskCreate } from '../utils/TaskUtils';
import {
  StyledTaskModalOverlay,
  StyledTaskModal,
  StyledTaskModalHeader,
  StyledTaskModalTitle,
  StyledTaskCloseButton,
  StyledTaskField,
  StyledTaskLabel,
  StyledTaskInput,
  StyledTaskTextarea,
  StyledTaskSelect,
  StyledTaskDate,
  StyledTaskTagsHint,
  StyledTaskFooter,
  StyledTaskCancelButton,
  StyledTaskSubmitButton,
} from '../styles/TaskStyles';

export default function TaskCreateModalComp({
  onClose,
  columnId,
}: {
  onClose: () => void;
  columnId: string;
}) {
  const { state, actions, isLoading, STATUS_OPTIONS, PRIORITY_OPTIONS } =
    useTaskCreate(columnId);

  if (isLoading) {
    return (
      <StyledTaskModalOverlay onClick={onClose} data-testid="task-create-modal-overlay">
        <StyledTaskModal onClick={(e) => e.stopPropagation()} data-testid="task-create-modal">
          <StyledTaskModalHeader data-testid="task-create-modal-header">
            <StyledTaskModalTitle data-testid="task-create-modal-title">Nova Tarefa</StyledTaskModalTitle>
            <StyledTaskCloseButton onClick={onClose} data-testid="task-create-close">
              <i className="bi bi-x-lg"></i>
            </StyledTaskCloseButton>
          </StyledTaskModalHeader>
          <div style={{ textAlign: 'center', padding: 20, color: '#94a3b8' }}>
            Carregando opções...
          </div>
        </StyledTaskModal>
      </StyledTaskModalOverlay>
    );
  }

  return (
    <StyledTaskModalOverlay onClick={onClose} data-testid="task-create-modal-overlay">
      <StyledTaskModal onClick={(e) => e.stopPropagation()} data-testid="task-create-modal">
        <StyledTaskModalHeader data-testid="task-create-modal-header">
          <StyledTaskModalTitle data-testid="task-create-modal-title">Nova Tarefa</StyledTaskModalTitle>
          <StyledTaskCloseButton onClick={onClose} data-testid="task-create-close">
            <i className="bi bi-x-lg"></i>
          </StyledTaskCloseButton>
        </StyledTaskModalHeader>

        <StyledTaskField data-testid="task-create-field-title">
          <StyledTaskLabel data-testid="task-create-label-title">
            Nome da tarefa <span style={{ color: '#ef4444' }}>*</span>
          </StyledTaskLabel>
          <StyledTaskInput
            data-testid="task-create-input-title"
            placeholder="Ex: Criar landing page"
            value={state.title}
            onChange={(e) => actions.handleTitleChange(e.target.value)}
          />
        </StyledTaskField>

        <StyledTaskField data-testid="task-create-field-description">
          <StyledTaskLabel data-testid="task-create-label-description">Descrição</StyledTaskLabel>
          <StyledTaskTextarea
            data-testid="task-create-input-description"
            placeholder="Descreva o que precisa ser feito..."
            value={state.description}
            onChange={(e) => actions.handleDescriptionChange(e.target.value)}
          />
        </StyledTaskField>

        <StyledTaskField data-testid="task-create-field-status">
          <StyledTaskLabel data-testid="task-create-label-status">
            Status <span style={{ color: '#ef4444' }}>*</span>
          </StyledTaskLabel>
          <StyledTaskSelect
            data-testid="task-create-select-status"
            value={state.status}
            onChange={(e) => actions.handleStatusChange(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </StyledTaskSelect>
        </StyledTaskField>

        <StyledTaskField data-testid="task-create-field-priority">
          <StyledTaskLabel data-testid="task-create-label-priority">
            Nível <span style={{ color: '#ef4444' }}>*</span>
          </StyledTaskLabel>
          <StyledTaskSelect
            data-testid="task-create-select-priority"
            value={state.priority}
            onChange={(e) => actions.handlePriorityChange(e.target.value)}
          >
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </StyledTaskSelect>
        </StyledTaskField>

        <StyledTaskField data-testid="task-create-field-duedate">
          <StyledTaskLabel data-testid="task-create-label-duedate">Data de vencimento</StyledTaskLabel>
          <StyledTaskDate
            data-testid="task-create-input-duedate"
            type="date"
            value={state.dueDate}
            onChange={(e) => actions.handleDueDateChange(e.target.value)}
          />
        </StyledTaskField>

        <StyledTaskField data-testid="task-create-field-assignee">
          <StyledTaskLabel data-testid="task-create-label-assignee">Responsável / Criador</StyledTaskLabel>
          <StyledTaskSelect
            data-testid="task-create-select-assignee"
            value={state.assigneeId}
            onChange={(e) => actions.handleAssigneeIdChange(e.target.value)}
          >
            <option value="">Sem responsável</option>
            {state.users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </StyledTaskSelect>
        </StyledTaskField>

        <StyledTaskField data-testid="task-create-field-tags">
          <StyledTaskLabel data-testid="task-create-label-tags">Etiquetas</StyledTaskLabel>
          <StyledTaskInput
            data-testid="task-create-input-tags"
            placeholder="urgente, frontend, bug"
            value={state.tags}
            onChange={(e) => actions.handleTagsChange(e.target.value)}
          />
          <StyledTaskTagsHint data-testid="task-create-tags-hint">
            Separe por vírgula.
          </StyledTaskTagsHint>
        </StyledTaskField>

        {state.projects.length > 0 && (
          <StyledTaskField data-testid="task-create-field-project">
            <StyledTaskLabel data-testid="task-create-label-project">Projeto</StyledTaskLabel>
            <StyledTaskSelect
              data-testid="task-create-select-project"
              value={state.projectId}
              onChange={(e) => actions.handleProjectIdChange(e.target.value)}
            >
              <option value="">Sem projeto</option>
              {state.projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </StyledTaskSelect>
          </StyledTaskField>
        )}

        <StyledTaskFooter data-testid="task-create-footer">
          <StyledTaskCancelButton onClick={onClose} data-testid="task-create-cancel">
            Cancelar
          </StyledTaskCancelButton>
          <StyledTaskSubmitButton
            onClick={actions.handleSubmit}
            disabled={
              !state.title.trim() ||
              !state.status ||
              !state.priority ||
              state.isSaving
            }
            data-testid="task-create-submit"
          >
            {state.isSaving ? 'Criando...' : 'Criar Tarefa'}
          </StyledTaskSubmitButton>
        </StyledTaskFooter>
      </StyledTaskModal>
    </StyledTaskModalOverlay>
  );
}

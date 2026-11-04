'use client';

import React from 'react';
import { useProjectModal } from '../utils/ProjectModalUtils';
import { PROJECT_COLOR_OPTIONS } from '../types/ProjectModalTypes';
import {
  StyledOverlay,
  StyledModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledCloseButton,
  StyledField,
  StyledLabel,
  StyledInput,
  StyledTextarea,
  StyledColorRow,
  StyledColorButton,
  StyledFooter,
  StyledCancelButton,
  StyledSubmitButton,
} from '../styles/ProjectModalStyles';
import type { ProjectModalProps } from '../types/ProjectModalTypes';

export default function ProjectModalComp({ onClose, onCreate, project, onUpdate }: ProjectModalProps) {
  const { state, actions } = useProjectModal(onClose, onCreate, project, onUpdate);
  const modoEdicao = Boolean(project);

  return (
    <StyledOverlay onClick={actions.handleCancel}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{modoEdicao ? 'Editar Projeto' : 'Novo Projeto'}</StyledModalTitle>
          <StyledCloseButton onClick={actions.handleCancel}>
            <i className="bi bi-x-lg"></i>
          </StyledCloseButton>
        </StyledModalHeader>

        <StyledField>
          <StyledLabel>Nome do projeto</StyledLabel>
          <StyledInput
            placeholder="Ex: Website Redesign"
            value={state.name}
            onChange={(e) => actions.handleNameChange(e.target.value)}
          />
        </StyledField>

        <StyledField>
          <StyledLabel>Descrição</StyledLabel>
          <StyledTextarea
            placeholder="Descreva o objetivo do projeto..."
            value={state.description}
            onChange={(e) => actions.handleDescriptionChange(e.target.value)}
          />
        </StyledField>

        <StyledField>
          <StyledLabel>Cor</StyledLabel>
          <StyledColorRow>
            {PROJECT_COLOR_OPTIONS.map((color) => (
              <StyledColorButton
                key={color}
                $color={color}
                $selected={state.color === color}
                onClick={() => actions.handleColorChange(color)}
              />
            ))}
          </StyledColorRow>
        </StyledField>

        <StyledFooter>
          <StyledCancelButton onClick={actions.handleCancel}>Cancelar</StyledCancelButton>
          <StyledSubmitButton onClick={actions.handleSubmit} disabled={!state.name.trim()}>
            {modoEdicao ? 'Salvar alterações' : 'Criar Projeto'}
          </StyledSubmitButton>
        </StyledFooter>
      </StyledModal>
    </StyledOverlay>
  );
}
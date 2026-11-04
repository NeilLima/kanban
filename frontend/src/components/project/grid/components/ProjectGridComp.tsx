'use client';

import React from 'react';
import ProjectCardComp from '@/components/project/card/components/ProjectCardComp';
import {
  StyledGrid,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/ProjectGridStyles';
import type { ProjectGridProps } from '../types/ProjectGridTypes';

export default function ProjectGridComp({
  projects,
  onToggleFavorite,
  onArchive,
  onDelete,
  onOpen,
  onEdit,
}: ProjectGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <StyledEmptyState>
        <StyledEmptyIcon>
          <i className="bi bi-folder"></i>
        </StyledEmptyIcon>
        <StyledEmptyTitle>Nenhum projeto encontrado</StyledEmptyTitle>
        <StyledEmptyText>Clique em &quot;Novo Projeto&quot; para criar o primeiro.</StyledEmptyText>
      </StyledEmptyState>
    );
  }

  return (
    <StyledGrid>
      {projects.map((project) => (
        <ProjectCardComp
          key={project.id}
          project={project}
          onToggleFavorite={onToggleFavorite}
          onArchive={onArchive}
          onDelete={onDelete}
          onOpen={onOpen}
          onEdit={onEdit}
        />
      ))}
    </StyledGrid>
  );
}
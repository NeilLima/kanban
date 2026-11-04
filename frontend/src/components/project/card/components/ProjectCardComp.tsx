'use client';

import React from 'react';
import {
  StyledCard,
  StyledCardHeader,
  StyledProjectIcon,
  StyledFavoriteButton,
  StyledCardTitle,
  StyledCardDescription,
  StyledProgressRow,
  StyledProgressTrack,
  StyledProgressFill,
  StyledProgressValue,
  StyledCardFooter,
  StyledAvatarGroup,
  StyledAvatar,
  StyledTaskInfo,
  StyledActions,
  StyledArchiveButton,
  StyledDeleteButton,
} from '../styles/ProjectCardStyles';
import type { ProjectCardProps } from '../types/ProjectCardTypes';

export default function ProjectCardComp({
  project,
  onToggleFavorite,
  onDelete,
  onOpen,
  onEdit,
}: ProjectCardProps) {
  return (
    <StyledCard
      $color={project.color || '#3b82f6'}
      onClick={() => onOpen(project.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen(project.id);
      }}
      data-testid={`project-card-${project.id}`}
    >
      <StyledCardHeader>
        <StyledProjectIcon $color={project.color || '#3b82f6'}>
          <i className="bi bi-folder2-open"></i>
        </StyledProjectIcon>
        <StyledFavoriteButton
          $active={project.isFavorite}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(project.id);
          }}
          title={project.isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
        >
          <i className={`bi ${project.isFavorite ? 'bi-star-fill' : 'bi-star'}`}></i>
        </StyledFavoriteButton>
      </StyledCardHeader>

      <StyledCardTitle>{project.name}</StyledCardTitle>
      <StyledCardDescription>{project.description}</StyledCardDescription>

      <StyledProgressRow>
        <StyledProgressTrack>
          <StyledProgressFill
            $color={project.color || '#3b82f6'}
            $width={project.progress}
          />
        </StyledProgressTrack>
        <StyledProgressValue>{project.progress}%</StyledProgressValue>
      </StyledProgressRow>

      <StyledCardFooter>
        <StyledAvatarGroup>
          {project.members.slice(0, 4).map((member) => (
            <StyledAvatar key={member.id} $color={member.color || '#64748b'}>
              {member.name.charAt(0).toUpperCase()}
            </StyledAvatar>
          ))}
        </StyledAvatarGroup>

        <StyledTaskInfo>
          {project.tasksDone}/{project.tasksTotal} tarefas
        </StyledTaskInfo>

        <StyledActions>
          <StyledArchiveButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project.id);
            }}
            title="Editar projeto"
            data-testid={`project-edit-${project.id}`}
          >
            <i className="bi bi-pencil"></i>
          </StyledArchiveButton>
          <StyledDeleteButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project.id);
            }}
            title="Excluir"
            data-testid={`project-delete-${project.id}`}
          >
            <i className="bi bi-trash"></i>
          </StyledDeleteButton>
        </StyledActions>
      </StyledCardFooter>
    </StyledCard>
  );
}
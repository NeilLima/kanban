'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { StyledCard, StyledCardTitle, StyledCardFooter, StyledPriorityBadge, StyledDueDate, StyledCategoryBadge, StyledCardMeta, StyledMetaItem, StyledMetaLeft, StyledAvatarContainer, StyledAvatar, StyledProgressBar, StyledProgressFill } from '../styles/CardStyles';
import type { CardTypes } from '../types/CardTypes';
import type { CardState } from '../types/CardTypes';

const PRIORITY_MAP: Record<string, string> = {
  high: 'Alta', medium: 'Média', low: 'Baixa',
  alta: 'Alta', media: 'Média', baixa: 'Baixa', urgente: 'Urgente',
};

function getPriorityLabel(priority?: string): string {
  return PRIORITY_MAP[priority || 'low'] || 'Baixa';
}

function isOverdue(dueDate?: string): boolean {
  return dueDate ? new Date(dueDate) < new Date() : false;
}

function formatDate(dueDate?: string): string {
  return dueDate ? new Date(dueDate).toLocaleDateString() : '';
}

export default function CardComp({ task, onEdit }: CardTypes) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <StyledCard
        $isDragging={isDragging}
        $color={task.color}
        onClick={() => onEdit?.(task.id)}
      >
        <StyledCardTitle>{task.title}</StyledCardTitle>
        {task.category && (
          <StyledCategoryBadge $category={task.category}>
            {task.category}
          </StyledCategoryBadge>
        )}
        <StyledCardFooter>
          <StyledPriorityBadge $priority={task.priority}>
            {getPriorityLabel(task.priority)}
          </StyledPriorityBadge>
          {task.dueDate && (
            <StyledDueDate $overdue={isOverdue(task.dueDate)}>
              {formatDate(task.dueDate)}
            </StyledDueDate>
          )}
        </StyledCardFooter>
        <StyledCardMeta>
          <StyledMetaLeft>
            {(task.comments ?? 0) > 0 && (
              <StyledMetaItem>
                <i className="bi bi-chat" style={{ fontSize: 12 }}></i>
                <span>{task.comments}</span>
              </StyledMetaItem>
            )}
            {(task.attachments ?? 0) > 0 && (
              <StyledMetaItem>
                <i className="bi bi-paperclip" style={{ fontSize: 12 }}></i>
                <span>{task.attachments}</span>
              </StyledMetaItem>
            )}
          </StyledMetaLeft>
          {task.assignees && task.assignees.length > 0 && (
            <StyledAvatarContainer>
              {task.assignees.map((assignee, idx: number) => (
                <StyledAvatar 
                  key={idx} 
                  $color={assignee.color || '#64748b'}
                  style={{ zIndex: (task.assignees?.length || 0) - idx }}
                >
                  {assignee.name.charAt(0).toUpperCase()}
                </StyledAvatar>
              ))}
            </StyledAvatarContainer>
          )}
        </StyledCardMeta>
        {(task.progress ?? 0) > 0 && (
          <StyledProgressBar>
            <StyledProgressFill $progress={task.progress ?? 0} />
          </StyledProgressBar>
        )}
      </StyledCard>
    </div>
  );
}
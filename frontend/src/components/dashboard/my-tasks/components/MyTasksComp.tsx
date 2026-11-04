'use client';
import React from 'react';
import {
  StyledMyTasksCard,
  StyledHeader,
  StyledTitle,
  StyledLinkButton,
  StyledTaskRow,
  StyledTaskTitle,
  StyledCategory,
  StyledPriority,
  StyledDueDate,
  StyledAvatar,
  StyledProgress,
  StyledEmpty,
} from '../styles/MyTasksStyles';
import { useMyTasks, getPriority, getInitials, formatDueDate } from '../utils/MyTasksUtils';
import type { MyTasksTypes } from '../types/MyTasksTypes';

export default function MyTasksComp({ limit = 5 }: MyTasksTypes) {
  const { state, actions } = useMyTasks(limit);

  return (
    <StyledMyTasksCard>
      <StyledHeader>
        <StyledTitle>
          <i className="bi bi-list-check"></i>
          Tarefas Pendentes
        </StyledTitle>
        <StyledLinkButton onClick={actions.openKanban}>
          Ver quadro completo
          <i className="bi bi-arrow-right" style={{ fontSize: 12 }}></i>
        </StyledLinkButton>
      </StyledHeader>

      {state.loading ? (
        <StyledEmpty>Carregando tarefas...</StyledEmpty>
      ) : state.tasks.length === 0 ? (
        <StyledEmpty>Nenhuma tarefa pendente. Bom trabalho! 🎉</StyledEmpty>
      ) : (
        state.tasks.map((task) => {
          const priority = getPriority(task.priority);
          const assignee = task.assignees?.[0];
          const overdue = task.dueDate
            ? new Date(`${task.dueDate}T23:59:59`) < new Date()
            : false;

          return (
            <StyledTaskRow key={task.id} onClick={() => actions.openTask(task.id)}>
              <StyledPriority $color={priority.color}>{priority.label}</StyledPriority>
              <StyledTaskTitle>{task.title}</StyledTaskTitle>
              {task.category && <StyledCategory $color={task.color}>{task.category}</StyledCategory>}
              {typeof task.progress === 'number' && task.progress > 0 && (
                <StyledProgress>
                  <div style={{ width: `${task.progress}%` }} />
                </StyledProgress>
              )}
              <StyledDueDate $overdue={overdue}>
                <i className="bi bi-calendar3" style={{ fontSize: 11 }}></i>
                {formatDueDate(task.dueDate)}
              </StyledDueDate>
              {assignee && (
                <StyledAvatar $color={assignee.color ?? '#3b82f6'} title={assignee.name}>
                  {getInitials(assignee.name)}
                </StyledAvatar>
              )}
            </StyledTaskRow>
          );
        })
      )}
    </StyledMyTasksCard>
  );
}

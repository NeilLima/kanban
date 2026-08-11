'use client';
import React from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useBoard } from '../utils/BoardUtils';
import ColumnComp from '../../column/components/ColumnComp';
import TaskDetailPanelComp from '@/components/dashboard/task-detail-panel/components/TaskDetailPanelComp';
import { StyledBoard, StyledBoardScroll, StyledLoadingWrapper } from '../styles/BoardStyles';
import type { BoardTypes } from '../types/BoardTypes';

export default function BoardComp({ projectId }: BoardTypes) {
  const { state, actions, selectedTaskId, handleCloseTaskModal, sensors } = useBoard(projectId);

  if (state.loading && state.columns.length === 0) {
    return (
      <StyledLoadingWrapper>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </StyledLoadingWrapper>
    );
  }

  return (
    <StyledBoard>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={actions.handleDragEnd}
      >
        <SortableContext
          items={state.columns.map(col => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          <StyledBoardScroll>
            {state.columns.map((column) => (
              <ColumnComp
                key={column.id}
                column={column}
                tasks={state.tasks.filter(task => task.columnId === column.id)}
                onTaskClick={actions.handleTaskClick}
              />
            ))}
          </StyledBoardScroll>
        </SortableContext>
      </DndContext>

      {selectedTaskId && (
        <TaskDetailPanelComp
          taskId={selectedTaskId}
          onClose={handleCloseTaskModal}
        />
      )}
    </StyledBoard>
  );
}

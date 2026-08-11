'use client';
import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { useColumn } from '../utils/ColumnUtils';
import CardComp from '../../card/components/CardComp';
import { StyledColumn, StyledColumnHeader, StyledColumnTitle, StyledTaskCount, StyledTaskList } from '../styles/ColumnStyles';
import type { ColumnTypes } from '../types/ColumnTypes';

export default function ColumnComp({ column, tasks, onTaskClick }: ColumnTypes) {
  const { attributes, listeners, setNodeRef, style, getSortableContext } = useColumn(column.id);
  const sortableContext = getSortableContext(tasks);

  return (
    <StyledColumn ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <StyledColumnHeader>
        <StyledColumnTitle color={column.color}>
          {column.name}
        </StyledColumnTitle>
        <StyledTaskCount>{tasks.length}</StyledTaskCount>
      </StyledColumnHeader>

      <StyledTaskList>
        <SortableContext items={sortableContext.items} strategy={sortableContext.strategy}>
          {tasks.map((task) => (
            <CardComp
              key={task.id}
              task={task}
              onEdit={onTaskClick}
            />
          ))}
        </SortableContext>
      </StyledTaskList>
    </StyledColumn>
  );
}
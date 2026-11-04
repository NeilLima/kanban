'use client';
import React from 'react';
import {
  StyledDeadlinesCard,
  StyledHeader,
  StyledTitle,
  StyledLinkButton,
  StyledList,
  StyledDeadlineRow,
  StyledDateBadge,
  StyledDateDay,
  StyledDateMonth,
  StyledDeadlineInfo,
  StyledDeadlineTitle,
  StyledDeadlineMeta,
  StyledDaysLeft,
} from '../styles/DeadlinesStyles';
import { useDeadlines } from '../utils/DeadlinesUtils';

export default function DeadlinesComp() {
  const { state, actions } = useDeadlines();

  return (
    <StyledDeadlinesCard>
      <StyledHeader>
        <StyledTitle>
          <i className="bi bi-alarm"></i>
          Próximos Prazos
        </StyledTitle>
        <StyledLinkButton onClick={actions.openKanban} data-testid="deadlines-see-board">
          Ver quadro
          <i className="bi bi-arrow-right ms-1"></i>
        </StyledLinkButton>
      </StyledHeader>

      <StyledList>
        {state.deadlines.map((deadline) => (
          <StyledDeadlineRow
            key={deadline.id}
            onClick={actions.openKanban}
            data-testid="deadline-row"
          >
            <StyledDateBadge $color={deadline.color} $overdue={deadline.overdue}>
              <StyledDateDay $overdue={deadline.overdue}>{deadline.day}</StyledDateDay>
              <StyledDateMonth $overdue={deadline.overdue}>{deadline.monthLabel}</StyledDateMonth>
            </StyledDateBadge>
            <StyledDeadlineInfo>
              <StyledDeadlineTitle>{deadline.title}</StyledDeadlineTitle>
              <StyledDeadlineMeta $color={deadline.color}>{deadline.meta}</StyledDeadlineMeta>
            </StyledDeadlineInfo>
            <StyledDaysLeft $overdue={deadline.overdue}>{deadline.daysLabel}</StyledDaysLeft>
          </StyledDeadlineRow>
        ))}
      </StyledList>
    </StyledDeadlinesCard>
  );
}

'use client';

import React from 'react';
import {
  StyledItemsGrid,
  StyledItemCard,
  StyledItemHeader,
  StyledItemIcon,
  StyledItemTitle,
  StyledItemDate,
  StyledItemDescription,
  StyledItemActions,
  StyledDeleteButton,
  StyledEmptyState,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/ItemsStyles';

export interface ItemEntry {
  id: string;
  name: string;
  description: string;
  date: string;
  icon: string;
  color: string;
}

interface ItemsListCompProps {
  items: ItemEntry[];
  emptyIcon: string;
  emptyTitle: string;
  emptyText: string;
  restoreLabel: string;
  deleteLabel: string;
  onRestore?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ItemsListComp({
  items,
  emptyIcon,
  emptyTitle,
  emptyText,
  restoreLabel,
  deleteLabel,
  onRestore,
  onDelete,
}: ItemsListCompProps) {
  if (items.length === 0) {
    return (
      <StyledEmptyState>
        <i className={`bi ${emptyIcon}`}></i>
        <StyledEmptyTitle>{emptyTitle}</StyledEmptyTitle>
        <StyledEmptyText>{emptyText}</StyledEmptyText>
      </StyledEmptyState>
    );
  }

  return (
    <StyledItemsGrid>
      {items.map((item) => (
        <StyledItemCard key={item.id}>
          <StyledItemHeader>
            <div className="d-flex align-items-center gap-2" style={{ minWidth: 0 }}>
              <StyledItemIcon $color={item.color}>
                <i className={`bi ${item.icon}`}></i>
              </StyledItemIcon>
              <StyledItemTitle>{item.name}</StyledItemTitle>
            </div>
            <StyledItemDate>{item.date}</StyledItemDate>
          </StyledItemHeader>
          <StyledItemDescription>{item.description}</StyledItemDescription>
          <StyledItemActions>
            <button type="button" onClick={() => onRestore?.(item.id)} data-testid={`item-open-${item.id}`}>
              <i className="bi bi-arrow-counterclockwise"></i>
              {restoreLabel}
            </button>
            <StyledDeleteButton type="button" onClick={() => onDelete?.(item.id)} data-testid={`item-remove-${item.id}`}>
              <i className="bi bi-trash"></i>
              {deleteLabel}
            </StyledDeleteButton>
          </StyledItemActions>
        </StyledItemCard>
      ))}
    </StyledItemsGrid>
  );
}

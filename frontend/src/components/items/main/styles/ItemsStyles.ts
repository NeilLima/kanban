import styled from 'styled-components';

export const StyledItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: clamp(12px, 1.4vw, 20px);
`;

export const StyledItemCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background: #263548;
    transform: translateY(-1px);
  }
`;

export const StyledItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
`;

export const StyledItemIcon = styled.div<{ $color: string }>`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${(p) => p.$color} 0%, ${(p) => p.$color}88 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const StyledItemTitle = styled.h6`
  color: #f8fafc;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledItemDate = styled.span`
  font-size: 11px;
  color: #64748b;
  white-space: nowrap;
`;

export const StyledItemDescription = styled.p`
  font-size: 12px;
  color: #94a3b8;
  margin: 0 0 14px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledItemActions = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  button {
    flex: 1;
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
    }
  }
`;

export const StyledDeleteButton = styled.button`
  flex: 1;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.3) !important;
  background: transparent;
  color: #ef4444 !important;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: rgba(239, 68, 68, 0.1) !important;
  }
`;

export const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: #1e293b;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  gap: 10px;

  i {
    font-size: 40px;
    color: #475569;
  }
`;

export const StyledEmptyTitle = styled.h6`
  color: #94a3b8;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
`;

export const StyledEmptyText = styled.p`
  color: #64748b;
  font-size: 12px;
  margin: 0;
`;

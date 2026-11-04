import styled from 'styled-components';

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(260px, 24vw, 320px), 1fr));
  gap: clamp(12px, 1.4vw, 20px);
`;

export const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  text-align: center;
`;

export const StyledEmptyIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(59, 130, 246, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-size: 26px;
`;

export const StyledEmptyTitle = styled.p`
  color: #f8fafc;
  font-size: 15px;
  font-weight: 600;
  margin: 0;
`;

export const StyledEmptyText = styled.p`
  color: #94a3b8;
  font-size: 13px;
  margin: 0;
`;
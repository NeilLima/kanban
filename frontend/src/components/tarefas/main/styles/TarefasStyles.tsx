import styled from 'styled-components';

export const StyledFilterBar = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StyledSearchInput = styled.input`
  max-width: 320px;
  background-color: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #f8fafc;
  font-size: 13px;
  border-radius: 8px;
  padding: 8px 12px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

export const StyledFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const StyledFilterButton = styled.button`
  font-size: 13px;
  font-weight: 500;
`;

export const StyledNovaTarefaButton = styled.button`
  font-size: 13px;
  font-weight: 500;
`;

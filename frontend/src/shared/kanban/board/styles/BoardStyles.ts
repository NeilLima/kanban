import styled from 'styled-components';

export const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  background: #0B1120;
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
`;

export const StyledBoardScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  align-items: flex-start;
  padding-bottom: 6px;
  min-width: 0;

  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const StyledLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

import styled from 'styled-components';

export const StyledLayoutRoot = styled.div`
  display: flex;
  background: #0b1120;
  overflow-x: hidden;
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
`;

export const StyledMobileOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1049;
`;

export const StyledSidebarWrapper = styled.div<{ $mobileView: boolean; $sidebarOpen: boolean }>`
  width: ${(p) => (p.$mobileView ? 260 : 'clamp(60px, 18vw, 240px)')};
  min-width: ${(p) => (p.$mobileView ? 260 : p.$sidebarOpen ? 'clamp(60px, 18vw, 240px)' : 60)};
  overflow: hidden;
  transition: width 0.3s ease, min-width 0.3s ease, transform 0.3s ease;
  flex-shrink: 0;
  position: ${(p) => (p.$mobileView ? 'fixed' : 'sticky')};
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1050;
  transform: ${(p) => (p.$mobileView ? (p.$sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none')};
  box-shadow: ${(p) => (p.$mobileView && p.$sidebarOpen ? '0 0 30px rgba(0,0,0,0.6)' : 'none')};
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
`;

export const StyledPageContainer = styled.div`
  padding: clamp(12px, 2vw, 24px);
  background: #0b1120;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2vw, 24px);
`;

export const StyledPageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const StyledPageTitle = styled.h1`
  font-size: clamp(18px, 2.4vw, 26px);
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const StyledPageSubtitle = styled.p`
  font-size: clamp(12px, 1.2vw, 14px);
  color: #94a3b8;
  margin: 4px 0 0 0;
`;

export const StyledCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: clamp(12px, 1.4vw, 20px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background: #263548;
  }
`;

export const StyledSectionTitle = styled.h6`
  color: #fff;
  font-size: clamp(13px, 1.2vw, 15px);
  font-weight: 600;
  margin: 0 0 12px 0;
`;

export const StyledViewToggle = styled.div`
  display: inline-flex;
  align-items: center;
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  overflow: hidden;

  button {
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 500;
    color: #94a3b8;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: #fff;
    }

    &.active {
      background: #3b82f6;
      color: #fff;
    }
  }
`;

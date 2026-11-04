'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import {
  StyledLayoutRoot,
  StyledMobileOverlay,
  StyledSidebarWrapper,
  StyledContentWrapper,
  StyledPageContainer,
  StyledPageHeader,
  StyledPageTitle,
  StyledPageSubtitle,
} from './AppShellStyles';

interface AppShellProps {
  title: string;
  subtitle: string;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

export default function AppShell({ title, subtitle, headerActions, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const isMobile = window.innerWidth < 768;
      setMobileView((anterior) => {
        // Só reseta o estado ao CRUZAR o breakpoint (evita fechar o drawer
        // quando a barra de URL do mobile dispara resize)
        if (anterior !== isMobile) {
          setSidebarOpen(!isMobile);
        }
        return isMobile;
      });
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  function handleNavigate() {
    // No mobile, navegar fecha o drawer
    setSidebarOpen((aberto) => (window.innerWidth < 768 ? false : aberto));
  }

  return (
    <StyledLayoutRoot>
      {mobileView && sidebarOpen && (
        <StyledMobileOverlay onClick={() => setSidebarOpen(false)} data-testid="sidebar-overlay" />
      )}

      <StyledSidebarWrapper $mobileView={mobileView} $sidebarOpen={sidebarOpen}>
        <Sidebar
          collapsed={!sidebarOpen && !mobileView}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={handleNavigate}
        />
      </StyledSidebarWrapper>

      <StyledContentWrapper>
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <StyledPageContainer>
          <StyledPageHeader>
            <div>
              <StyledPageTitle>{title}</StyledPageTitle>
              <StyledPageSubtitle>{subtitle}</StyledPageSubtitle>
            </div>
            {headerActions}
          </StyledPageHeader>
          {children}
        </StyledPageContainer>
      </StyledContentWrapper>
    </StyledLayoutRoot>
  );
}

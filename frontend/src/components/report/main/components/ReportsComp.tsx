'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import ReportKpisComp from '@/components/report/kpi/components/ReportKpisComp';
import ProductivityChartComp from '@/components/report/productivity/components/ProductivityChartComp';
import TaskDistributionComp from '@/components/report/distribution/components/TaskDistributionComp';
import TimeSpentComp from '@/components/report/time-spent/components/TimeSpentComp';
import TeamPerformanceComp from '@/components/report/team/components/TeamPerformanceComp';
import {
  StyledReports,
  StyledPageHeader,
  StyledPageTitle,
  StyledPageSubtitle,
  StyledSectionGrid,
  StyledLayoutRoot,
  StyledMobileOverlay,
  StyledSidebarWrapper,
  StyledContentWrapper,
} from '../styles/ReportsStyles';

export default function ReportsComp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const isMobile = window.innerWidth < 768;
      setMobileView(isMobile);
      setSidebarOpen(!isMobile);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <StyledLayoutRoot>
      {mobileView && sidebarOpen && (
        <StyledMobileOverlay onClick={() => setSidebarOpen(false)} />
      )}

      <StyledSidebarWrapper $mobileView={mobileView} $sidebarOpen={sidebarOpen}>
        <Sidebar collapsed={!sidebarOpen && !mobileView} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </StyledSidebarWrapper>

      <StyledContentWrapper>
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <StyledReports>
          <StyledPageHeader>
            <div>
              <StyledPageTitle>Relatórios</StyledPageTitle>
              <StyledPageSubtitle>
                Análise de produtividade, tempo gasto e desempenho da equipe.
              </StyledPageSubtitle>
            </div>
          </StyledPageHeader>

          <ReportKpisComp />

          <StyledSectionGrid>
            <ProductivityChartComp />
          </StyledSectionGrid>

          <StyledSectionGrid>
            <TaskDistributionComp />
            <TimeSpentComp />
            <TeamPerformanceComp />
          </StyledSectionGrid>
        </StyledReports>
      </StyledContentWrapper>
    </StyledLayoutRoot>
  );
}
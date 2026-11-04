'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import { useProjects } from '../utils/ProjectsUtils';
import ProjectGridComp from '@/components/project/grid/components/ProjectGridComp';
import ProjectModalComp from '@/components/project/modal/components/ProjectModalComp';
import {
  StyledProjects,
  StyledPageHeader,
  StyledPageTitle,
  StyledPageSubtitle,
  StyledNewButton,
  StyledLayoutRoot,
  StyledMobileOverlay,
  StyledSidebarWrapper,
  StyledContentWrapper,
} from '../styles/ProjectsStyles';

export default function ProjectsComp() {
  const { state, actions } = useProjects();
  const router = useRouter();
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
        <Navbar />
        <StyledProjects>
          <StyledPageHeader>
            <div>
              <StyledPageTitle>Projetos</StyledPageTitle>
              <StyledPageSubtitle>
                Gerencie seus projetos, tarefas e equipe.
              </StyledPageSubtitle>
            </div>
            <StyledNewButton onClick={actions.openCreate}>
              <i className="bi bi-plus-lg"></i> Novo Projeto
            </StyledNewButton>
          </StyledPageHeader>

          <ProjectGridComp
            projects={state.projects}
            onToggleFavorite={actions.toggleFavorite}
            onArchive={actions.archiveProject}
            onDelete={actions.deleteProject}
            onOpen={(id) => router.push(`/projects/${id}`)}
            onEdit={actions.openEdit}
          />

          {state.showCreate && (
            <ProjectModalComp
              onClose={actions.closeCreate}
              onCreate={actions.addProject}
            />
          )}

          {state.editingProject && (
            <ProjectModalComp
              onClose={actions.closeEdit}
              onCreate={actions.addProject}
              project={state.editingProject}
              onUpdate={actions.updateProject}
            />
          )}
        </StyledProjects>
      </StyledContentWrapper>
    </StyledLayoutRoot>
  );
}
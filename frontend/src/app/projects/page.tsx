'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import { useProjects } from '@/components/project/main/utils/ProjectsUtils';
import ProjectModalComp from '@/components/project/modal/components/ProjectModalComp';
import type { CreateProjectData, Project } from '@/components/project/main/types/ProjectsTypes';
import {
  PROJECT_SORT_OPTIONS,
  STAT_CARDS_STYLE,
  PROJECT_CARD_STYLE,
  sortProjects,
  formatDateBR,
  type ProjectSortValue,
} from './projectsData';

const ACTION_ICON_STYLE: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 6,
  border: 'none',
  background: 'transparent',
  color: '#94a3b8',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: 13,
};

function StatCard({ icon, value, label, color }: { icon: string; value: string | number; label: string; color: string }) {
  return (
    <div className="col-6 col-lg-3" key={label}>
      <div style={STAT_CARDS_STYLE}>
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className={`bi ${icon}`} style={{ color, fontSize: 15 }}></i>
          <h4 className="text-white fw-bold mb-0">{value}</h4>
        </div>
        <small className="text-secondary" style={{ fontSize: 12 }}>{label}</small>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onToggleFavorite,
  onArchive,
  onDelete,
  onViewDetails,
}: {
  project: Project;
  onToggleFavorite: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
}) {
  const color = project.color || '#3b82f6';
  const done = project.tasksDone ?? 0;
  const total = project.tasksTotal ?? 0;
  const progress = total > 0 ? Math.round((done / total) * 100) : project.progress ?? 0;

  const router = useRouter();

  const handleOpen = () => router.push(`/projects/${project.id}`);

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div
        style={{ ...PROJECT_CARD_STYLE, cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        {/* Barra de cor do projeto */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${color}, ${color}66)` }} />

        <div style={{ padding: 'clamp(12px, 1.4vw, 18px)' }}>
          {/* Cabeçalho: ícone + nome + ações */}
          <div className="d-flex align-items-start justify-content-between mb-2" style={{ gap: 8 }}>
            <div className="d-flex align-items-center gap-2" style={{ minWidth: 0 }}>
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
                  color: '#fff', fontWeight: 700, fontSize: 15,
                  boxShadow: `0 2px 8px ${color}40`,
                }}
              >
                {project.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ minWidth: 0 }}>
                <h6 className="text-white fw-semibold mb-0 text-truncate">{project.name}</h6>
                <small className="text-secondary" style={{ fontSize: 11 }}>
                  Criado em {formatDateBR(project.createdAt)}
                </small>
              </div>
            </div>

            <div className="d-flex align-items-center flex-shrink-0 gap-1">
              <button
                type="button"
                title="Ver detalhes"
                onClick={(e) => { e.stopPropagation(); onViewDetails(project.id); }}
                style={{ ...ACTION_ICON_STYLE, background: 'rgba(255,255,255,0.08)', color: '#fff' }}
                data-testid={`project-card-view-details-${project.id}`}
              >
                <i className="bi bi-eye" style={{ fontSize: 13 }}></i>
              </button>
              <button
                type="button"
                title={project.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(project.id); }}
                style={{ ...ACTION_ICON_STYLE, color: project.isFavorite ? '#fbbf24' : '#475569', fontSize: 15 }}
              >
                <i className={`bi ${project.isFavorite ? 'bi-star-fill' : 'bi-star'}`}></i>
              </button>
              <button
                type="button"
                title="Arquivar projeto"
                onClick={(e) => { e.stopPropagation(); onArchive(project.id); }}
                style={ACTION_ICON_STYLE}
              >
                <i className="bi bi-archive"></i>
              </button>
              <button
                type="button"
                title="Excluir projeto"
                onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                style={ACTION_ICON_STYLE}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>

          {/* Descrição */}
          <p className="text-secondary mb-3" style={{ fontSize: 12.5, lineHeight: 1.5, minHeight: 38 }}>
            {project.description || 'Sem descrição.'}
          </p>

          {/* Progresso */}
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <small className="text-secondary" style={{ fontSize: 11 }}>Progresso</small>
              <small className="fw-semibold" style={{ fontSize: 11, color }}>{progress}%</small>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', borderRadius: 3, background: color, transition: 'width 0.3s ease' }} />
            </div>
          </div>

          {/* Rodapé: tarefas + membros */}
          <div className="d-flex align-items-center justify-content-between">
            <small className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: 12 }}>
              <i className="bi bi-check2-square" style={{ color }}></i>
              {done}/{total} tarefas
            </small>
            <div className="d-flex align-items-center">
              {project.members.slice(0, 3).map((m, i) => (
                <div
                  key={m.id || i}
                  title={m.name}
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 24, height: 24, borderRadius: '50%',
                    backgroundColor: m.color || color,
                    color: '#fff', fontSize: 10, fontWeight: 600,
                    border: '2px solid #1e293b', marginLeft: i === 0 ? 0 : -8,
                  }}
                >
                  {m.name.charAt(0).toUpperCase()}
                </div>
              ))}
              {project.members.length > 3 && (
                <small className="text-secondary ms-1" style={{ fontSize: 11 }}>+{project.members.length - 3}</small>
              )}
              {project.members.length === 0 && (
                <small className="text-secondary" style={{ fontSize: 11 }}>Sem membros</small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { state, actions } = useProjects();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<ProjectSortValue>('recent');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const activeProjects = state.projects.filter((p) => !p.isArchived);

  const visibleProjects = sortProjects(
    activeProjects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase());
      const matchesFavorite = !onlyFavorites || p.isFavorite;
      return matchesSearch && matchesFavorite;
    }),
    sort
  );

  const totalTasks = activeProjects.reduce((acc, p) => acc + (p.tasksTotal ?? 0), 0);
  const doneTasks = activeProjects.reduce((acc, p) => acc + (p.tasksDone ?? 0), 0);
  const favoriteCount = activeProjects.filter((p) => p.isFavorite).length;

  const handleCreate = (data: CreateProjectData) => {
    actions.addProject(data);
    actions.closeCreate();
  };

  const handleViewDetails = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <AppShell
      title="Projetos"
      subtitle="Todos os projetos que você participa ou administra."
      headerActions={
        <div className="d-flex align-items-center gap-2">
          <div style={{ backgroundColor: '#0B1120', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden' }}>
            <button className="btn btn-sm px-2" title="Visualização em grade" style={{ color: '#fff', background: 'transparent', border: 'none', fontSize: 13 }}>
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </button>
            <button className="btn btn-sm px-2" title="Visualização em lista (em breve)" style={{ color: '#64748b', background: 'transparent', border: 'none', fontSize: 13 }}>
              <i className="bi bi-list-ul"></i>
            </button>
          </div>
          <button className="btn btn-primary" style={{ fontSize: 13, fontWeight: 500 }} onClick={actions.openCreate}>
            <i className="bi bi-plus-lg me-1"></i>Novo Projeto
          </button>
        </div>
      }
    >
      {/* Estatísticas */}
      <div className="row g-3">
        <StatCard icon="bi-folder2" value={activeProjects.length} label="Projetos ativos" color="#3b82f6" />
        <StatCard icon="bi-check2-circle" value={doneTasks} label="Tarefas concluídas" color="#10b981" />
        <StatCard icon="bi-list-task" value={totalTasks - doneTasks} label="Tarefas pendentes" color="#f59e0b" />
        <StatCard icon="bi-star-fill" value={favoriteCount} label="Favoritos" color="#fbbf24" />
      </div>
﻿

      {/* Busca e filtros */}
      <div
        className="d-flex align-items-center gap-2 flex-wrap"
        style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px' }}
      >
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 320 }}>
          <i className="bi bi-search" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: 13 }}></i>
          <input
            className="form-control form-control-sm"
            placeholder="Buscar projetos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 30, backgroundColor: '#0B1120', borderColor: 'rgba(255,255,255,0.06)', color: '#F8FAFC', fontSize: 13 }}
          />
        </div>

        <button
          type="button"
          className="btn btn-sm d-flex align-items-center gap-1"
          onClick={() => setOnlyFavorites((v) => !v)}
          style={{
            fontSize: 12.5,
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: onlyFavorites ? 'rgba(251,191,36,0.12)' : '#0B1120',
            color: onlyFavorites ? '#fbbf24' : '#94a3b8',
            fontWeight: 500,
          }}
        >
          <i className={`bi ${onlyFavorites ? 'bi-star-fill' : 'bi-star'}`}></i>Favoritos
        </button>

        <div className="ms-auto d-flex align-items-center gap-2">
          <small className="text-secondary" style={{ fontSize: 12 }}>Ordenar:</small>
          <select
            className="form-select form-select-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as ProjectSortValue)}
            style={{ width: 'auto', backgroundColor: '#0B1120', borderColor: 'rgba(255,255,255,0.06)', color: '#F8FAFC', fontSize: 12.5 }}
          >
            {PROJECT_SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de projetos */}
      <div className="row g-3">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleFavorite={actions.toggleFavorite}
            onArchive={actions.archiveProject}
            onDelete={actions.deleteProject}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Estado vazio */}
      {visibleProjects.length === 0 && (
        <div className="text-center py-5" style={{ background: '#1e293b', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 12 }}>
          <i className="bi bi-kanban text-secondary" style={{ fontSize: 32 }}></i>
          <h6 className="text-white mt-3">Nenhum projeto encontrado</h6>
          <p className="text-secondary mb-3" style={{ fontSize: 13 }}>
            {search || onlyFavorites
              ? 'Tente ajustar a busca ou remover os filtros.'
              : 'Crie seu primeiro projeto para começar.'}
          </p>
          {!search && !onlyFavorites && (
            <button className="btn btn-primary btn-sm" onClick={actions.openCreate}>
              <i className="bi bi-plus-lg me-1"></i>Novo Projeto
            </button>
          )}
        </div>
      )}

      {state.showCreate && (
        <ProjectModalComp onClose={actions.closeCreate} onCreate={handleCreate} />
      )}
    </AppShell>
  );
}

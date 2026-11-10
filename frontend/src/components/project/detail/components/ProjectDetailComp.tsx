'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import BoardComp from '@/shared/kanban/board/components/BoardComp';
import ProjectModalComp from '@/components/project/modal/components/ProjectModalComp';
import TaskCreateModalComp from '@/components/task/main/components/TaskCreateModalComp';
import { useProjectDetail } from '../utils/ProjectDetailUtils';
import type { ProjectDetailTypes } from '../types/ProjectDetailTypes';
import {
  StyledDetailCard,
  StyledDetailValue,
  StyledDetailValueDone,
  StyledDetailValueProgress,
  StyledDetailValueMembers,
  StyledDetailLabel,
  StyledProgressWrapper,
  StyledProgressTrack,
  StyledProgressBar,
  StyledTeamCard,
  StyledTeamTitle,
  StyledTeamList,
  StyledTeamBadge,
  StyledTeamIcon,
  StyledTeamRole,
  StyledBoardSection,
  StyledBoardTitle,
  StyledActionsRow,
  StyledEmpty,
  StyledEmptyText,
} from '../styles/ProjectDetailStyles';

export default function ProjectDetailComp({ projectId }: ProjectDetailTypes) {
  const { state, actions } = useProjectDetail(projectId);

  if (state.loading && !state.project) {
    return (
      <AppShell title="Projeto" subtitle="Carregando projeto...">
        <p className="text-secondary" data-testid="project-detail-loading">
          Carregando...
        </p>
      </AppShell>
    );
  }

  if (!state.project) {
    return (
      <AppShell title="Projeto" subtitle="Não encontrado">
        <StyledEmpty data-testid="project-detail-empty">
          <StyledEmptyText data-testid="project-detail-empty-text">
            Projeto não encontrado.
          </StyledEmptyText>
          <button
            className="btn btn-primary btn-sm"
            onClick={actions.handleVoltar}
            data-testid="project-detail-voltar"
          >
            Voltar aos projetos
          </button>
        </StyledEmpty>
      </AppShell>
    );
  }

  const project = state.project;

  return (
    <AppShell
      title={project.name}
      subtitle={
        project.description || 'Detalhes do projeto, equipe e quadro de tarefas.'
      }
      headerActions={
        <StyledActionsRow data-testid="project-detail-actions">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={actions.handleVoltar}
            data-testid="project-detail-back"
          >
            <i className="bi bi-arrow-left me-1"></i>Voltar
          </button>
          {state.isAdmin && (
            <>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={actions.handleEditar}
                data-testid="project-detail-edit"
              >
                <i className="bi bi-pencil me-1"></i>Editar
              </button>
              <button
                className="btn btn-outline-success btn-sm"
                onClick={actions.handleAddMember}
                data-testid="project-detail-add-member"
              >
                <i className="bi bi-person-plus me-1"></i>Adicionar membros
              </button>
              <button
                className="btn btn-outline-info btn-sm"
                onClick={actions.handleAddTask}
                data-testid="project-detail-add-task"
              >
                <i className="bi bi-plus me-1"></i>Adicionar tarefas
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={actions.handleExcluir}
                data-testid="project-detail-delete"
              >
                <i className="bi bi-trash me-1"></i>Excluir
              </button>
            </>
          )}
        </StyledActionsRow>
      }
    >
      {/* KPIs do projeto */}
      <div className="row g-2 g-md-3" data-testid="project-detail-kpis">
        <div className="col-6 col-md-3">
          <StyledDetailCard data-testid="project-kpi-total">
            <StyledDetailValue data-testid="project-kpi-total-value">
              {state.tasksTotal}
            </StyledDetailValue>
            <StyledDetailLabel data-testid="project-kpi-total-label">Tarefas</StyledDetailLabel>
          </StyledDetailCard>
        </div>
        <div className="col-6 col-md-3">
          <StyledDetailCard data-testid="project-kpi-done">
            <StyledDetailValueDone data-testid="project-kpi-done-value">
              {state.tasksDone}
            </StyledDetailValueDone>
            <StyledDetailLabel data-testid="project-kpi-done-label">
              Concluídas
            </StyledDetailLabel>
          </StyledDetailCard>
        </div>
        <div className="col-6 col-md-3">
          <StyledDetailCard data-testid="project-kpi-progress">
            <StyledDetailValueProgress data-testid="project-kpi-progress-value">
              {state.progress}%
            </StyledDetailValueProgress>
            <StyledDetailLabel data-testid="project-kpi-progress-label">
              Progresso
            </StyledDetailLabel>
          </StyledDetailCard>
        </div>
        <div className="col-6 col-md-3">
          <StyledDetailCard data-testid="project-kpi-members">
            <StyledDetailValueMembers data-testid="project-kpi-members-value">
              {project.members.length}
            </StyledDetailValueMembers>
            <StyledDetailLabel data-testid="project-kpi-members-label">
              Membros
            </StyledDetailLabel>
          </StyledDetailCard>
        </div>
      </div>

      {/* Barra de progresso */}
      <StyledProgressWrapper data-testid="project-progress-wrapper">
        <StyledProgressTrack data-testid="project-progress-track">
          <StyledProgressBar
            $progress={state.progress}
            data-testid="project-progress-bar"
          />
        </StyledProgressTrack>
      </StyledProgressWrapper>

      {/* Equipe */}
      <StyledTeamCard data-testid="project-team">
        <StyledTeamTitle data-testid="project-team-title">
          <i className="bi bi-people me-1"></i>Equipe ({project.members.length})
        </StyledTeamTitle>
        <StyledTeamList data-testid="project-team-list">
          {project.members.map((m) => (
            <StyledTeamBadge
              key={m.id}
              $isOwner={m.role === 'OWNER'}
              data-testid={`project-team-member-${m.id}`}
            >
              <StyledTeamIcon $fontSize={11} className={`bi ${m.role === 'OWNER' ? 'bi-star-fill' : 'bi-person'}`}></StyledTeamIcon>
              {m.name}
              {m.role && m.role !== 'MEMBER' && (
                <StyledTeamRole data-testid={`project-team-role-${m.id}`}>
                  ({m.role === 'OWNER' ? 'Criador' : m.role})
                </StyledTeamRole>
              )}
            </StyledTeamBadge>
          ))}
        </StyledTeamList>
      </StyledTeamCard>

      {/* Quadro Kanban do projeto */}
      <StyledBoardSection data-testid="project-board-section">
        <StyledBoardTitle data-testid="project-board-title">
          <i className="bi bi-kanban me-1"></i>Quadro de tarefas
        </StyledBoardTitle>
        <BoardComp projectId={projectId} />
      </StyledBoardSection>

      {/* Modal de edição do projeto */}
      {state.showEdit && state.project && (
        <ProjectModalComp
          onClose={actions.handleFecharEdicao}
          onCreate={() => {}}
          project={state.project}
          onUpdate={(id, data) => actions.updateProject(id, data)}
        />
      )}

      {/* Modal: Adicionar tarefas ao projeto */}
      {state.showAddTask && (
        <TaskCreateModalComp
          onClose={actions.handleCloseAddTask}
          columnId=""
          projectId={projectId}
        />
      )}

      {/* Modal: Adicionar membros ao projeto */}
      {state.showAddMember && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16, zIndex: 1200,
          }}
          onClick={actions.handleCloseAddMember}
          data-testid="project-add-member-overlay"
        >
          <div
            style={{
              background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, width: '100%', maxWidth: 420,
              padding: 'clamp(18px, 2vw, 24px)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              maxHeight: '90vh', overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
            data-testid="project-add-member-modal"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h2 style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                Adicionar membros
              </h2>
              <button onClick={actions.handleCloseAddMember} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 20, cursor: 'pointer', padding: 2 }} data-testid="project-add-member-close">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }} data-testid="project-add-member-hint">
              Selecione um usuário existente ou cadastre um novo membro para a equipe deste projeto.
            </p>

            {/* Cadastrar novo usuário */}
            <button
              onClick={actions.handleToggleRegisterUser}
              style={{
                background: 'transparent', border: '1px dashed rgba(59,130,246,0.4)',
                color: '#3b82f6', borderRadius: 8, padding: '8px 12px',
                fontSize: 12.5, cursor: 'pointer', width: '100%', marginBottom: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
              data-testid="project-register-member-toggle"
            >
              <i className={`bi ${state.showRegisterUser ? 'bi-dash-circle' : 'bi-person-plus'}`}></i>
              {state.showRegisterUser ? 'Fechar cadastro' : 'Cadastrar novo usuário'}
            </button>

            {state.showRegisterUser && (
              <div
                style={{
                  background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: 10, padding: 14, marginBottom: 16,
                }}
                data-testid="project-register-member-form"
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input
                    className="form-control form-control-sm"
                    placeholder="Nome completo"
                    value={state.registerForm.name}
                    onChange={(e) => actions.handleRegisterFormChange('name', e.target.value)}
                    style={{ backgroundColor: '#0B1120', borderColor: 'rgba(255,255,255,0.08)', color: '#F8FAFC', fontSize: 13 }}
                    data-testid="project-register-name"
                  />
                  <input
                    className="form-control form-control-sm"
                    type="email"
                    placeholder="E-mail"
                    value={state.registerForm.email}
                    onChange={(e) => actions.handleRegisterFormChange('email', e.target.value)}
                    style={{ backgroundColor: '#0B1120', borderColor: 'rgba(255,255,255,0.08)', color: '#F8FAFC', fontSize: 13 }}
                    data-testid="project-register-email"
                  />
                  <input
                    className="form-control form-control-sm"
                    type="password"
                    placeholder="Senha (mín. 8 caracteres)"
                    value={state.registerForm.password}
                    onChange={(e) => actions.handleRegisterFormChange('password', e.target.value)}
                    style={{ backgroundColor: '#0B1120', borderColor: 'rgba(255,255,255,0.08)', color: '#F8FAFC', fontSize: 13 }}
                    data-testid="project-register-password"
                  />
                  {state.registerError && (
                    <p style={{ color: '#f87171', fontSize: 12, margin: 0 }} data-testid="project-register-error">
                      {state.registerError}
                    </p>
                  )}
                  <button
                    onClick={() => actions.handleRegisterSubmit(projectId)}
                    disabled={state.registering}
                    style={{
                      background: state.registering ? '#334155' : '#3b82f6',
                      border: 'none', color: '#fff', borderRadius: 8,
                      padding: '9px 14px', fontSize: 13, fontWeight: 600,
                      cursor: state.registering ? 'not-allowed' : 'pointer',
                    }}
                    data-testid="project-register-submit"
                  >
                    {state.registering ? 'Cadastrando...' : 'Cadastrar e adicionar à equipe'}
                  </button>
                </div>
              </div>
            )}

            <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 20 }} data-testid="project-add-member-list">
              {state.users.map((u) => (
                <div
                  key={u.id}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'background 0.2s' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!u.email) return;
                    fetch(`/api/projects/${projectId}/members`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
                      body: JSON.stringify({ email: u.email }),
                    })
                      .then((r) => {
                        if (!r.ok) throw new Error('Falha ao adicionar membro');
                        actions.handleCloseAddMember();
                        actions.refetch();
                      })
                      .catch(() => {
                        /* feedback silencioso — o modal continua aberto */
                      });
                  }}
                  data-testid={`project-add-member-item-${u.id}`}
                >
                  <span style={{ color: '#f8fafc', fontSize: 13 }}>{u.name}</span>
                  <i className="bi bi-plus-circle" style={{ color: '#10b981', fontSize: 16 }}></i>
                </div>
              ))}
              {state.users.length === 0 && (
                <p style={{ color: '#94a3b8', fontSize: 13, padding: '10px 12px' }} data-testid="project-add-member-none">
                  Nenhum usuário disponível para adicionar.
                </p>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={actions.handleCloseAddMember} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', borderRadius: 8, padding: '9px 16px', fontSize: 13, cursor: 'pointer' }} data-testid="project-add-member-cancel">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
'use client';

import React, { useState, useMemo } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useTeam } from '../utils/TeamUtils';
import {
  StyledTeamGrid,
  StyledMemberCard,
  StyledMemberAvatar,
  StyledMemberName,
  StyledMemberRole,
  StyledMemberEmail,
  StyledMemberStats,
  StyledStat,
  StyledStatValue,
  StyledStatLabel,
  StyledRoleBadge,
  StyledMemberYou,
  StyledDetailOverlay,
  StyledDetailModal,
  StyledDetailHeader,
  StyledDetailTitle,
  StyledDetailClose,
  StyledDetailSection,
  StyledDetailSectionTitle,
  StyledProjectChip,
  StyledStatusRow,
  StyledStatusDot,
  StyledTaskRow,
  StyledTaskTitle,
  StyledTaskMeta,
} from '../styles/TeamStyles';
import type { CSSProperties } from 'react';

const STAT_CARD_STYLE: CSSProperties = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12,
  padding: 'clamp(12px, 1.4vw, 18px)',
  boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
};

const FILTER_BAR_STYLE: CSSProperties = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12,
  padding: '10px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  flexWrap: 'wrap',
};

const STATUS_COLORS: Record<string, string> = {
  'A Fazer': '#3b82f6',
  'Em Desenvolvimento': '#f59e0b',
  'Em Revisão': '#8b5cf6',
  'Concluído': '#10b981',
};

type SortValue = 'name' | 'tasks' | 'productivity' | 'role';

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'name', label: 'Nome (A-Z)' },
  { value: 'tasks', label: 'Mais tarefas' },
  { value: 'productivity', label: 'Mais produtivos' },
  { value: 'role', label: 'Cargo' },
];

const ROLE_ORDER: Record<string, number> = { Owner: 4, Admin: 3, Membro: 2, Viewer: 1 };

function StatCard({ icon, value, label, color }: { icon: string; value: string | number; label: string; color: string }) {
  return (
    <div className="col-6 col-lg-3" key={label}>
      <div style={STAT_CARD_STYLE}>
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className={`bi ${icon}`} style={{ color, fontSize: 15 }}></i>
          <h4 className="text-white fw-bold mb-0">{value}</h4>
        </div>
        <small className="text-secondary" style={{ fontSize: 12 }}>{label}</small>
      </div>
    </div>
  );
}

function MemberDetailModal({
  member,
  loading,
  onClose,
}: {
  member: ReturnType<typeof useTeam>['detail']['member'];
  loading: boolean;
  onClose: () => void;
}) {
  return (
    <StyledDetailOverlay onClick={onClose} data-testid="team-detail-overlay">
      <StyledDetailModal onClick={(e) => e.stopPropagation()} data-testid="team-detail-modal">
        <StyledDetailHeader>
          <div className="d-flex align-items-center gap-3">
            <StyledMemberAvatar $color={member?.color || '#3b82f6'} $avatarUrl={member?.avatar ?? undefined} style={{ width: 48, height: 48, fontSize: 18, marginBottom: 0 }}>
              {member?.avatar ? (
                <img src={member.avatar} alt={member.name} />
              ) : (
                (member?.name || '?').charAt(0).toUpperCase()
              )}
            </StyledMemberAvatar>
            <div>
              <StyledDetailTitle data-testid="team-detail-name">
                {member?.name || 'Membro'}
              </StyledDetailTitle>
              <StyledMemberEmail>{member?.email}</StyledMemberEmail>
            </div>
          </div>
          <StyledDetailClose onClick={onClose} data-testid="team-detail-close">
            <i className="bi bi-x-lg"></i>
          </StyledDetailClose>
        </StyledDetailHeader>

        {loading && (
          <p className="text-secondary" data-testid="team-detail-loading">Carregando detalhes...</p>
        )}

        {!loading && member && (
          <>
            <StyledRoleBadge $color={member.color} data-testid="team-detail-role">
              {member.role}
            </StyledRoleBadge>

            <StyledDetailSection>
              <StyledDetailSectionTitle>Resumo</StyledDetailSectionTitle>
              <StyledMemberStats style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                <StyledStat>
                  <StyledStatValue $color="#3b82f6">{member.stats.total}</StyledStatValue>
                  <StyledStatLabel>Tarefas</StyledStatLabel>
                </StyledStat>
                <StyledStat>
                  <StyledStatValue $color="#10b981">{member.stats.done}</StyledStatValue>
                  <StyledStatLabel>Concluídas</StyledStatLabel>
                </StyledStat>
                <StyledStat>
                  <StyledStatValue $color="#f59e0b">{member.stats.productivity}%</StyledStatValue>
                  <StyledStatLabel>Produtividade</StyledStatLabel>
                </StyledStat>
                <StyledStat>
                  <StyledStatValue $color="#ef4444">{member.stats.overdue}</StyledStatValue>
                  <StyledStatLabel>Atrasadas</StyledStatLabel>
                </StyledStat>
                <StyledStat>
                  <StyledStatValue $color="#8b5cf6">{member.stats.spentHours}h</StyledStatValue>
                  <StyledStatLabel>Tempo</StyledStatLabel>
                </StyledStat>
              </StyledMemberStats>
            </StyledDetailSection>

            {Object.keys(member.stats.byStatus).length > 0 && (
              <StyledDetailSection>
                <StyledDetailSectionTitle>Tarefas por status</StyledDetailSectionTitle>
                {Object.entries(member.stats.byStatus).map(([status, count]) => (
                  <StyledStatusRow key={status} data-testid={`team-detail-status-${status}`}>
                    <StyledStatusDot $color={STATUS_COLORS[status] || '#64748b'} />
                    <span style={{ color: '#cbd5e1', fontSize: 13, flex: 1 }}>{status}</span>
                    <strong style={{ color: '#f8fafc', fontSize: 13 }}>{count}</strong>
                  </StyledStatusRow>
                ))}
              </StyledDetailSection>
            )}

            <StyledDetailSection>
              <StyledDetailSectionTitle>Projetos ({member.projects.length})</StyledDetailSectionTitle>
              <div className="d-flex flex-wrap gap-2">
                {member.projects.map((p) => (
                  <StyledProjectChip key={p.id} $color={p.color} data-testid={`team-detail-project-${p.id}`}>
                    {p.name}
                    <small style={{ opacity: 0.75, marginLeft: 6 }}>
                      {p.isOwner ? 'Owner' : p.role}
                    </small>
                  </StyledProjectChip>
                ))}
              </div>
            </StyledDetailSection>

            <StyledDetailSection>
              <StyledDetailSectionTitle>Tarefas recentes</StyledDetailSectionTitle>
              {member.recentTasks.length === 0 && (
                <p className="text-secondary" style={{ fontSize: 13 }} data-testid="team-detail-no-tasks">
                  Nenhuma tarefa atribuída ou criada.
                </p>
              )}
              {member.recentTasks.map((t) => (
                <StyledTaskRow key={t.id} data-testid={`team-detail-task-${t.id}`}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <StyledTaskTitle>{t.title}</StyledTaskTitle>
                    <StyledTaskMeta>
                      {t.project.name} • {t.status} • {t.priority}
                      {t.dueDate && ` • ${new Date(t.dueDate).toLocaleDateString('pt-BR')}`}
                    </StyledTaskMeta>
                  </div>
                </StyledTaskRow>
              ))}
            </StyledDetailSection>
          </>
        )}
      </StyledDetailModal>
    </StyledDetailOverlay>
  );
}

export default function TeamComp() {
  const { state, actions, selectedMemberId, detail } = useTeam();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sort, setSort] = useState<SortValue>('name');

  const roles = useMemo(() => {
    const set = new Set(state.members.map((m) => m.role));
    return ['all', ...Array.from(set)];
  }, [state.members]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = state.members.filter((m) => {
      const matchesSearch =
        !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
      const matchesRole = roleFilter === 'all' || m.role === roleFilter;
      return matchesSearch && matchesRole;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name, 'pt-BR');
      if (sort === 'tasks') return b.tasks - a.tasks;
      if (sort === 'productivity') return b.percent - a.percent;
      return (ROLE_ORDER[b.role] ?? 0) - (ROLE_ORDER[a.role] ?? 0);
    });

    return list;
  }, [state.members, search, roleFilter, sort]);

  const totalTasks = state.members.reduce((acc, m) => acc + m.tasks, 0);
  const totalDone = state.members.reduce((acc, m) => acc + m.done, 0);
  const avgProductivity =
    state.members.length > 0
      ? Math.round(state.members.reduce((acc, m) => acc + m.percent, 0) / state.members.length)
      : 0;

  return (
    <AppShell
      title="Equipe"
      subtitle="Gerencie os membros, cargos e permissões da sua equipe."
    >
      {/* Estatísticas — mesmo layout da página de Projetos */}
      <div className="row g-3">
        <StatCard icon="bi-people" value={state.members.length} label="Membros" color="#3b82f6" />
        <StatCard icon="bi-check2-circle" value={totalDone} label="Tarefas concluídas" color="#10b981" />
        <StatCard icon="bi-list-task" value={totalTasks - totalDone} label="Tarefas pendentes" color="#f59e0b" />
        <StatCard icon="bi-star-fill" value={avgProductivity} label="Produtividade média" color="#8b5cf6" />
      </div>

      {/* Busca e filtros — mesmo layout da página de Projetos */}
      <div style={FILTER_BAR_STYLE} data-testid="team-filter-bar">
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 320 }}>
          <i className="bi bi-search" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: 13 }}></i>
          <input
            className="form-control form-control-sm"
            placeholder="Buscar membros..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 30, backgroundColor: '#0B1120', borderColor: 'rgba(255,255,255,0.06)', color: '#F8FAFC', fontSize: 13 }}
            data-testid="team-search-input"
          />
        </div>

        <button
          type="button"
          className="btn btn-sm d-flex align-items-center gap-1"
          onClick={() => setRoleFilter((v) => (v === 'all' ? roles[1] ?? 'all' : 'all'))}
          style={{
            fontSize: 12.5,
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: roleFilter !== 'all' ? 'rgba(59,130,246,0.12)' : '#0B1120',
            color: roleFilter !== 'all' ? '#3b82f6' : '#94a3b8',
            fontWeight: 500,
          }}
          data-testid="team-role-filter"
        >
          <i className="bi bi-person-badge"></i>
          {roleFilter === 'all' ? 'Todos os cargos' : roleFilter}
        </button>

        <div className="ms-auto d-flex align-items-center gap-2">
          <small className="text-secondary" style={{ fontSize: 12 }}>Ordenar:</small>
          <select
            className="form-select form-select-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            style={{ width: 'auto', backgroundColor: '#0B1120', borderColor: 'rgba(255,255,255,0.06)', color: '#F8FAFC', fontSize: 12.5 }}
            data-testid="team-sort-select"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {state.loading && (
        <p className="text-secondary" data-testid="team-loading">
          Carregando equipe...
        </p>
      )}

      {!state.loading && state.members.length === 0 && (
        <div className="text-center py-5" style={{ background: '#1e293b', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 12 }} data-testid="team-empty">
          <i className="bi bi-people text-secondary" style={{ fontSize: 32 }}></i>
          <h6 className="text-white mt-3">Nenhum membro encontrado</h6>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Crie um projeto e adicione membros para montar sua equipe.
          </p>
        </div>
      )}

      <StyledTeamGrid data-testid="team-grid">
        {filtered.map((m) => (
          <StyledMemberCard
            key={m.id}
            data-testid={`team-member-${m.id}`}
            onClick={() => actions.openMember(m.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                actions.openMember(m.id);
              }
            }}
          >
            <StyledMemberAvatar
              $color={m.color}
              $avatarUrl={m.avatarUrl}
              data-testid={`team-avatar-${m.id}`}
            >
              {m.avatarUrl ? (
                <img src={m.avatarUrl} alt={m.name} data-testid={`team-avatar-img-${m.id}`} />
              ) : (
                m.name.charAt(0)
              )}
            </StyledMemberAvatar>
            <StyledMemberName data-testid={`team-name-${m.id}`}>
              {m.name}
              {m.isMe && <StyledMemberYou data-testid={`team-you-${m.id}`}>(Você)</StyledMemberYou>}
            </StyledMemberName>
            <StyledMemberRole>{m.role}</StyledMemberRole>
            <StyledMemberEmail>{m.email}</StyledMemberEmail>
            <StyledRoleBadge $color={m.color}>{m.badge}</StyledRoleBadge>
            <StyledMemberStats>
              <StyledStat>
                <StyledStatValue $color="#3b82f6">{m.tasks}</StyledStatValue>
                <StyledStatLabel>Tarefas</StyledStatLabel>
              </StyledStat>
              <StyledStat>
                <StyledStatValue $color="#10b981">{m.done}</StyledStatValue>
                <StyledStatLabel>Concluídas</StyledStatLabel>
              </StyledStat>
              <StyledStat>
                <StyledStatValue $color="#f59e0b">{m.percent}%</StyledStatValue>
                <StyledStatLabel>Aproveit.</StyledStatLabel>
              </StyledStat>
            </StyledMemberStats>
          </StyledMemberCard>
        ))}
      </StyledTeamGrid>

      {!state.loading && filtered.length === 0 && state.members.length > 0 && (
        <div className="text-center py-5" style={{ background: '#1e293b', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 12 }} data-testid="team-no-results">
          <i className="bi bi-search text-secondary" style={{ fontSize: 32 }}></i>
          <h6 className="text-white mt-3">Nenhum membro encontrado</h6>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Tente ajustar a busca ou os filtros.
          </p>
        </div>
      )}

      {selectedMemberId && (
        <MemberDetailModal
          member={detail.member}
          loading={detail.loading}
          onClose={actions.closeMember}
        />
      )}
    </AppShell>
  );
}

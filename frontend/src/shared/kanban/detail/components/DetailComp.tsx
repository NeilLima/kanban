'use client';
import React from 'react';
import { useDetail } from '../utils/DetailUtils';
import type { DetailTypes } from '../types/DetailTypes';

const STATUS_LABELS: Record<string, string> = {
  TODO: 'A Fazer',
  IN_PROGRESS: 'Em Desenvolvimento',
  REVIEW: 'Em Revisão',
  DONE: 'Concluído',
};

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Baixa', medium: 'Média', high: 'Alta', urgent: 'Urgente',
  baixa: 'Baixa', media: 'Média', alta: 'Alta', urgente: 'Urgente',
};

export default function DetailComp({ taskId, show, onHide }: DetailTypes) {
  const { state, actions, STATUS_OPTIONS } = useDetail(taskId);

  if (!show || state.loading || !state.task) return null;

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, zIndex: 1200,
      }}
      onClick={onHide}
      data-testid="detail-modal-overlay"
    >
      <div
        style={{
          background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, width: '100%', maxWidth: 520,
          padding: 'clamp(18px,2vw,24px)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          maxHeight: '90vh', overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
        data-testid="detail-modal"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 'clamp(15px,1.5vw,18px)', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
            {state.task.title}
          </h2>
          <button onClick={onHide} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 20, cursor: 'pointer' }} data-testid="detail-close">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 6, fontWeight: 500 }}>Título</label>
          <input
            type="text"
            value={state.titulo}
            onChange={(e) => actions.handleTituloChange(e.target.value)}
            style={{
              width: '100%', background: '#0b1120',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
              color: '#f8fafc', fontSize: 13, padding: '10px 12px',
              outline: 'none', boxSizing: 'border-box',
            }}
            data-testid="detail-titulo"
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 6, fontWeight: 500 }}>Descrição</label>
          <textarea
            value={state.descricao}
            onChange={(e) => actions.handleDescricaoChange(e.target.value)}
            style={{
              width: '100%', background: '#0b1120',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
              color: '#f8fafc', fontSize: 13, padding: '10px 12px',
              outline: 'none', resize: 'vertical', minHeight: 80,
              fontFamily: 'inherit', boxSizing: 'border-box',
            }}
            data-testid="detail-descricao"
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 6, fontWeight: 500 }}>Status</label>
          <select
            value={state.status}
            onChange={(e) => actions.handleStatusChange(e.target.value)}
            style={{
              width: '100%', background: '#0b1120',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
              color: '#f8fafc', fontSize: 13, padding: '10px 12px',
              outline: 'none', boxSizing: 'border-box', cursor: 'pointer',
            }}
            data-testid="detail-status-select"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s] || s}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 20, fontSize: 12, color: '#94a3b8' }} data-testid="detail-meta">
          <span>Prioridade: {PRIORITY_LABELS[state.task.priority] || state.task.priority}</span>
          {state.task.dueDate && <span>• Prazo: {new Date(state.task.dueDate).toLocaleDateString()}</span>}
          {state.task.assignees && state.task.assignees.length > 0 && (
            <span>• {state.task.assignees.length} responsável(is)</span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            onClick={onHide}
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', borderRadius: 8, padding: '9px 16px', fontSize: 13, cursor: 'pointer' }}
            data-testid="detail-cancel"
          >
            Fechar
          </button>
          <button
            onClick={actions.handleSaveTask}
            style={{ background: '#3b82f6', border: 'none', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            data-testid="detail-save"
          >
            Salvar
          </button>
          <button
            onClick={actions.handleDeleteTask}
            style={{ background: 'transparent', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', borderRadius: 8, padding: '9px 16px', fontSize: 13, cursor: 'pointer' }}
            data-testid="detail-delete"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

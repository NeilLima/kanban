'use client';
import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useAuth } from '@/contexts/AuthContext';
import { profileStats } from '@/app/profile/profileData';

const CARD_STYLE: React.CSSProperties = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12,
  padding: 'clamp(16px, 2vw, 28px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
};

export default function ProfilePage() {
  const { user } = useAuth();
  const initials = (user?.name || 'U').charAt(0).toUpperCase();

  return (
    <AppShell
      title="Perfil"
      subtitle="Suas informações pessoais e estatísticas."
      headerActions={
        <button className="btn btn-outline-primary" style={{ fontSize: 13, fontWeight: 500 }}>
          <i className="bi bi-pencil me-1"></i>Editar Perfil
        </button>
      }
    >
      <div style={CARD_STYLE}>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', color: '#fff', fontWeight: 700, fontSize: 36 }}
        >
          {initials}
        </div>
        <div className="text-center">
          <h5 className="text-white fw-semibold mb-1">{user?.name || 'Usuário'}</h5>
          <small className="text-secondary" style={{ fontSize: 13 }}>{user?.email || 'user@example.com'}</small>
        </div>
        <span className="badge rounded-pill" style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#3b82f6', fontSize: 11 }}>
          Administrador
        </span>
      </div>

      <div className="row g-3">
        {profileStats.map((stat) => (
          <div className="col-12 col-sm-6 col-lg-3" key={stat.label}>
            <div style={{ ...CARD_STYLE, alignItems: 'flex-start', gap: 4 }}>
              <i className={`bi ${stat.icon}`} style={{ color: '#3b82f6', fontSize: 18 }}></i>
              <h4 className="text-white fw-bold mb-0">{stat.value}</h4>
              <small className="text-secondary" style={{ fontSize: 12 }}>{stat.label}</small>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

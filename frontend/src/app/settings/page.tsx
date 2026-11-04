'use client';
import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useAuth } from '@/contexts/AuthContext';
import { settingsSections } from '@/app/settings/settingsData';

const CARD_STYLE: React.CSSProperties = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12,
  padding: 'clamp(12px, 1.4vw, 20px)',
};

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <AppShell
      title="Configurações"
      subtitle="Gerencie sua conta e as preferências do sistema."
    >
      <div style={CARD_STYLE}>
        <h6 className="text-white fw-semibold mb-3">Conta</h6>
        <p className="text-secondary mb-1" style={{ fontSize: 13 }}>Nome: {user?.name || 'Usuário'}</p>
        <p className="text-secondary mb-0" style={{ fontSize: 13 }}>Email: {user?.email || 'user@example.com'}</p>
      </div>

      {settingsSections.map((section) => (
        <div key={section.title} style={CARD_STYLE}>
          <h6 className="text-white fw-semibold mb-3">{section.title}</h6>
          {section.options.map((option) => (
            <div key={option.label} className="d-flex align-items-center justify-content-between py-1">
              <div>
                <span className="text-white d-block" style={{ fontSize: 13 }}>{option.label}</span>
                <small className="text-secondary" style={{ fontSize: 11 }}>{option.description}</small>
              </div>
              <div className="form-check form-switch mb-0">
                <input className="form-check-input" type="checkbox" defaultChecked={option.defaultOn} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </AppShell>
  );
}

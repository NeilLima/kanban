'use client';
import React from 'react';
import { InputGroup, FormControl, Button, Dropdown } from 'react-bootstrap';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="d-flex align-items-center justify-content-between px-4" style={{ 
      height: 70, 
      backgroundColor: '#111827',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
    }}>
      {/* Left Section - Logo and Menu */}
      <div className="d-flex align-items-center gap-4">
        {/* Logo */}
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center justify-content-center" style={{ 
            width: 40, 
            height: 40, 
            backgroundColor: '#3b82f6',
            borderRadius: 8
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h6 className="fw-bold text-white mb-0" style={{ fontSize: 18, letterSpacing: 0.5 }}>NEXUS</h6>
            <small className="text-primary mb-0" style={{ fontSize: 10, letterSpacing: 0.5 }}>KANBAN</small>
          </div>
        </div>

        {/* Menu Button */}
        <button className="btn btn-link text-white p-2" style={{ fontSize: 20 }}>
          ☰
        </button>
      </div>

      {/* Center - Search Bar */}
      <div className="d-flex align-items-center" style={{ flex: 1, maxWidth: 600, margin: '0 24px' }}>
        <InputGroup>
          <InputGroup.Text className="bg-transparent border-0 text-secondary" style={{ border: 'none', fontSize: 18 }}>
            🔍
          </InputGroup.Text>
          <FormControl
            placeholder="Buscar tarefas, projetos, membros..."
            size="sm"
            className="bg-dark text-white border-secondary"
            style={{ 
              height: 40,
              backgroundColor: '#1E293B',
              borderColor: 'rgba(255,255,255,0.1)',
              color: '#fff'
            }}
          />
          <InputGroup.Text className="bg-transparent border-0 text-secondary" style={{ border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace' }}>
            ⌘K
          </InputGroup.Text>
        </InputGroup>
      </div>

      {/* Right Actions */}
      <div className="d-flex align-items-center gap-3">
        <Button variant="primary" size="sm" className="d-flex align-items-center gap-2" style={{ 
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          padding: '8px 16px',
          fontSize: 14
        }}>
          + Nova Tarefa
        </Button>

        <button className="btn btn-link text-secondary p-2 position-relative" style={{ fontSize: 18 }}>
          🔔
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger" style={{ fontSize: 10, padding: '2px 5px' }}>
            8
          </span>
        </button>

        <button className="btn btn-link text-secondary p-2" style={{ fontSize: 18 }}>
          ❓
        </button>

        <button className="btn btn-link text-secondary p-2" onClick={toggleTheme} style={{ fontSize: 18 }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <Dropdown>
          <Dropdown.Toggle variant="link" className="text-white p-0 d-flex align-items-center gap-2" style={{ textDecoration: 'none' }}>
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold" style={{ width: 36, height: 36, fontSize: 14, overflow: 'hidden' }}>
                <img src="https://i.pravatar.cc/150?img=12" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="d-none d-lg-block">
                <div className="text-white" style={{ fontSize: 14, fontWeight: 500 }}>{user?.name || 'Victor Lima'}</div>
                <div className="text-secondary" style={{ fontSize: 11 }}>Administrador</div>
              </div>
              <i className="bi bi-chevron-down text-secondary" style={{ fontSize: 12 }}></i>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-dark border-secondary">
            <Dropdown.Item className="text-white">Perfil</Dropdown.Item>
            <Dropdown.Item className="text-white">Configurações</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-white">Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

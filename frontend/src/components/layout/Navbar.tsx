'use client';
import React, { useState } from 'react';
import { Form, InputGroup, Dropdown } from 'react-bootstrap';

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav 
      className="d-flex align-items-center justify-content-between"
      style={{
        height: 60,
        padding: '0 20px',
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        flexShrink: 0,
      }}
    >
      {/* Logo + Search */}
      <div className="d-flex align-items-center gap-3" style={{ flex: 1, maxWidth: 500 }}>
        <div className="d-flex align-items-center gap-2" style={{ flexShrink: 0 }}>
          <div 
            className="d-flex align-items-center justify-content-center"
            style={{ 
              width: 32, 
              height: 32, 
              backgroundColor: '#3b82f6', 
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
          >
            <span className="fw-bold text-white" style={{ fontSize: 16 }}>N</span>
          </div>
          <div className="d-none d-md-block">
            <span className="fw-bold text-white" style={{ fontSize: 15, letterSpacing: 0.5 }}>NEXUS</span>
            <span className="text-secondary ms-1" style={{ fontSize: 10, letterSpacing: 0.5 }}>KANBAN</span>
          </div>
        </div>

        <InputGroup style={{ maxWidth: 300 }} className="d-none d-md-flex">
          <InputGroup.Text 
            className="bg-transparent border-0"
            style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.6) !important',
              color: '#64748b',
              borderRadius: '8px 0 0 8px',
              border: '1px solid rgba(255, 255, 255, 0.06) !important',
              borderRight: 'none !important'
            }}
          >
            <i className="bi bi-search" style={{ fontSize: 14 }}></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="Pesquisar projetos, tarefas..."
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.6) !important',
              borderColor: 'rgba(255, 255, 255, 0.06) !important',
              color: '#F8FAFC !important',
              fontSize: 13,
              borderRadius: '0 8px 8px 0',
              borderLeft: 'none',
            }}
          />
        </InputGroup>
      </div>

      {/* Right Actions */}
      <div className="d-flex align-items-center gap-2">
        <button 
          className="btn btn-primary d-flex align-items-center gap-1"
          style={{ 
            fontSize: 13, 
            fontWeight: 500,
            padding: '6px 14px',
            borderRadius: 8,
            whiteSpace: 'nowrap'
          }}
        >
          <i className="bi bi-plus-lg" style={{ fontSize: 16 }}></i>
          <span className="d-none d-md-inline">Nova Tarefa</span>
        </button>

        <button 
          className="btn p-0 d-flex align-items-center justify-content-center position-relative"
          style={{
            width: 36,
            height: 36,
            color: '#94A3B8',
            border: 'none',
            background: 'transparent',
            borderRadius: 8,
            cursor: 'pointer',
          }}
          title="Notificações"
        >
          <i className="bi bi-bell" style={{ fontSize: 18 }}></i>
          <span 
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '2px solid #111827',
            }}
          ></span>
        </button>

        <button 
          className="btn p-0 d-none d-md-flex align-items-center justify-content-center"
          style={{
            width: 36,
            height: 36,
            color: '#94A3B8',
            border: 'none',
            background: 'transparent',
            borderRadius: 8,
            cursor: 'pointer',
          }}
          title="Ajuda"
        >
          <i className="bi bi-question-circle" style={{ fontSize: 18 }}></i>
        </button>

        <button 
          className="btn p-0 d-none d-md-flex align-items-center justify-content-center"
          style={{
            width: 36,
            height: 36,
            color: '#94A3B8',
            border: 'none',
            background: 'transparent',
            borderRadius: 8,
            cursor: 'pointer',
          }}
          title="Tema"
        >
          <i className="bi bi-moon" style={{ fontSize: 18 }}></i>
        </button>

        {/* Avatar Dropdown */}
        <Dropdown show={showProfile} onToggle={setShowProfile}>
          <Dropdown.Toggle
            as="button"
            className="btn p-0 border-0 d-flex align-items-center"
            style={{ background: 'transparent', cursor: 'pointer' }}
            id="profile-dropdown"
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                border: '2px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
              }}
            >
              V
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu 
            style={{ 
              backgroundColor: '#1E293B',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 8,
              marginTop: 8,
              minWidth: 200,
            }}
          >
            <Dropdown.Header style={{ padding: '8px 12px' }}>
              <div className="fw-semibold text-white" style={{ fontSize: 13 }}>Victor</div>
              <div className="text-secondary" style={{ fontSize: 11 }}>victor@nexus.com</div>
            </Dropdown.Header>
            <Dropdown.Divider style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }} />
            <Dropdown.Item style={{ color: '#94A3B8', fontSize: 13, padding: '6px 12px' }}>
              <i className="bi bi-person me-2"></i>Meu Perfil
            </Dropdown.Item>
            <Dropdown.Item style={{ color: '#94A3B8', fontSize: 13, padding: '6px 12px' }}>
              <i className="bi bi-gear me-2"></i>Configurações
            </Dropdown.Item>
            <Dropdown.Item style={{ color: '#94A3B8', fontSize: 13, padding: '6px 12px' }}>
              <i className="bi bi-question-circle me-2"></i>Ajuda
            </Dropdown.Item>
            <Dropdown.Divider style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }} />
            <Dropdown.Item style={{ color: '#ef4444', fontSize: 13, padding: '6px 12px' }}>
              <i className="bi bi-box-arrow-right me-2"></i>Sair
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}
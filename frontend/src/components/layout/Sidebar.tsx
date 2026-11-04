'use client';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
}

const menuItems = [
  { label: 'Dashboard', icon: 'bi-speedometer2', path: '/dashboard' },
  { label: 'Projetos', icon: 'bi-folder', path: '/projects' },
  { label: 'Tarefas', icon: 'bi-columns', path: '/tarefas' },
  { label: 'Calendário', icon: 'bi-calendar', path: '/calendar' },
  { label: 'Equipe', icon: 'bi-people', path: '/team' },
  { label: 'Relatórios', icon: 'bi-graph-up', path: '/reports' },
  { label: 'Favoritos', icon: 'bi-star', path: '/favorites' },
];

const favoriteItems = [
  { label: 'Website Redesign', icon: 'bi-star-fill', color: '#3b82f6' },
  { label: 'Aplicativo Mobile', icon: 'bi-star-fill', color: '#8b5cf6' },
  { label: 'API Backend', icon: 'bi-circle-fill', color: '#10b981' },
];

const otherItems = [
  { label: 'Arquivados', icon: 'bi-archive', path: '/archived' },
  { label: 'Lixeira', icon: 'bi-trash', path: '/trash' },
  { label: 'Configurações', icon: 'bi-gear', path: '/settings' },
  { label: 'Perfil', icon: 'bi-person-circle', path: '/profile' },
];


export default function Sidebar({ collapsed = false, onToggle, onNavigate }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  function navegar(path: string) {
    if (path !== '#') router.push(path);
    onNavigate?.();
  }

  return (
    <div className="d-flex flex-column h-100" style={{ 
      width: '100%', 
      backgroundColor: '#0B1120', 
      borderRight: '1px solid rgba(255,255,255,0.05)', 
      overflow: 'hidden'
    }}>
      {/* Logo + Toggle */}
      <div className="d-flex align-items-center justify-content-between p-2 p-md-3" style={{ flexShrink: 0 }}>
        <div className="d-flex align-items-center gap-2" style={{ minWidth: 0 }}>
          <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: collapsed ? 32 : 'clamp(24px, 3vw, 36px)', height: collapsed ? 32 : 'clamp(24px, 3vw, 36px)', backgroundColor: '#3b82f6', borderRadius: 'clamp(4px, 0.6vw, 8px)' }}>
            <span className="fw-bold text-white" style={{ fontSize: collapsed ? 16 : 'clamp(12px, 1.4vw, 18px)' }}>N</span>
          </div>
          {!collapsed && (
            <div className="d-none d-md-block" style={{ minWidth: 0 }}>
              <h6 className="fw-bold text-white mb-0" style={{ fontSize: 'clamp(11px, 1.2vw, 15px)', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>NEXUS</h6>
              <small className="text-secondary" style={{ fontSize: 'clamp(8px, 0.7vw, 10px)' }}>TAREFAS</small>
            </div>
          )}
        </div>
        <button 
          onClick={onToggle} 
          className="btn btn-sm p-0 d-flex align-items-center justify-content-center"
          style={{ width: 24, height: 24, color: '#94a3b8', border: 'none', background: 'transparent', cursor: 'pointer' }}
        >
          <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`} style={{ fontSize: 14 }}></i>
        </button>
      </div>

      {/* Menu Principal */}
      {!collapsed && <div className="px-3 px-md-3 mb-1"><small className="text-secondary fw-semibold" style={{ fontSize: 'clamp(9px, 0.8vw, 11px)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Principal</small></div>}
      <ListGroup variant="flush" className="px-1 px-md-2 mb-1" style={{ flexShrink: 0 }}>
        {menuItems.map((item) => (
          <ListGroup.Item
            key={item.label}
            action
            onClick={() => navegar(item.path)}
            className="d-flex align-items-center gap-2 border-0 rounded"
            style={{ 
              cursor: 'pointer',
              backgroundColor: pathname === item.path ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              color: pathname === item.path ? '#3b82f6' : '#94a3b8',
              padding: collapsed ? '8px' : 'clamp(4px, 0.5vw, 7px) clamp(6px, 0.8vw, 12px)',
              marginBottom: '1px',
              justifyContent: collapsed ? 'center' : 'flex-start'
            }}
          >
            <i className={`bi ${item.icon}`} style={{ fontSize: collapsed ? 18 : 'clamp(12px, 1.2vw, 16px)' }}></i>
            {!collapsed && <span style={{ fontSize: 'clamp(11px, 1vw, 14px)', fontWeight: 500, whiteSpace: 'nowrap' }}>{item.label}</span>}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Itens roláveis */}
      {!collapsed && (
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {/* Favoritos */}
          <div className="px-3 px-md-3 mb-1">
            <small className="text-secondary fw-semibold" style={{ fontSize: 'clamp(9px, 0.8vw, 11px)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Favoritos</small>
          </div>
          <ListGroup variant="flush" className="px-1 px-md-2 mb-1">
            {favoriteItems.map((item) => (
              <ListGroup.Item
                key={item.label}
                action
                className="d-flex align-items-center gap-2 border-0 rounded"
                style={{ 
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: 'clamp(3px, 0.4vw, 6px) clamp(6px, 0.8vw, 12px)',
                  marginBottom: '1px'
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }}></span>
                <span style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', whiteSpace: 'nowrap' }}>{item.label}</span>
              </ListGroup.Item>
            ))}
            {/* Ver todos */}
            <ListGroup.Item
              action
              className="d-flex align-items-center gap-2 border-0 rounded"
              style={{ 
                cursor: 'pointer',
                color: '#94a3b8',
                padding: 'clamp(3px, 0.4vw, 6px) clamp(6px, 0.8vw, 12px)',
              }}
            >
              <i className="bi bi-chevron-down" style={{ fontSize: 11 }}></i>
              <span style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>Ver todos</span>
            </ListGroup.Item>
          </ListGroup>

          {/* Outros */}
          <div className="px-3 px-md-3 mb-1">
            <small className="text-secondary fw-semibold" style={{ fontSize: 'clamp(9px, 0.8vw, 11px)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Outros</small>
          </div>
          <ListGroup variant="flush" className="px-1 px-md-2 mb-1">
            {otherItems.map((item) => (
              <ListGroup.Item
                key={item.label}
                action
                onClick={() => navegar(item.path)}
                className="d-flex align-items-center gap-2 border-0 rounded"
                style={{ 
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: 'clamp(3px, 0.4vw, 6px) clamp(6px, 0.8vw, 12px)',
                  marginBottom: '1px'
                }}
              >
                <i className={`bi ${item.icon}`} style={{ fontSize: 'clamp(12px, 1.1vw, 15px)' }}></i>
                <span style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', whiteSpace: 'nowrap' }}>{item.label}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}

      {/* Upgrade Card - esconder em mobile */}
      {!collapsed && (
        <div className="d-none d-md-block px-2 px-md-2 mb-1" style={{ flexShrink: 0 }}>
          <div className="p-3 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.18)' }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span style={{ color: '#fbbf24', fontSize: 14, lineHeight: 1 }}>👑</span>
              <span className="fw-semibold text-white" style={{ fontSize: 13 }}>Plano Profissional</span>
            </div>
            <p className="text-secondary mb-2" style={{ fontSize: 11, lineHeight: 1.4 }}>
              Aproveite recursos avançados e aumente sua produtividade.
            </p>
            <button className="btn btn-primary w-100" style={{ fontSize: 12, padding: '5px 8px', fontWeight: 500 }}>
              Fazer Upgrade
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      {!collapsed && (
        <div className="p-2 p-md-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <small className="text-secondary d-block" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)' }}>
            Nexus Tarefas v2.0.0
          </small>
          <small className="text-secondary d-block mt-1" style={{ fontSize: 'clamp(7px, 0.6vw, 10px)' }}>
            © 2024 Todos os direitos reservados.
          </small>
        </div>
      )}
    </div>
  );
}
'use client';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const menuItems = [
  { label: 'Dashboard', icon: 'bi-speedometer2', path: '/dashboard' },
  { label: 'Projetos', icon: 'bi-folder', path: '/projects' },
  { label: 'Kanban', icon: 'bi-columns', path: '/dashboard' },
  { label: 'Calendário', icon: 'bi-calendar', path: '#' },
  { label: 'Equipe', icon: 'bi-people', path: '#' },
  { label: 'Relatórios', icon: 'bi-graph-up', path: '#' },
];

const favoriteItems = [
  { label: 'Website Redesign', icon: 'bi-star-fill', color: '#3b82f6' },
  { label: 'Aplicativo Mobile', icon: 'bi-star-fill', color: '#8b5cf6' },
  { label: 'API Backend', icon: 'bi-circle-fill', color: '#10b981' },
];

const otherItems = [
  { label: 'Arquivados', icon: 'bi-archive', path: '#' },
  { label: 'Lixeira', icon: 'bi-trash', path: '#' },
];

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

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
              <small className="text-secondary" style={{ fontSize: 'clamp(8px, 0.7vw, 10px)' }}>KANBAN</small>
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
            onClick={() => item.path !== '#' && router.push(item.path)}
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
                <i className={`bi ${item.icon}`} style={{ fontSize: 'clamp(9px, 0.8vw, 11px)', color: item.color }}></i>
                <span style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', whiteSpace: 'nowrap' }}>{item.label}</span>
              </ListGroup.Item>
            ))}
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
                onClick={() => item.path !== '#' && router.push(item.path)}
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
          <div className="p-2 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <div className="d-flex align-items-center gap-1 mb-1">
              <i className="bi bi-star-fill" style={{ color: '#fbbf24', fontSize: 'clamp(10px, 0.9vw, 12px)' }}></i>
              <span className="fw-semibold text-white" style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}>Pro</span>
            </div>
            <p className="text-secondary mb-1" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', lineHeight: 1.3 }}>
              Recursos avançados
            </p>
            <button className="btn btn-primary w-100" style={{ fontSize: 'clamp(9px, 0.8vw, 12px)', padding: '2px 8px' }}>
              Upgrade
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      {!collapsed && (
        <div className="p-2 p-md-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <small className="text-secondary" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)' }}>
            Nexus Kanban v2.0.0
          </small>
        </div>
      )}
    </div>
  );
}
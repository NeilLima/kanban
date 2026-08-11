'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import StatCardComp from '@/components/dashboard/stat-card/components/StatCardComp';
import { useStatCard } from '@/components/dashboard/stat-card/utils/StatCardUtils';
import ProjectHeaderComp from '@/components/dashboard/project-header/components/ProjectHeaderComp';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

const BoardComp = dynamic(() => import('@/shared/kanban/board/components/BoardComp'), { ssr: false });

export default function DashboardPage() {
  const { state } = useStatCard();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const isMobile = window.innerWidth < 768;
      setMobileView(isMobile);
      setSidebarOpen(!isMobile);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <div className="d-flex" style={{ backgroundColor: '#0B1120', overflowX: 'hidden', width: '100vw', maxWidth: '100%', minHeight: '100vh' }}>
      {/* Overlay escuro para mobile */}
      {mobileView && sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1049
          }}
        />
      )}

      {/* Sidebar */}
      <div 
        style={{ 
          width: mobileView ? 260 : 'clamp(60px, 18vw, 240px)',
          minWidth: mobileView ? 260 : (sidebarOpen ? 'clamp(60px, 18vw, 240px)' : 60),
          overflow: 'hidden',
          transition: 'width 0.3s ease, min-width 0.3s ease, transform 0.3s ease',
          flexShrink: 0,
          position: mobileView ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 1050,
          transform: mobileView ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
          boxShadow: mobileView && sidebarOpen ? '0 0 30px rgba(0,0,0,0.6)' : 'none'
        }}
      >
        <Sidebar collapsed={!sidebarOpen && !mobileView} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Main Content */}
      <div className="d-flex flex-column flex-fill" style={{ minWidth: 0, overflowX: 'hidden' }}>
        {/* Navbar */}
        <Navbar />

        {/* Mobile Header */}
        {mobileView && (
          <div className="d-flex align-items-center px-3 py-2" style={{ flexShrink: 0, backgroundColor: '#0B1120', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="btn p-0 me-3" 
              style={{ color: '#fff', border: 'none', background: 'transparent', fontSize: 24 }}
            >
              ☰
            </button>
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          padding: mobileView ? '8px' : '20px', 
          gap: mobileView ? '8px' : '16px'
        }}>
          {/* Project Header */}
          <div style={{ flexShrink: 0 }}>
            <ProjectHeaderComp />
          </div>

          {/* Stats Cards */}
          <div style={{ flexShrink: 0 }}>
            <Row className="g-2 g-md-3">
              {state.stats.map(stat => (
                <Col xs={6} md={3} key={stat.id}>
                  <StatCardComp stat={stat} />
                </Col>
              ))}
            </Row>
          </div>

          {/* Toolbar */}
          <div style={{ flexShrink: 0 }}>
            <Card style={{ 
              backgroundColor: '#1E293B',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12
            }}>
              <Card.Body className="py-2 px-3">
                <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <InputGroup size="sm" style={{ maxWidth: mobileView ? 130 : 240 }}>
                      <InputGroup.Text className="bg-transparent border-secondary text-secondary" style={{ fontSize: 13 }}>
                        <i className="bi bi-search"></i>
                      </InputGroup.Text>
                      <FormControl 
                        placeholder={mobileView ? "Buscar" : "Buscar tarefas..."} 
                        size="sm"
                        style={{ backgroundColor: '#0B1120', borderColor: 'rgba(255,255,255,0.06)', color: '#F8FAFC', fontSize: 13 }}
                      />
                    </InputGroup>
                    {!mobileView && (
                      <>
                        <button className="btn btn-outline-secondary btn-sm" style={{ fontSize: 13 }}>
                          <i className="bi bi-funnel me-1"></i>Filtros
                        </button>
                        <button className="btn btn-outline-secondary btn-sm" style={{ fontSize: 13 }}>
                          <i className="bi bi-sort-down me-1"></i>Ordenar
                        </button>
                      </>
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-secondary btn-sm px-2" title="Calendário">
                      <i className="bi bi-calendar3" style={{ fontSize: 14 }}></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm px-2" title="Visualização">
                      <i className="bi bi-grid-3x3-gap" style={{ fontSize: 14 }}></i>
                    </button>
                    <button className="btn btn-primary btn-sm" style={{ fontSize: 13, fontWeight: 500 }}>
                      <i className="bi bi-plus-lg me-1"></i>Nova
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card> 
          </div>

          {/* Kanban Board */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <BoardComp projectId="default-project" />
          </div>
        </div>
      </div>
    </div>
  );
}
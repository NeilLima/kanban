'use client';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AppShell from '@/components/layout/AppShell';
import StatCardComp from '@/components/dashboard/stat-card/components/StatCardComp';
import { useStatCard } from '@/components/dashboard/stat-card/utils/StatCardUtils';
import ProjectHeaderComp from '@/components/dashboard/project-header/components/ProjectHeaderComp';
import MyTasksComp from '@/components/dashboard/my-tasks/components/MyTasksComp';
import ProductivityChartComp from '@/components/dashboard/productivity-chart/components/ProductivityChartComp';
import ActivityFeedComp from '@/components/dashboard/activity-feed/components/ActivityFeedComp';
import TeamOverviewComp from '@/components/dashboard/team-overview/components/TeamOverviewComp';
import DeadlinesComp from '@/components/dashboard/deadlines/components/DeadlinesComp';

export default function DashboardPage() {
  const { state } = useStatCard();

  return (
    <AppShell
      title="Dashboard"
      subtitle="Visão geral dos seus projetos e tarefas."
    >
      {/* Project Header */}
      <ProjectHeaderComp />

      {/* Stats Cards */}
      <Row className="g-2 g-md-3">
        {state.stats.map(stat => (
          <Col xs={6} md={3} key={stat.id}>
            <StatCardComp stat={stat} />
          </Col>
        ))}
      </Row>

      {/* Produtividade + Atividades Recentes */}
      <Row className="g-2 g-md-3">
        <Col xs={12} lg={8}>
          <ProductivityChartComp />
        </Col>
        <Col xs={12} lg={4}>
          <ActivityFeedComp />
        </Col>
      </Row>

      {/* Prévia compacta de tarefas pendentes */}
      <MyTasksComp />

      {/* Equipe + Próximos Prazos */}
      <Row className="g-2 g-md-3">
        <Col xs={12} lg={7}>
          <TeamOverviewComp />
        </Col>
        <Col xs={12} lg={5}>
          <DeadlinesComp />
        </Col>
      </Row>
    </AppShell>
  );
}

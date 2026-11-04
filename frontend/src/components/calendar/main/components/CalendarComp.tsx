'use client';

import React, { useMemo, useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { StyledViewToggle, StyledCard, StyledSectionTitle } from '@/components/layout/AppShellStyles';
import {
  StyledCalendarHeader,
  StyledMonthTitle,
  StyledNavButton,
  StyledCalendarGrid,
  StyledWeekDay,
  StyledDayCell,
  StyledDayNumber,
  StyledEvent,
  StyledUpcomingList,
  StyledUpcomingItem,
  StyledUpcomingDate,
  StyledUpcomingDay,
  StyledUpcomingMonth,
  StyledUpcomingTitle,
  StyledUpcomingProject,
} from '../styles/CalendarStyles';

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

interface CalendarEvent {
  day: number;
  month: number;
  title: string;
  project: string;
  color: string;
}

const EVENTS: CalendarEvent[] = [
  { day: 12, month: 4, title: 'Entrega do MVP', project: 'Plataforma Nexus', color: '#3b82f6' },
  { day: 19, month: 4, title: 'Sprint Review', project: 'Website Redesign', color: '#8b5cf6' },
  { day: 21, month: 4, title: 'Deploy v2.0', project: 'API Backend', color: '#10b981' },
  { day: 25, month: 4, title: 'Reunião com cliente', project: 'Aplicativo Mobile', color: '#f59e0b' },
  { day: 28, month: 4, title: 'Prazo: Autenticação', project: 'Plataforma Nexus', color: '#ef4444' },
];

export default function CalendarComp() {
  const today = new Date();
  const [view, setView] = useState<'mensal' | 'semanal' | 'diario'>('mensal');
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    const cells: { day: number; month: number; current: boolean }[] = [];

    for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, month: month - 1, current: false });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, month, current: true });
    while (cells.length % 7 !== 0) {
      const next = cells[cells.length - 1];
      cells.push({ day: (next.month === month ? next.day : 0) + 1, month: month + 1, current: false });
    }
    return cells;
  }, [month, year]);

  const navigate = (dir: number) => {
    const m = month + dir;
    if (m < 0) { setMonth(11); setYear(year - 1); } else if (m > 11) { setMonth(0); setYear(year + 1); } else setMonth(m);
  };

  const upcoming = [...EVENTS].sort((a, b) => a.day - b.day).slice(0, 4);

  return (
    <AppShell
      title="Calendário"
      subtitle="Visualize eventos, prazos e reuniões do seu projeto."
      headerActions={
        <StyledViewToggle>
          {(['mensal', 'semanal', 'diario'] as const).map((v) => (
            <button key={v} className={view === v ? 'active' : ''} onClick={() => setView(v)}>
              {v === 'diario' ? 'Diário' : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </StyledViewToggle>
      }
    >
      <StyledCard>
        <StyledCalendarHeader className="mb-3">
          <StyledMonthTitle>
            <StyledNavButton onClick={() => navigate(-1)} title="Mês anterior">
              <i className="bi bi-chevron-left" style={{ fontSize: 12 }}></i>
            </StyledNavButton>
            {MONTHS[month]} {year}
            <StyledNavButton onClick={() => navigate(1)} title="Próximo mês">
              <i className="bi bi-chevron-right" style={{ fontSize: 12 }}></i>
            </StyledNavButton>
          </StyledMonthTitle>
          <button className="btn btn-primary btn-sm" style={{ fontSize: 12, fontWeight: 500 }}>
            <i className="bi bi-plus-lg me-1"></i>Novo Evento
          </button>
        </StyledCalendarHeader>

        <StyledCalendarGrid>
          {WEEK_DAYS.map((d) => (
            <StyledWeekDay key={d}>{d}</StyledWeekDay>
          ))}
          {days.map((cell, idx) => {
            const isToday = cell.current && cell.day === today.getDate() && cell.month === today.getMonth() && year === today.getFullYear();
            const cellEvents = EVENTS.filter((e) => e.day === cell.day && e.month === cell.month);
            return (
              <StyledDayCell key={idx} $currentMonth={cell.current} $isToday={isToday}>
                <StyledDayNumber $currentMonth={cell.current} $isToday={isToday}>{cell.day}</StyledDayNumber>
                {cellEvents.map((e) => (
                  <StyledEvent key={e.title} $color={e.color} title={e.title}>{e.title}</StyledEvent>
                ))}
              </StyledDayCell>
            );
          })}
        </StyledCalendarGrid>
      </StyledCard>

      <StyledCard>
        <StyledSectionTitle>Próximos Prazos</StyledSectionTitle>
        <StyledUpcomingList>
          {upcoming.map((e) => (
            <StyledUpcomingItem key={e.title}>
              <StyledUpcomingDate $color={e.color}>
                <StyledUpcomingDay $color={e.color}>{e.day}</StyledUpcomingDay>
                <StyledUpcomingMonth $color={e.color}>{MONTHS[e.month].slice(0, 3)}</StyledUpcomingMonth>
              </StyledUpcomingDate>
              <div style={{ minWidth: 0 }}>
                <StyledUpcomingTitle>{e.title}</StyledUpcomingTitle>
                <br />
                <StyledUpcomingProject>{e.project}</StyledUpcomingProject>
              </div>
            </StyledUpcomingItem>
          ))}
        </StyledUpcomingList>
      </StyledCard>
    </AppShell>
  );
}

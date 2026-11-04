import type { CSSProperties } from 'react';

export const PROJECT_SORT_OPTIONS = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'name', label: 'Nome (A-Z)' },
  { value: 'progress', label: 'Maior progresso' },
  { value: 'tasks', label: 'Mais tarefas' },
] as const;

export type ProjectSortValue = (typeof PROJECT_SORT_OPTIONS)[number]['value'];

export const STAT_CARDS_STYLE: CSSProperties = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12,
  padding: 'clamp(12px, 1.4vw, 18px)',
  boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
};

export const PROJECT_CARD_STYLE: CSSProperties = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12,
  padding: 0,
  height: '100%',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
  transition: 'all 0.2s ease',
};

export function sortProjects<T extends { name: string; createdAt: string; progress: number; tasksTotal: number }>(
  projects: T[],
  sort: ProjectSortValue
): T[] {
  const sorted = [...projects];
  switch (sort) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'progress':
      return sorted.sort((a, b) => b.progress - a.progress);
    case 'tasks':
      return sorted.sort((a, b) => b.tasksTotal - a.tasksTotal);
    case 'recent':
    default:
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export function formatDateBR(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  } catch {
    return '';
  }
}

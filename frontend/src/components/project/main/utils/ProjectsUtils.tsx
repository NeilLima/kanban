import { useState, useCallback, useMemo } from 'react';
import { useProjectsService } from '../services/ProjectsServices';
import { useFeedbackActions } from '@/shared/feedback/utils/FeedbackUtils';
import type {
  ProjectsState,
  ProjectsActions,
  CreateProjectData,
  Project,
} from '../types/ProjectsTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const PROJECT_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#14b8a6', '#ef4444'];

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useProjects() {
  const service = useProjectsService();
  const feedback = useFeedbackActions();
  const [showCreate, setShowCreate] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const projects = useMemo(() => service.projects, [service.projects]);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const toggleFavorite = useCallback(
    (id: string) => {
      const project = projects.find((p) => p.id === id);
      if (!project) return;
      void service
        .atualizar({ id, data: { isFavorite: !project.isFavorite } })
        .then(() => feedback.showFeedback({ variant: 'success', message: 'Projeto atualizado.' }))
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao atualizar projeto.' }));
    },
    [projects, service, feedback],
  );

  const archiveProject = useCallback(
    (id: string) => {
      const project = projects.find((p) => p.id === id);
      if (!project) return;
      void service
        .atualizar({ id, data: { isArchived: !project.isArchived } })
        .then(() => feedback.showFeedback({ variant: 'success', message: 'Projeto atualizado.' }))
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao atualizar projeto.' }));
    },
    [projects, service, feedback],
  );

  const deleteProject = useCallback(
    (id: string) => {
      feedback.showConfirm({
        title: 'Excluir projeto',
        message: 'Tem certeza que deseja excluir este projeto? O quadro e as tarefas também serão removidos.',
        confirmLabel: 'Excluir',
        onConfirm: () => {
          void service
            .remover(id)
            .then(() => feedback.showFeedback({ variant: 'success', message: 'Projeto excluído.' }))
            .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao excluir projeto.' }));
        },
      });
    },
    [service, feedback],
  );

  const addProject = useCallback(
    (data: CreateProjectData) => {
      const payload: CreateProjectData = {
        ...data,
        color: data.color || PROJECT_COLORS[projects.length % PROJECT_COLORS.length],
      };
      void service
        .criar(payload)
        .then(() => {
          setShowCreate(false);
          feedback.showFeedback({ variant: 'success', message: 'Projeto criado.' });
        })
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao criar projeto.' }));
    },
    [projects.length, service, feedback],
  );

  const openCreate = useCallback(() => setShowCreate(true), []);
  const closeCreate = useCallback(() => setShowCreate(false), []);

  const openEdit = useCallback(
    (id: string) => {
      const projeto = projects.find((p) => p.id === id);
      if (projeto) setEditingProject(projeto);
    },
    [projects],
  );

  const closeEdit = useCallback(() => setEditingProject(null), []);

  const updateProject = useCallback(
    (id: string, data: CreateProjectData) => {
      service
        .atualizar({ id, data: { name: data.name, description: data.description, color: data.color } })
        .then(() => feedback.showFeedback({ variant: 'success', message: 'Projeto atualizado.' }))
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao atualizar projeto.' }))
        .finally(() => setEditingProject(null));
    },
    [service, feedback],
  );

  const state: ProjectsState = {
    projects,
    loading: service.isLoading,
    error: service.error || null,
    showCreate,
    editingProject,
  };

  const actions: ProjectsActions = {
    toggleFavorite,
    archiveProject,
    deleteProject,
    addProject,
    openCreate,
    closeCreate,
    openEdit,
    closeEdit,
    updateProject,
  };

  return { state, actions };
}
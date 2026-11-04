import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectsService } from '@/components/project/main/services/ProjectsServices';
import { useAuth } from '@/contexts/AuthContext';
import { useFeedbackActions } from '@/shared/feedback/utils/FeedbackUtils';
import type { CreateProjectData } from '@/components/project/main/types/ProjectsTypes';
import type { UserOption } from '@/components/task/main/types/TaskTypes';
import type { ProjectDetailState, ProjectDetailActions } from '../types/ProjectDetailTypes';

const PROJETOS_ROTA = '/projects';
const PAPEIS_ADMIN = ['OWNER', 'ADMIN'];

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useProjectDetail(projectId: string) {
  const [showEdit, setShowEdit] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [users, setUsers] = useState<UserOption[]>([]);
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useProjectsService();
  const { user } = useAuth();
  const feedback = useFeedbackActions();
  const router = useRouter();

  const project = useMemo(
    () => service.projects.find((p) => p.id === projectId) ?? null,
    [service.projects, projectId],
  );

  const meuPapel = project?.members.find((m) => m.userId === user?.id)?.role;
  const isAdmin = Boolean(meuPapel && PAPEIS_ADMIN.includes(meuPapel));
  const membersCount = project?.members.length ?? 0;

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const data = (await fetch('/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        }).then((r) => r.json())) as Array<{ id: string; email?: string; profile?: { firstName?: string; lastName?: string } | null }> | undefined;
        const lista = (data ?? [])
          .filter((u) => u.id !== user?.id)
          .map((u) => ({ id: u.id, name: `${u.profile?.firstName ?? ''} ${u.profile?.lastName ?? ''}`.trim() || u.email || 'Usuário', email: u.email }));
        setUsers(lista);
      } catch {
        setUsers([]);
      }
    };
    carregarUsuarios();
  }, [user?.id]);

  const state: ProjectDetailState = {
    project,
    loading: service.isLoading,
    isAdmin,
    tasksTotal: project?.tasksTotal ?? 0,
    tasksDone: project?.tasksDone ?? 0,
    progress: project?.progress ?? 0,
    showEdit,
    showAddTask,
    showAddMember,
    users,
    membersCount,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleVoltar = useCallback(() => router.push(PROJETOS_ROTA), [router]);

  const handleEditar = useCallback(() => setShowEdit(true), []);
  const handleFecharEdicao = useCallback(() => setShowEdit(false), []);

  const updateProject = useCallback(
    (id: string, data: CreateProjectData) => {
      service
        .atualizar({ id, data: { name: data.name, description: data.description, color: data.color } })
        .then(() => feedback.showFeedback({ variant: 'success', message: 'Projeto atualizado.' }))
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao atualizar projeto.' }))
        .finally(() => setShowEdit(false));
    },
    [service, feedback],
  );

  const handleExcluir = useCallback(() => {
    if (!project) return;
    feedback.showConfirm({
      title: 'Excluir projeto',
      message: `Tem certeza que deseja excluir "${project.name}"? O quadro e as tarefas também serão removidos.`,
      confirmLabel: 'Excluir',
      onConfirm: () => {
        service
          .remover(project.id)
          .then(() => {
            feedback.showFeedback({ variant: 'success', message: 'Projeto excluído.' });
            router.push(PROJETOS_ROTA);
          })
          .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao excluir projeto.' }));
      },
    });
  }, [project, service, feedback, router]);

  const handleAddTask = useCallback(() => setShowAddTask(true), []);
  const handleCloseAddTask = useCallback(() => setShowAddTask(false), []);
  const handleAddMember = useCallback(() => setShowAddMember(true), []);
  const handleCloseAddMember = useCallback(() => setShowAddMember(false), []);

  const actions: ProjectDetailActions = {
    handleVoltar,
    handleEditar,
    handleFecharEdicao,
    handleExcluir,
    updateProject,
    handleAddTask,
    handleCloseAddTask,
    handleAddMember,
    handleCloseAddMember,
    refetch: service.refetch,
  };

  return { state, actions };
}

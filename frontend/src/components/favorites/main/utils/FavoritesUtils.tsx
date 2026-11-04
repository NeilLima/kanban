import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectsService } from '@/components/project/main/services/ProjectsServices';
import { useFeedbackActions } from '@/shared/feedback/utils/FeedbackUtils';
import type { FavoriteItem, FavoritesState } from '../types/FavoritesTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const KANBAN_ROTA = '/kanban';
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function dataAtualizacao(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return `Atualizado em ${d.getDate()} ${MESES[d.getMonth()]}`;
}

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useFavorites() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useProjectsService();
  const feedback = useFeedbackActions();
  const router = useRouter();

  const items: FavoriteItem[] = useMemo(
    () =>
      service.projects
        .filter((p) => p.isFavorite)
        .map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description || 'Projeto favorito.',
          date: dataAtualizacao(p.createdAt),
          icon: 'bi-folder',
          color: p.color || '#3b82f6',
        })),
    [service.projects],
  );

  const state: FavoritesState = {
    items,
    loading: service.isLoading,
    error: service.error,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleAbrir = useCallback(
    (id: string) => {
      router.push(`${KANBAN_ROTA}?project=${id}`);
    },
    [router],
  );

  const handleRemover = useCallback(
    (id: string) => {
      service
        .atualizar({ id, data: { isFavorite: false } })
        .then(() => feedback.showFeedback({ variant: 'success', message: 'Removido dos favoritos.' }))
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao remover favorito.' }));
    },
    [service, feedback],
  );

  const actions = {
    handleAbrir,
    handleRemover,
    refetch: service.refetch,
  };

  return { state, actions };
}
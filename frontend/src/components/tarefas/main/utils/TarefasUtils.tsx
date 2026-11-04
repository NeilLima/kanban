import { useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { TarefasState, TarefasActions } from '../types/TarefasTypes';

export function useTarefas() {
  const searchParams = useSearchParams();
  const [showCreate, setShowCreate] = useState(false);

  const projectId = searchParams.get('project') || 'default-project';

  const state: TarefasState = {
    projectId,
    loading: false,
    showCreate,
  };

  const handleNovaTarefa = useCallback(() => {
    setShowCreate(true);
  }, []);

  const handleAbrirCreate = useCallback(() => {
    setShowCreate(true);
  }, []);

  const handleFecharCreate = useCallback(() => {
    setShowCreate(false);
  }, []);

  const actions: TarefasActions = {
    handleNovaTarefa,
    handleAbrirCreate,
    handleFecharCreate,
  };

  return { state, actions };
}

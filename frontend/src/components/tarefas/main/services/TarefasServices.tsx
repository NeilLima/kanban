import { list } from '@/services/crudService';

export function useTarefasService() {
  const data = list('tarefas');
  return { data };
}

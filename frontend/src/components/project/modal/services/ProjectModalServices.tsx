import { list } from '@/services/crudService';

export function useProjectModalService() {
  const data = list('projects');
  return { data };
}

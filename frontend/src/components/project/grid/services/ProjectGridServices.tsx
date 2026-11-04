import { list } from '@/services/crudService';

export function useProjectGridService() {
  const data = list('projects');
  return { data };
}

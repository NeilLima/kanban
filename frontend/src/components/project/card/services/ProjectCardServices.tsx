import { list } from '@/services/crudService';

export function useProjectCardService() {
  const data = list('projects');
  return { data };
}

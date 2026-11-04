import { list } from '@/services/crudService';

export function useProjectDetailService() {
  const data = list('projects');
  return { data };
}

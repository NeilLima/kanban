import { list } from '@/services/crudService';

export function useReportsService() {
  const data = list('reports');
  return { data };
}

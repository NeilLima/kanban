import { list } from '@/services/crudService';

export function useArchivedService() {
  const data = list('archived');
  return { data };
}

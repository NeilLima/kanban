import { list } from '@/services/crudService';

export function useTrashService() {
  const data = list('trash');
  return { data };
}

import { list } from '@/services/crudService';

export function useItemsService() {
  const data = list('items');
  return { data };
}

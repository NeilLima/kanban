import { list } from '@/services/crudService';

export function useFavoritesService() {
  const data = list('favorites');
  return { data };
}

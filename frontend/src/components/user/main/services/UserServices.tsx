import { list } from '@/services/crudService';

export function useUserService() {
  const data = list('users');
  return { data };
}

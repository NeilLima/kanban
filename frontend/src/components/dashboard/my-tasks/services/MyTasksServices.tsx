import { list } from '@/services/crudService';

export function useMyTasksService() {
  const data = list('my-tasks');
  return { data };
}

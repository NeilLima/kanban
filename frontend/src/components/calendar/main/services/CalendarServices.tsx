import { list } from '@/services/crudService';

export function useCalendarService() {
  const data = list('calendar');
  return { data };
}

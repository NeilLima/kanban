import type { ActivityItem } from '../types/ActivityFeedTypes';
import { useActivityFeedService } from '../services/ActivityFeedServices';

const TYPE_ICONS: Record<ActivityItem['type'], string> = {
  task_created: 'bi-plus-circle',
  task_completed: 'bi-check-circle',
  status_change: 'bi-arrow-left-right',
  update: 'bi-pencil',
};

export function getTypeIcon(type: ActivityItem['type']): string {
  return TYPE_ICONS[type];
}

export function getTimeAgo(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'agora mesmo';
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days}d`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function useActivityFeed(limit = 6) {
  const { activities, isLoading } = useActivityFeedService(limit);
  const state = { activities, loading: isLoading };
  const actions = { viewAll: () => {} };
  return { state, actions };
}

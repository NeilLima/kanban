import type { User } from '@/contexts/types/AuthTypes';

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function getDisplayName(user: User | null): string {
  return user?.name || 'Usuário';
}
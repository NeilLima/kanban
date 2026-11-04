import { useAuth } from '@/contexts/AuthContext';

export function useSettings(userId: string) {
  const { user } = useAuth();

  const settings = user
    ? {
        id: user.id || userId,
        name: user.name || 'Usuário',
        email: user.email,
      }
    : null;

  const state = {
    settings,
    loading: false,
    error: null as Error | null,
  };

  return { state };
}

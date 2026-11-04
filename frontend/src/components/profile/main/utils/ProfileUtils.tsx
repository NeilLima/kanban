import { useAuth } from '@/contexts/AuthContext';

export function useProfile(userId: string) {
  const { user } = useAuth();

  const profile = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'member',
        avatarUrl: user.avatar,
      }
    : null;

  const state = {
    profile,
    loading: false,
    error: null as Error | null,
  };

  return { state };
}

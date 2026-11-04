'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '@/api/api';
import type { User, AuthContextType } from './types/AuthTypes';

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

interface AuthResponse {
  user: {
    id: string;
    email: string;
    profile?: { firstName?: string; lastName?: string } | null;
    avatar?: string | null;
    createdAt?: string;
  };
  token: string;
}

function mapUser(data: AuthResponse['user'], fallbackName: string): User {
  const firstName = data.profile?.firstName ?? '';
  const lastName = data.profile?.lastName ?? '';
  const name = `${firstName} ${lastName}`.trim() || fallbackName || data.email;
  return {
    id: data.id,
    email: data.email,
    name,
    avatar: data.avatar ?? undefined,
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('kanban-user');
      const storedToken = localStorage.getItem('kanban-token');
      if (storedUser && storedToken) setUser(JSON.parse(storedUser) as User);
    } catch {
      localStorage.removeItem('kanban-user');
      localStorage.removeItem('kanban-token');
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    const mapped = mapUser(data.user, '');
    localStorage.setItem('kanban-token', data.token);
    localStorage.setItem('kanban-user', JSON.stringify(mapped));
    setUser(mapped);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const parts = name.trim().split(' ');
    const firstName = parts[0] || name;
    const lastName = parts.slice(1).join(' ') || parts[0] || name;
    const { data } = await api.post<AuthResponse>('/auth/register', {
      firstName,
      lastName,
      email,
      password,
    });
    const mapped = mapUser(data.user, name);
    localStorage.setItem('kanban-token', data.token);
    localStorage.setItem('kanban-user', JSON.stringify(mapped));
    setUser(mapped);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('kanban-user');
    localStorage.removeItem('kanban-token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
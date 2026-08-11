'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from './types/AuthTypes';

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('kanban-user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      email,
      name: 'Usuário',
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    localStorage.setItem('kanban-user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      email,
      name,
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    localStorage.setItem('kanban-user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kanban-user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
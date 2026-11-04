'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { LoginState, LoginActions } from '../types/LoginTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const DEFAULT_EMAIL = '';
const DEFAULT_PASSWORD = '';
const DASHBOARD_ROUTE = '/dashboard';
const REGISTER_ROUTE = '/register';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useLogin() {
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const { login } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  const state: LoginState = {
    email,
    password,
    loading,
    error,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setError(null);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setError(null);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push(DASHBOARD_ROUTE);
    } catch {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  }, [email, password, login, router]);

  const handleNavigateRegister = useCallback(() => {
    router.push(REGISTER_ROUTE);
  }, [router]);

  const actions: LoginActions = {
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleNavigateRegister,
  };

  return { state, actions, theme };
}
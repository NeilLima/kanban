'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { RegisterState, RegisterActions } from '../types/RegisterTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const DEFAULT_NAME = '';
const DEFAULT_EMAIL = '';
const DEFAULT_PASSWORD = '';
const DEFAULT_CONFIRM_PASSWORD = '';
const DASHBOARD_ROUTE = '/dashboard';
const LOGIN_ROUTE = '/login';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useRegister() {
  const [name, setName] = useState(DEFAULT_NAME);
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [confirmPassword, setConfirmPassword] = useState(DEFAULT_CONFIRM_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const { register } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  const state: RegisterState = {
    name,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    loading,
    error,
  };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleNameChange = useCallback((value: string) => {
    setName(value);
    setError(null);
  }, []);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setError(null);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setError(null);
  }, []);

  const handleConfirmPasswordChange = useCallback((value: string) => {
    setConfirmPassword(value);
    setError(null);
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((v) => !v);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((v) => !v);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await register(name, email, password);
      router.push(DASHBOARD_ROUTE);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string | string[] } } };
      const msg = axiosErr?.response?.data?.message;
      if (Array.isArray(msg)) {
        setError(msg[0] || 'Erro ao cadastrar. Tente novamente.');
      } else if (typeof msg === 'string' && msg) {
        setError(msg);
      } else {
        setError('Erro ao cadastrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }, [name, email, password, confirmPassword, register, router]);

  const handleNavigateLogin = useCallback(() => {
    router.push(LOGIN_ROUTE);
  }, [router]);

  const actions: RegisterActions = {
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
    handleNavigateLogin,
  };

  return { state, actions, theme };
}
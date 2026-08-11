'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AppTheme, ThemeMode, ThemeContextType } from './types/ThemeTypes';

// ============================================
// CONFIGURAÇÕES DE TEMA
// ============================================

const darkTheme: AppTheme = {
  mode: 'dark',

  // Fundos
  background: '#0B1120',
  surface: '#1E293B',
  cardBackground: '#1E293B',
  sidebarBackground: '#0F172A',
  navbarBackground: '#0F172A',
  inputBackground: '#0B1120',
  modalBackground: '#1E293B',
  hoverBackground: 'rgba(255, 255, 255, 0.05)',

  // Cores primárias
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  accentColor: '#06b6d4',

  // Gradiente
  gradientDirection: '135deg',
  gradientPrimary: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  gradientSecondary: 'linear-gradient(135deg, #06b6d4, #3b82f6)',

  // Texto
  textColor: '#F8FAFC',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textInverse: '#0B1120',

  // Bordas
  borderColor: 'rgba(255, 255, 255, 0.06)',
  borderHover: 'rgba(255, 255, 255, 0.12)',

  // Sombras
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  boxShadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
  boxShadowModal: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',

  // Border radius
  borderRadius: '12px',
  borderRadiusSm: '8px',
  borderRadiusLg: '20px',

  // Status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Prioridades
  priorityHigh: '#ef4444',
  priorityMedium: '#f59e0b',
  priorityLow: '#10b981',
  priorityUrgent: '#dc2626',

  // Tipografia
  fontFamily: "'Inter', sans-serif",
  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeBase: '1rem',
  fontSizeLg: '1.125rem',
  fontSizeXl: '1.25rem',
  fontSizeXxl: '1.5rem',
  fontWeightNormal: '400',
  fontWeightMedium: '500',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',
  lineHeight: '1.5',

  // Espaçamento
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',

  // Transições
  fast: '0.15s ease',
  normal: '0.3s ease',
  slow: '0.5s ease',
};

const lightTheme: AppTheme = {
  mode: 'light',

  // Fundos
  background: '#F8FAFC',
  surface: '#FFFFFF',
  cardBackground: '#FFFFFF',
  sidebarBackground: '#FFFFFF',
  navbarBackground: '#FFFFFF',
  inputBackground: '#F1F5F9',
  modalBackground: '#FFFFFF',
  hoverBackground: 'rgba(0, 0, 0, 0.04)',

  // Cores primárias
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  accentColor: '#06b6d4',

  // Gradiente
  gradientDirection: '135deg',
  gradientPrimary: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  gradientSecondary: 'linear-gradient(135deg, #06b6d4, #3b82f6)',

  // Texto
  textColor: '#0B1120',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  textInverse: '#F8FAFC',

  // Bordas
  borderColor: 'rgba(0, 0, 0, 0.08)',
  borderHover: 'rgba(0, 0, 0, 0.15)',

  // Sombras
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  boxShadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  boxShadowModal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Border radius
  borderRadius: '12px',
  borderRadiusSm: '8px',
  borderRadiusLg: '20px',

  // Status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Prioridades
  priorityHigh: '#ef4444',
  priorityMedium: '#f59e0b',
  priorityLow: '#10b981',
  priorityUrgent: '#dc2626',

  // Tipografia
  fontFamily: "'Inter', sans-serif",
  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeBase: '1rem',
  fontSizeLg: '1.125rem',
  fontSizeXl: '1.25rem',
  fontSizeXxl: '1.5rem',
  fontWeightNormal: '400',
  fontWeightMedium: '500',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',
  lineHeight: '1.5',

  // Espaçamento
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',

  // Transições
  fast: '0.15s ease',
  normal: '0.3s ease',
  slow: '0.5s ease',
};

function getTheme(mode: ThemeMode): AppTheme {
  return mode === 'dark' ? darkTheme : lightTheme;
}

// ============================================
// CONTEXTO
// ============================================

const ThemeContext = createContext<ThemeContextType>({
  theme: darkTheme,
  mode: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

// ============================================
// PROVIDER
// ============================================

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('kanban-theme') as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-theme', mode);
    document.documentElement.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const theme = getTheme(mode);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
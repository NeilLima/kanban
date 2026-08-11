// ============================================
// ESTILOS GLOBAIS
// ============================================
// Estilos globais reutilizáveis e utilitários de CSS

import { css } from 'styled-components';
import type { AppTheme } from '@/contexts/types/ThemeTypes';

// Reset global
export const globalReset = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Mixins reutilizáveis
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const glassmorphism = (theme: AppTheme) => css`
  background: ${theme.cardBackground};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.borderColor};
  border-radius: ${theme.borderRadiusLg};
`;

export const cardHover = (theme: AppTheme) => css`
  transition: all ${theme.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.boxShadowHover};
  }
`;

// Breakpoints mobile-first
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};
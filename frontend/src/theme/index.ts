// ============================================
// CONFIGURAÇÕES DE TEMA
// ============================================
// Re-exporta o ThemeContext e tipos para uso centralizado

export { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
export type { AppTheme, ThemeMode, ThemeContextType } from '@/contexts/types/ThemeTypes';
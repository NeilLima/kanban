// ============================================
// TIPOS DO SISTEMA DE TEMA
// ============================================

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Fundos
  background: string;
  surface: string;
  cardBackground: string;
  sidebarBackground: string;
  navbarBackground: string;
  inputBackground: string;
  modalBackground: string;
  hoverBackground: string;

  // Cores primárias
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;

  // Gradiente
  gradientDirection: string;
  gradientPrimary: string;
  gradientSecondary: string;

  // Texto
  textColor: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  // Bordas
  borderColor: string;
  borderHover: string;

  // Sombras
  boxShadow: string;
  boxShadowHover: string;
  boxShadowModal: string;

  // Border radius
  borderRadius: string;
  borderRadiusSm: string;
  borderRadiusLg: string;

  // Status
  success: string;
  warning: string;
  error: string;
  info: string;

  // Prioridades
  priorityHigh: string;
  priorityMedium: string;
  priorityLow: string;
  priorityUrgent: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontSizeXs: string;
  fontSizeSm: string;
  fontSizeBase: string;
  fontSizeLg: string;
  fontSizeXl: string;
  fontSizeXxl: string;
  fontWeightNormal: string;
  fontWeightMedium: string;
  fontWeightSemiBold: string;
  fontWeightBold: string;
  lineHeight: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ThemeTransitions {
  fast: string;
  normal: string;
  slow: string;
}

export interface AppTheme extends ThemeColors, ThemeTypography, ThemeSpacing, ThemeTransitions {
  mode: ThemeMode;
}

export interface ThemeContextType {
  theme: AppTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}
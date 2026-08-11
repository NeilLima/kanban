import styled from 'styled-components';
import type { AppTheme } from '@/contexts/types/ThemeTypes';
import type { ButtonVariant, ButtonSize } from '../types/ButtonTypes';

// ============================================
// STYLED COMPONENTS DO BOTÃO
// ============================================

const getVariantStyles = (variant: ButtonVariant, theme: AppTheme) => {
  const variants: Record<ButtonVariant, string> = {
    primary: `
      background: ${theme.primaryColor};
      color: #fff;
      border: 1px solid ${theme.primaryColor};
      &:hover { background: ${theme.primaryColor}dd; }
    `,
    secondary: `
      background: ${theme.secondaryColor};
      color: #fff;
      border: 1px solid ${theme.secondaryColor};
      &:hover { background: ${theme.secondaryColor}dd; }
    `,
    success: `
      background: ${theme.success};
      color: #fff;
      border: 1px solid ${theme.success};
      &:hover { background: ${theme.success}dd; }
    `,
    danger: `
      background: ${theme.error};
      color: #fff;
      border: 1px solid ${theme.error};
      &:hover { background: ${theme.error}dd; }
    `,
    warning: `
      background: ${theme.warning};
      color: #fff;
      border: 1px solid ${theme.warning};
      &:hover { background: ${theme.warning}dd; }
    `,
    info: `
      background: ${theme.info};
      color: #fff;
      border: 1px solid ${theme.info};
      &:hover { background: ${theme.info}dd; }
    `,
    outline: `
      background: transparent;
      color: ${theme.primaryColor};
      border: 1px solid ${theme.borderColor};
      &:hover { background: ${theme.hoverBackground}; border-color: ${theme.borderHover}; }
    `,
    ghost: `
      background: transparent;
      color: ${theme.textColor};
      border: 1px solid transparent;
      &:hover { background: ${theme.hoverBackground}; }
    `,
    gradient: `
      background: ${theme.gradientPrimary};
      color: #fff;
      border: 1px solid transparent;
      &:hover { opacity: 0.9; }
    `,
  };
  return variants[variant];
};

const getSizeStyles = (size: ButtonSize) => {
  const sizes: Record<ButtonSize, string> = {
    sm: 'padding: 6px 12px; font-size: 0.875rem;',
    md: 'padding: 8px 16px; font-size: 1rem;',
    lg: 'padding: 12px 24px; font-size: 1.125rem;',
  };
  return sizes[size];
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $loading: boolean;
  theme: AppTheme;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${props => props.theme.borderRadiusSm};
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeightMedium};
  cursor: ${props => (props.$loading || props.disabled ? 'not-allowed' : 'pointer')};
  transition: all ${props => props.theme.fast};
  opacity: ${props => (props.$loading || props.disabled ? 0.6 : 1)};
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};
  ${props => getVariantStyles(props.$variant, props.theme)}
  ${props => getSizeStyles(props.$size)}
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const StyledSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
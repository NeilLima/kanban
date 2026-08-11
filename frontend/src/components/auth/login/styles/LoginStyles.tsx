import styled from 'styled-components';
import type { AppTheme } from '@/contexts/types/ThemeTypes';

// ============================================
// STYLED COMPONENTS DO LOGIN
// ============================================

export const StyledLoginContainer = styled.div<{ theme: AppTheme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${props => props.theme.md};
  background: ${props => props.theme.background};
`;

export const StyledLoginCard = styled.div<{ theme: AppTheme }>`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadiusLg};
  box-shadow: ${props => props.theme.boxShadowModal};
  padding: ${props => props.theme.xxl};
  width: 100%;
  max-width: 440px;
`;

export const StyledLoginHeader = styled.div<{ theme: AppTheme }>`
  text-align: center;
  margin-bottom: ${props => props.theme.xl};
`;

export const StyledLoginTitle = styled.h1<{ theme: AppTheme }>`
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSizeXxl};
  font-weight: ${props => props.theme.fontWeightBold};
  color: ${props => props.theme.textColor};
  margin: 0;
`;

export const StyledLoginSubtitle = styled.p<{ theme: AppTheme }>`
  font-size: ${props => props.theme.fontSizeSm};
  color: ${props => props.theme.textSecondary};
  margin-top: ${props => props.theme.sm};
`;

export const StyledLoginForm = styled.form<{ theme: AppTheme }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.md};
`;

export const StyledFormGroup = styled.div<{ theme: AppTheme }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.xs};
`;

export const StyledLabel = styled.label<{ theme: AppTheme }>`
  font-size: ${props => props.theme.fontSizeSm};
  font-weight: ${props => props.theme.fontWeightMedium};
  color: ${props => props.theme.textSecondary};
`;

export const StyledInput = styled.input<{ theme: AppTheme }>`
  background: ${props => props.theme.inputBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadiusSm};
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSizeBase};
  padding: 12px 16px;
  width: 100%;
  transition: all ${props => props.theme.fast};

  &::placeholder {
    color: ${props => props.theme.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primaryColor};
    box-shadow: 0 0 0 3px ${props => props.theme.primaryColor}33;
  }
`;

export const StyledSubmitButton = styled.button<{ theme: AppTheme }>`
  background: ${props => props.theme.gradientPrimary};
  color: #fff;
  border: none;
  border-radius: ${props => props.theme.borderRadiusSm};
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSizeBase};
  font-weight: ${props => props.theme.fontWeightSemiBold};
  padding: 12px 24px;
  cursor: pointer;
  transition: all ${props => props.theme.fast};
  margin-top: ${props => props.theme.sm};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledLoginFooter = styled.div<{ theme: AppTheme }>`
  text-align: center;
  margin-top: ${props => props.theme.xl};
`;

export const StyledFooterText = styled.p<{ theme: AppTheme }>`
  font-size: ${props => props.theme.fontSizeSm};
  color: ${props => props.theme.textSecondary};
`;

export const StyledFooterLink = styled.button<{ theme: AppTheme }>`
  background: none;
  border: none;
  color: ${props => props.theme.primaryColor};
  font-size: ${props => props.theme.fontSizeSm};
  font-weight: ${props => props.theme.fontWeightMedium};
  cursor: pointer;
  transition: color ${props => props.theme.fast};

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledErrorMessage = styled.p<{ theme: AppTheme }>`
  color: ${props => props.theme.error};
  font-size: ${props => props.theme.fontSizeSm};
  text-align: center;
  margin: 0;
`;
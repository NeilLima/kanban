'use client';
import React from 'react';
import { useLogin } from '../utils/LoginUtils';
import {
  StyledLoginContainer,
  StyledLoginCard,
  StyledLoginHeader,
  StyledLoginTitle,
  StyledLoginSubtitle,
  StyledLoginForm,
  StyledFormGroup,
  StyledLabel,
  StyledInput,
  StyledSubmitButton,
  StyledLoginFooter,
  StyledFooterText,
  StyledFooterLink,
  StyledErrorMessage,
} from '../styles/LoginStyles';

export default function LoginComp() {
  const { state, actions, theme } = useLogin();

  return (
    <StyledLoginContainer theme={theme}>
      <StyledLoginCard theme={theme}>
        <StyledLoginHeader theme={theme}>
          <StyledLoginTitle theme={theme}>Nexus Kanban</StyledLoginTitle>
          <StyledLoginSubtitle theme={theme}>Faça login para continuar</StyledLoginSubtitle>
        </StyledLoginHeader>

        <StyledLoginForm
          theme={theme}
          onSubmit={actions.handleSubmit}
          data-testid="login-form"
        >
          <StyledFormGroup theme={theme}>
            <StyledLabel theme={theme}>Email</StyledLabel>
            <StyledInput
              theme={theme}
              type="email"
              placeholder="seu@email.com"
              value={state.email}
              onChange={e => actions.handleEmailChange(e.target.value)}
              required
              data-testid="login-email"
            />
          </StyledFormGroup>

          <StyledFormGroup theme={theme}>
            <StyledLabel theme={theme}>Senha</StyledLabel>
            <div style={{ position: 'relative' }}>
              <StyledInput
                theme={theme}
                type={state.showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={state.password}
                onChange={e => actions.handlePasswordChange(e.target.value)}
                required
                style={{ paddingRight: 42 }}
                data-testid="login-password"
              />
              <button
                type="button"
                onClick={actions.toggleShowPassword}
                aria-label={state.showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'transparent', border: 'none', color: '#94a3b8',
                  cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center',
                }}
                data-testid="login-toggle-password"
              >
                <i className={`bi ${state.showPassword ? 'bi-eye-slash' : 'bi-eye'}`} style={{ fontSize: 16 }}></i>
              </button>
            </div>
          </StyledFormGroup>

          {state.error && (
            <StyledErrorMessage theme={theme} data-testid="login-error">
              {state.error}
            </StyledErrorMessage>
          )}

          <StyledSubmitButton
            theme={theme}
            type="submit"
            disabled={state.loading}
            data-testid="login-submit"
          >
            {state.loading ? 'Entrando...' : 'Entrar'}
          </StyledSubmitButton>
        </StyledLoginForm>

        <StyledLoginFooter theme={theme}>
          <StyledFooterText theme={theme}>
            Não tem conta?{' '}
            <StyledFooterLink
              theme={theme}
              onClick={actions.handleNavigateRegister}
              data-testid="login-register-link"
            >
              Cadastre-se
            </StyledFooterLink>
          </StyledFooterText>
        </StyledLoginFooter>
      </StyledLoginCard>
    </StyledLoginContainer>
  );
}
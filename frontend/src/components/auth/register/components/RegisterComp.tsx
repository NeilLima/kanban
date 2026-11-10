'use client';
import React from 'react';
import { useRegister } from '../utils/RegisterUtils';
import {
  StyledRegisterContainer,
  StyledRegisterCard,
  StyledRegisterHeader,
  StyledRegisterTitle,
  StyledRegisterSubtitle,
  StyledRegisterForm,
  StyledFormGroup,
  StyledLabel,
  StyledInput,
  StyledSubmitButton,
  StyledRegisterFooter,
  StyledFooterText,
  StyledFooterLink,
  StyledErrorMessage,
} from '../styles/RegisterStyles';

export default function RegisterComp() {
  const { state, actions, theme } = useRegister();

  return (
    <StyledRegisterContainer theme={theme}>
      <StyledRegisterCard theme={theme}>
        <StyledRegisterHeader theme={theme}>
          <StyledRegisterTitle theme={theme}>Criar Conta</StyledRegisterTitle>
          <StyledRegisterSubtitle theme={theme}>Cadastre-se para começar</StyledRegisterSubtitle>
        </StyledRegisterHeader>

        <StyledRegisterForm
          theme={theme}
          onSubmit={actions.handleSubmit}
          data-testid="register-form"
        >
          <StyledFormGroup theme={theme}>
            <StyledLabel theme={theme}>Nome</StyledLabel>
            <StyledInput
              theme={theme}
              type="text"
              placeholder="Seu nome"
              value={state.name}
              onChange={e => actions.handleNameChange(e.target.value)}
              required
              data-testid="register-name"
            />
          </StyledFormGroup>

          <StyledFormGroup theme={theme}>
            <StyledLabel theme={theme}>Email</StyledLabel>
            <StyledInput
              theme={theme}
              type="email"
              placeholder="seu@email.com"
              value={state.email}
              onChange={e => actions.handleEmailChange(e.target.value)}
              required
              data-testid="register-email"
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
                data-testid="register-password"
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
                data-testid="register-toggle-password"
              >
                <i className={`bi ${state.showPassword ? 'bi-eye-slash' : 'bi-eye'}`} style={{ fontSize: 16 }}></i>
              </button>
            </div>
          </StyledFormGroup>

          <StyledFormGroup theme={theme}>
            <StyledLabel theme={theme}>Confirmar Senha</StyledLabel>
            <div style={{ position: 'relative' }}>
              <StyledInput
                theme={theme}
                type={state.showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={state.confirmPassword}
                onChange={e => actions.handleConfirmPasswordChange(e.target.value)}
                required
                style={{ paddingRight: 42 }}
                data-testid="register-confirm-password"
              />
              <button
                type="button"
                onClick={actions.toggleShowConfirmPassword}
                aria-label={state.showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'transparent', border: 'none', color: '#94a3b8',
                  cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center',
                }}
                data-testid="register-toggle-confirm-password"
              >
                <i className={`bi ${state.showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`} style={{ fontSize: 16 }}></i>
              </button>
            </div>
          </StyledFormGroup>

          {state.error && (
            <StyledErrorMessage theme={theme} data-testid="register-error">
              {state.error}
            </StyledErrorMessage>
          )}

          <StyledSubmitButton
            theme={theme}
            type="submit"
            disabled={state.loading}
            data-testid="register-submit"
          >
            {state.loading ? 'Cadastrando...' : 'Cadastrar'}
          </StyledSubmitButton>
        </StyledRegisterForm>

        <StyledRegisterFooter theme={theme}>
          <StyledFooterText theme={theme}>
            Já tem conta?{' '}
            <StyledFooterLink
              theme={theme}
              onClick={actions.handleNavigateLogin}
              data-testid="register-login-link"
            >
              Faça login
            </StyledFooterLink>
          </StyledFooterText>
        </StyledRegisterFooter>
      </StyledRegisterCard>
    </StyledRegisterContainer>
  );
}
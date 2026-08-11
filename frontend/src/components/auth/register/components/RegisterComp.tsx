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
            <StyledInput
              theme={theme}
              type="password"
              placeholder="••••••••"
              value={state.password}
              onChange={e => actions.handlePasswordChange(e.target.value)}
              required
              data-testid="register-password"
            />
          </StyledFormGroup>

          <StyledFormGroup theme={theme}>
            <StyledLabel theme={theme}>Confirmar Senha</StyledLabel>
            <StyledInput
              theme={theme}
              type="password"
              placeholder="••••••••"
              value={state.confirmPassword}
              onChange={e => actions.handleConfirmPasswordChange(e.target.value)}
              required
              data-testid="register-confirm-password"
            />
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
'use client';
import React from 'react';
import { useButton } from '../utils/ButtonUtils';
import { StyledButton, StyledButtonContent, StyledSpinner } from '../styles/ButtonStyles';
import type { ButtonTypes } from '../types/ButtonTypes';

export default function ButtonComp({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  className,
  ...rest
}: ButtonTypes) {
  const { state, actions, theme } = useButton();
  const isLoading = loading || state.loading;
  const isDisabled = disabled || state.disabled;

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={isLoading}
      theme={theme}
      type={type}
      disabled={isDisabled}
      className={className}
      onClick={() => {
        actions.handleClick();
        onClick?.();
      }}
      {...rest}
    >
      <StyledButtonContent>
        {isLoading && <StyledSpinner />}
        {!isLoading && icon && iconPosition === 'left' && icon}
        {children}
        {!isLoading && icon && iconPosition === 'right' && icon}
      </StyledButtonContent>
    </StyledButton>
  );
}
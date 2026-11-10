// ============================================
// TIPOS DO REGISTER
// ============================================

export interface RegisterTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onNavigateLogin: () => void;
  loading?: boolean;
  error?: string | null;
}

export interface RegisterState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  loading: boolean;
  error: string | null;
}

export interface RegisterActions {
  handleNameChange: (value: string) => void;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleConfirmPasswordChange: (value: string) => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleNavigateLogin: () => void;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}
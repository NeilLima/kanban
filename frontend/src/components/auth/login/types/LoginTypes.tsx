// ============================================
// TIPOS DO LOGIN
// ============================================

export interface LoginTypes {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onNavigateRegister: () => void;
  loading?: boolean;
  error?: string | null;
}

export interface LoginState {
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginActions {
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  toggleShowPassword: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleNavigateRegister: () => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}
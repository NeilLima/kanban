export interface SettingsTypes {
  userId: string;
}

export interface SettingsView {
  id: string;
  name: string;
  email: string;
}

export interface SettingsState {
  settings: SettingsView | null;
  loading: boolean;
  error: Error | null;
}

export interface ProfileTypes {
  userId: string;
}

export interface ProfileView {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface ProfileState {
  profile: ProfileView | null;
  loading: boolean;
  error: Error | null;
}

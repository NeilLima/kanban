export interface UserTypes {
  userId: string;
}

export interface UserView {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  isMe: boolean;
  tasksTotal: number;
  tasksDone: number;
  tasksPending: number;
  percent: number;
  color: string;
}

export interface UserState {
  user: UserView | null;
  loading: boolean;
  error: Error | null;
}

export interface UserActions {
  refetch: () => void;
}

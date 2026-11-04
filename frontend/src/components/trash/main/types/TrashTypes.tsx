export interface TrashTypes {
  trashedItems: any[];
}

export interface TrashView {
  id: string;
  title: string;
  type: string;
  trashedAt: string;
}

export interface TrashState {
  items: TrashView[];
  loading: boolean;
  error: Error | null;
}

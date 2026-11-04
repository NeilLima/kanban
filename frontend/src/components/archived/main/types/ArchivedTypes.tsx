export interface ArchivedTypes {
  archivedItems: any[];
}

export interface ArchivedView {
  id: string;
  title: string;
  type: string;
  archivedAt: string;
}

export interface ArchivedState {
  items: ArchivedView[];
  loading: boolean;
  error: Error | null;
}

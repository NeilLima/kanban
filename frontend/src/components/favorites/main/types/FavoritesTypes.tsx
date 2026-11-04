export interface FavoriteItem {
  id: string;
  name: string;
  description: string;
  date: string;
  icon: string;
  color: string;
}

export interface FavoritesState {
  items: FavoriteItem[];
  loading: boolean;
  error: Error | null;
}

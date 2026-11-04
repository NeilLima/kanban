export function useTrash() {
  const items: { id: string; title: string; type: string; trashedAt: string }[] = [];

  const state = {
    items,
    loading: false,
    error: null as Error | null,
  };

  return { state };
}

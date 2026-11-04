export function useArchived() {
  const items = [
    { id: '1', title: 'Projeto Concluído', type: 'projeto', archivedAt: '2026-09-01' },
  ];

  const state = {
    items,
    loading: false,
    error: null as Error | null,
  };

  return { state };
}

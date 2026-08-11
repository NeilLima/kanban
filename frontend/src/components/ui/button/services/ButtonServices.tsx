// ============================================
// SERVICES DO BOTÃO (MOCK)
// ============================================
// Nota: Botão é um componente puramente apresentacional.
// O service existe apenas para seguir o padrão da arquitetura.

export function useButtonService() {
  return {
    isLoading: false,
    error: null,
    trackClick: (_buttonId: string) => {
      void _buttonId;
    },
  };
}
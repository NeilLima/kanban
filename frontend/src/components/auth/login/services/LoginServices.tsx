// ============================================
// SERVICES DO LOGIN (MOCK)
// ============================================

const MOCK_USER = {
  id: 'user-1',
  name: 'Victor Lima',
  email: 'victor@nexus.com',
  role: 'Administrador',
  avatar: '',
};

export function useLoginService() {
  const login = (_email: string, _password: string): Promise<typeof MOCK_USER> => {
    void _email;
    void _password;
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_USER), 500);
    });
  };

  return {
    login,
    isLoading: false,
    error: null,
  };
}
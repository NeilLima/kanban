// ============================================
// SERVICES DO REGISTER (MOCK)
// ============================================

const MOCK_USER = {
  id: 'user-new',
  name: '',
  email: '',
  role: 'Membro',
  avatar: '',
};

export function useRegisterService() {
  const register = (_name: string, _email: string, _password: string): Promise<typeof MOCK_USER> => {
    void _password;
    return new Promise(resolve => {
      setTimeout(() => {
        MOCK_USER.name = _name;
        MOCK_USER.email = _email;
        resolve(MOCK_USER);
      }, 500);
    });
  };

  return {
    register,
    isLoading: false,
    error: null,
  };
}
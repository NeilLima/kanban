// ============================================
// SCRIPTS DE AUTOMAÇÃO
// ============================================
// Scripts utilitários para automação de tarefas

// Exemplo: Script para limpar cache
export function clearCache(): void {
  if (typeof window !== 'undefined') {
    localStorage.clear();
    sessionStorage.clear();
    console.log('🧹 Cache limpo com sucesso');
  }
}

// Exemplo: Script para verificar ambiente
export function checkEnvironment(): void {
  const env = process.env.NODE_ENV;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log(`🌍 Ambiente: ${env}`);
  console.log(`🔌 API URL: ${apiUrl}`);
}
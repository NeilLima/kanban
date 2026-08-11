// Dados mock constantes
const MOCK_STATS = [
  {
    id: '1',
    title: 'Projetos',
    value: 12,
    percentage: '20%',
    trend: 'up' as const,
    icon: 'bi bi-folder',
    color: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    chartData: [10, 12, 8, 15, 11, 14, 12],
    chartColor: '#3b82f6',
  },
  {
    id: '2',
    title: 'Tarefas',
    value: 156,
    percentage: '15%',
    trend: 'up' as const,
    icon: 'bi bi-columns',
    color: '#8b5cf6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    chartData: [120, 135, 140, 128, 150, 145, 156],
    chartColor: '#8b5cf6',
  },
  {
    id: '3',
    title: 'Pendentes',
    value: 38,
    percentage: '8%',
    trend: 'up' as const,
    icon: 'bi bi-clock',
    color: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    chartData: [45, 42, 40, 38, 41, 39, 38],
    chartColor: '#f59e0b',
  },
  {
    id: '4',
    title: 'Concluídas',
    value: 118,
    percentage: '25%',
    trend: 'up' as const,
    icon: 'bi bi-check-circle',
    color: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    chartData: [80, 85, 95, 100, 105, 110, 118],
    chartColor: '#10b981',
  },
];

export function useStatCardService() {
  return {
    stats: MOCK_STATS,
    isLoading: false,
    error: null,
    refetch: () => {},
  };
}
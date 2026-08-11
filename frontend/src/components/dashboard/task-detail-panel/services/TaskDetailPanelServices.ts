import type { TaskDetailData } from '../types/TaskDetailPanelTypes';

export const MOCK_TASK_DETAIL: TaskDetailData = {
  id: 'task-1',
  title: 'Desenvolver dashboard principal',
  status: 'Em Desenvolvimento',
  priority: 'Alta',
  project: 'Plataforma Nexus',
  dueDate: '20 de Maio de 2024',
  estimatedTime: '16h',
  spentTime: '9h 30m',
  description: 'Criar o dashboard principal com gráficos de desempenho, atividades recentes e resumo dos projetos.',
  tags: [
    { name: 'Frontend', color: '#3b82f6' },
    { name: 'Dashboard', color: '#8b5cf6' },
    { name: 'UI/UX', color: '#f59e0b' },
  ],
  assignees: [
    { name: 'Lucas Ferreira', email: 'lucas@empresa.com', color: '#3b82f6' },
  ],
  comments: [
    { id: 1, content: 'Ótimo progresso!', author: 'Maria', time: '2h' },
    { id: 2, content: 'Precisamos revisar o layout', author: 'João', time: '5h' },
  ],
  attachments: [
    { id: 1, name: 'mockup-dashboard.fig', size: '2.4 MB' },
    { id: 2, name: 'especificacao.pdf', size: '1.1 MB' },
  ],
  checklist: [
    { id: 1, title: 'Criar estrutura base', completed: true },
    { id: 2, title: 'Implementar gráficos', completed: true },
    { id: 3, title: 'Adicionar filtros', completed: false },
    { id: 4, title: 'Testes de usabilidade', completed: false },
  ],
};

export function useTaskDetailPanelService(_taskId: string) {
  void _taskId;
  return {
    task: MOCK_TASK_DETAIL,
    loading: false,
  };
}
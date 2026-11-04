export const settingsSections = [
  {
    title: 'Preferências',
    options: [
      { label: 'Notificações por email', description: 'Receba atualizações de tarefas por email.', defaultOn: true },
      { label: 'Tema escuro', description: 'Use a interface no modo escuro.', defaultOn: true },
      { label: 'Notificações push', description: 'Alertas em tempo real no navegador.', defaultOn: false },
    ],
  },
  {
    title: 'Quadro Kanban',
    options: [
      { label: 'Exibir progresso das tarefas', description: 'Mostra barra de progresso nos cards.', defaultOn: true },
      { label: 'Concluir ao arrastar', description: 'Move tarefas para Concluído automaticamente.', defaultOn: false },
    ],
  },
];

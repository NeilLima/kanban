// ============================================
// INTERNACIONALIZAÇÃO (i18n)
// ============================================
// Configuração de internacionalização para suporte a múltiplos idiomas

export type Language = 'pt-BR' | 'en-US' | 'es-ES';

export interface Translation {
  [key: string]: string;
}

// ============================================
// TRADUÇÕES
// ============================================

const translations: Record<Language, Translation> = {
  'pt-BR': {
    // Geral
    'app.name': 'Nexus Kanban',
    'app.version': 'v2.0.0',
    'app.copyright': '© 2024 Todos os direitos reservados.',

    // Login
    'login.title': 'Login',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.submit': 'Entrar',
    'login.register': 'Cadastre-se',
    'login.error': 'Email ou senha inválidos',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.projects': 'Projetos',
    'dashboard.tasks': 'Tarefas',
    'dashboard.pending': 'Pendentes',
    'dashboard.completed': 'Concluídas',

    // Kanban
    'kanban.todo': 'A Fazer',
    'kanban.inProgress': 'Em Desenvolvimento',
    'kanban.review': 'Em Revisão',
    'kanban.done': 'Concluído',

    // Ações
    'action.newTask': 'Nova Tarefa',
    'action.newProject': 'Novo Projeto',
    'action.edit': 'Editar',
    'action.delete': 'Excluir',
    'action.save': 'Salvar',
    'action.cancel': 'Cancelar',
    'action.search': 'Buscar',
    'action.filter': 'Filtros',
    'action.sort': 'Ordenar',

    // Sidebar
    'sidebar.dashboard': 'Dashboard',
    'sidebar.projects': 'Projetos',
    'sidebar.kanban': 'Kanban',
    'sidebar.calendar': 'Calendário',
    'sidebar.team': 'Equipe',
    'sidebar.reports': 'Relatórios',
    'sidebar.archived': 'Arquivados',
    'sidebar.trash': 'Lixeira',
  },
  'en-US': {
    'app.name': 'Nexus Kanban',
    'app.version': 'v2.0.0',
    'app.copyright': '© 2024 All rights reserved.',

    'login.title': 'Login',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Sign In',
    'login.register': 'Sign Up',
    'login.error': 'Invalid email or password',

    'dashboard.title': 'Dashboard',
    'dashboard.projects': 'Projects',
    'dashboard.tasks': 'Tasks',
    'dashboard.pending': 'Pending',
    'dashboard.completed': 'Completed',

    'kanban.todo': 'To Do',
    'kanban.inProgress': 'In Progress',
    'kanban.review': 'Review',
    'kanban.done': 'Done',

    'action.newTask': 'New Task',
    'action.newProject': 'New Project',
    'action.edit': 'Edit',
    'action.delete': 'Delete',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.search': 'Search',
    'action.filter': 'Filters',
    'action.sort': 'Sort',

    'sidebar.dashboard': 'Dashboard',
    'sidebar.projects': 'Projects',
    'sidebar.kanban': 'Kanban',
    'sidebar.calendar': 'Calendar',
    'sidebar.team': 'Team',
    'sidebar.reports': 'Reports',
    'sidebar.archived': 'Archived',
    'sidebar.trash': 'Trash',
  },
  'es-ES': {
    'app.name': 'Nexus Kanban',
    'app.version': 'v2.0.0',
    'app.copyright': '© 2024 Todos los derechos reservados.',

    'login.title': 'Iniciar Sesión',
    'login.email': 'Correo',
    'login.password': 'Contraseña',
    'login.submit': 'Entrar',
    'login.register': 'Registrarse',
    'login.error': 'Correo o contraseña inválidos',

    'dashboard.title': 'Panel',
    'dashboard.projects': 'Proyectos',
    'dashboard.tasks': 'Tareas',
    'dashboard.pending': 'Pendientes',
    'dashboard.completed': 'Completadas',

    'kanban.todo': 'Por Hacer',
    'kanban.inProgress': 'En Desarrollo',
    'kanban.review': 'En Revisión',
    'kanban.done': 'Completado',

    'action.newTask': 'Nueva Tarea',
    'action.newProject': 'Nuevo Proyecto',
    'action.edit': 'Editar',
    'action.delete': 'Eliminar',
    'action.save': 'Guardar',
    'action.cancel': 'Cancelar',
    'action.search': 'Buscar',
    'action.filter': 'Filtros',
    'action.sort': 'Ordenar',

    'sidebar.dashboard': 'Panel',
    'sidebar.projects': 'Proyectos',
    'sidebar.kanban': 'Kanban',
    'sidebar.calendar': 'Calendario',
    'sidebar.team': 'Equipo',
    'sidebar.reports': 'Informes',
    'sidebar.archived': 'Archivados',
    'sidebar.trash': 'Papelera',
  },
};

// ============================================
// FUNÇÕES DE TRADUÇÃO
// ============================================

let currentLanguage: Language = 'pt-BR';

export function setLanguage(lang: Language): void {
  currentLanguage = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('kanban-language', lang);
  }
}

export function getLanguage(): Language {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('kanban-language') as Language | null;
    if (saved) {
      currentLanguage = saved;
    }
  }
  return currentLanguage;
}

export function t(key: string): string {
  return translations[currentLanguage]?.[key] ?? translations['pt-BR']?.[key] ?? key;
}
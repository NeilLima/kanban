// Contrato cru do endpoint GET /reports/overview (backend Nest/Prisma)

export interface ReportsKpiGroup {
  value: number;
  percentage: string;
  trend: 'up' | 'down';
}

export interface ReportsWeekPoint {
  label: string;
  concluidas: number;
  pendentes: number;
  horas: number;
  atrasadas: number;
}

export interface ReportsDistributionItem {
  name: string;
  value: number;
  color: string;
}

export interface ReportsTimeSpentItem {
  project: string;
  tarefas: number;
  horas: number;
  color: string;
}

export interface ReportsTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  tarefas: number;
  done: number;
  produtividade: number;
  color: string;
}

export interface ReportsUpcoming {
  id: string;
  title: string;
  dueDate: string | null;
  priority: string;
  category?: string;
  color: string;
  status: string;
}

export interface ReportsCalendarEvent {
  title: string;
  dueDate: string;
  status: string;
  color: string;
}

export interface ReportsActivity {
  id: string;
  action: string;
  taskTitle: string;
  userName: string;
  createdAt: string;
}

export interface ReportsOverviewData {
  kpis: {
    done: ReportsKpiGroup;
    hours: ReportsKpiGroup;
    productivity: ReportsKpiGroup;
    overdue: ReportsKpiGroup;
  };
  productivity: ReportsWeekPoint[];
  distribution: ReportsDistributionItem[];
  timeSpent: ReportsTimeSpentItem[];
  team: ReportsTeamMember[];
  upcoming: ReportsUpcoming[];
  calendar: ReportsCalendarEvent[];
  activity: ReportsActivity[];
}

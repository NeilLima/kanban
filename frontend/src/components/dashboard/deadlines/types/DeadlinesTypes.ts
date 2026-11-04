export interface DeadlineItem {
  id: string;
  title: string;
  dueDate: string;
  priority: string;
  category?: string;
  color: string;
}

export interface DeadlineDisplay {
  id: string;
  title: string;
  meta: string;
  color: string;
  day: number;
  monthLabel: string;
  overdue: boolean;
  daysLabel: string;
}

export interface DeadlinesState {
  deadlines: DeadlineDisplay[];
  loading: boolean;
}

export interface DeadlinesActions {
  openKanban: () => void;
}

// ============================================
// Contrato cru do backend — GET /reports/overview
// ============================================

export interface RawUpcomingTask {
  id: string;
  title: string;
  dueDate: string;
  priority: string;
  category?: string;
  color: string;
  status: string;
}

export interface RawOverviewUpcoming {
  upcoming: RawUpcomingTask[];
}

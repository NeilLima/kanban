export interface ActivityItem {
  id: string;
  userName: string;
  userColor: string;
  action: string;
  target: string;
  type: 'task_created' | 'task_completed' | 'status_change' | 'update';
  timestamp: Date;
}

export interface ActivityFeedState {
  activities: ActivityItem[];
  loading: boolean;
}

export interface ActivityFeedActions {
  viewAll: () => void;
}

// ============================================
// Contrato cru do backend — GET /reports/overview
// ============================================

export interface RawActivityEntry {
  id: string;
  action: string;
  taskTitle: string;
  userName: string;
  createdAt: string;
}

export interface RawOverviewActivity {
  activity: RawActivityEntry[];
}

export interface TaskAssignee {
  name: string;
  email?: string;
  color?: string;
}

export interface DetailTypes {
  taskId: string;
  onClose: () => void;
}

export interface TaskDetailData {
  id: string;
  title: string;
  status: string;
  priority: string;
  project?: string;
  dueDate?: string;
  estimatedTime?: string;
  spentTime?: string;
  description?: string;
  tags: { name: string; color: string }[];
  assignees: TaskAssignee[];
  comments: TaskCommentData[];
  attachments: TaskAttachmentData[];
  checklist: TaskChecklistData[];
}

export interface TaskCommentData {
  id: string;
  content: string;
  author: string;
  time: string;
}

export interface TaskAttachmentData {
  id: string;
  name: string;
  size: string;
}

export interface TaskChecklistData {
  id: string;
  title: string;
  completed: boolean;
}

export interface DetailState {
  activeTab: number;
  task: TaskDetailData | null;
  tabs: string[];
  loading: boolean;
}

export interface DetailActions {
  handleTabChange: (tabIndex: number) => void;
  handleClose: () => void;
}
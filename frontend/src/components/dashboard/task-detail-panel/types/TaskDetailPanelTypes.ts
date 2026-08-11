export interface TaskAssignee {
  name: string;
  email?: string;
  color?: string;
}

export interface TaskDetailPanelTypes {
  taskId: string;
  onClose: () => void;
}

export interface TaskDetailData {
  id: string;
  title: string;
  status: string;
  priority: string;
  project: string;
  dueDate: string;
  estimatedTime: string;
  spentTime: string;
  description: string;
  tags: { name: string; color: string }[];
  assignees: TaskAssignee[];
  comments: TaskCommentData[];
  attachments: TaskAttachmentData[];
  checklist: TaskChecklistData[];
}

export interface TaskCommentData {
  id: number;
  content: string;
  author: string;
  time: string;
}

export interface TaskAttachmentData {
  id: number;
  name: string;
  size: string;
}

export interface TaskChecklistData {
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskDetailPanelState {
  activeTab: number;
  task: TaskDetailData;
  tabs: string[];
}

export interface TaskDetailPanelActions {
  handleTabChange: (tabIndex: number) => void;
  handleClose: () => void;
}
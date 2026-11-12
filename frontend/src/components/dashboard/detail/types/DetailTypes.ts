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
  history: TaskHistoryData[];
}

export interface TaskCommentData {
  id: string;
  content: string;
  author: string;
  time: string;
  userId?: string;
  replies?: TaskCommentData[];
}

export interface TaskAttachmentData {
  id: string;
  name: string;
  size: string;
  mimeType: string;
  uploadedByName?: string;
}

export interface TaskChecklistData {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskHistoryData {
  id: string;
  field: string;
  oldValue?: string | null;
  newValue?: string | null;
  userName?: string;
  time: string;
}

export interface DetailState {
  activeTab: number;
  task: TaskDetailData | null;
  tabs: string[];
  loading: boolean;
  /** Estado de UI das abas */
  commentText: string;
  checklistText: string;
  replyToId: string | null;
  editing: boolean;
  editTitle: string;
  editDescription: string;
  editStatus: string;
  editPriority: string;
  editDueDate: string;
}

export interface DetailActions {
  handleTabChange: (tabIndex: number) => void;
  handleClose: () => void;
  handleCommentChange: (value: string) => void;
  handleAddComment: () => void;
  handleDeleteComment: (commentId: string) => void;
  handleReply: (commentId: string) => void;
  handleChecklistChange: (value: string) => void;
  handleAddChecklist: () => void;
  handleToggleChecklist: (itemId: string, isDone: boolean) => void;
  handleDeleteChecklist: (itemId: string) => void;
  handleUploadFile: (file: File) => void;
  handleDeleteFile: (attachmentId: string) => void;
  handleOpenFile: (attachmentId: string) => void;
  handleEditToggle: () => void;
  handleEditField: (field: string, value: string) => void;
  handleSaveEdit: () => void;
  handleDeleteTask: () => void;
}

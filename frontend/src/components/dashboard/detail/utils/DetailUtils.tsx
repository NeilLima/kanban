import { useState, useCallback, useRef } from 'react';
import { useDetailService } from '../services/DetailServices';
import { useFeedbackActions } from '@/shared/feedback/utils/FeedbackUtils';
import { ensureUserId } from '@/services/crudService';
import type { DetailState, DetailActions } from '../types/DetailTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const DEFAULT_TABS = ['Informações', 'Checklist', 'Comentários', 'Arquivos', 'Histórico'];

const PRIORITY_OPTIONS = [
  { value: 'LOW', label: 'Baixa' },
  { value: 'MEDIUM', label: 'Média' },
  { value: 'HIGH', label: 'Alta' },
  { value: 'URGENT', label: 'Urgente' },
];

const STATUS_OPTIONS = [
  { value: 'TODO', label: 'A Fazer' },
  { value: 'IN_PROGRESS', label: 'Em Desenvolvimento' },
  { value: 'REVIEW', label: 'Em Revisão' },
  { value: 'DONE', label: 'Concluído' },
];

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useDetail(taskId: string, onClose?: () => void) {
  const [activeTab, setActiveTab] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [checklistText, setChecklistText] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('TODO');
  const [editPriority, setEditPriority] = useState('MEDIUM');
  const [editDueDate, setEditDueDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useDetailService(taskId);
  const feedback = useFeedbackActions();
  const task = service.task;
  const kanban = service.kanban;

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleTabChange = useCallback((tabIndex: number) => {
    setActiveTab(tabIndex);
  }, []);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // ---- Comentários ----
  const handleCommentChange = useCallback((value: string) => setCommentText(value), []);

  const handleAddComment = useCallback(() => {
    const content = commentText.trim();
    if (!content) return;
    void kanban
      .addComment(content, replyToId ?? undefined)
      .then(() => {
        setCommentText('');
        setReplyToId(null);
        feedback.showFeedback({ variant: 'success', message: 'Comentário adicionado.' });
      })
      .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao comentar.' }));
  }, [kanban, commentText, replyToId, feedback]);

  const handleDeleteComment = useCallback(
    (commentId: string) => {
      feedback.showConfirm({
        title: 'Excluir comentário',
        message: 'Tem certeza que deseja excluir este comentário?',
        confirmLabel: 'Excluir',
        onConfirm: () => {
          void kanban
            .removeComment(commentId)
            .then(() => feedback.showFeedback({ variant: 'success', message: 'Comentário excluído.' }))
            .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao excluir comentário.' }));
        },
      });
    },
    [kanban, feedback],
  );

  const handleReply = useCallback((commentId: string) => {
    setReplyToId((prev) => (prev === commentId ? null : commentId));
  }, []);

  // ---- Checklist ----
  const handleChecklistChange = useCallback((value: string) => setChecklistText(value), []);

  const handleAddChecklist = useCallback(() => {
    const title = checklistText.trim();
    if (!title) return;
    void kanban
      .addChecklist(title)
      .then(() => {
        setChecklistText('');
        feedback.showFeedback({ variant: 'success', message: 'Item adicionado.' });
      })
      .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao adicionar item.' }));
  }, [kanban, checklistText, feedback]);

  const handleToggleChecklist = useCallback(
    (itemId: string, isDone: boolean) => {
      void kanban
        .toggleChecklist(itemId, isDone)
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao atualizar item.' }));
    },
    [kanban, feedback],
  );

  const handleDeleteChecklist = useCallback(
    (itemId: string) => {
      void kanban
        .removeChecklist(itemId)
        .then(() => feedback.showFeedback({ variant: 'success', message: 'Item excluído.' }))
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao excluir item.' }));
    },
    [kanban, feedback],
  );

  // ---- Anexos ----
  const handleUploadFile = useCallback(
    (file: File) => {
      /** ~3MB é o teto — serverless limita o body JSON (~4.5MB) e o base64 infla ~33% */
      if (file.size > 3 * 1024 * 1024) {
        feedback.showFeedback({ variant: 'error', message: 'Arquivo muito grande (máx. 3MB).' });
        return;
      }
      void kanban
        .uploadAttachment(file)
        .then(() => feedback.showFeedback({ variant: 'success', message: 'Arquivo enviado.' }))
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao enviar arquivo.' }));
    },
    [kanban, feedback],
  );

  const handleDeleteFile = useCallback(
    (attachmentId: string) => {
      feedback.showConfirm({
        title: 'Excluir arquivo',
        message: 'Tem certeza que deseja excluir este anexo?',
        confirmLabel: 'Excluir',
        onConfirm: () => {
          void kanban
            .removeAttachment(attachmentId)
            .then(() => feedback.showFeedback({ variant: 'success', message: 'Arquivo excluído.' }))
            .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao excluir arquivo.' }));
        },
      });
    },
    [kanban, feedback],
  );

  /** Abre/baixa o anexo: busca blob autenticado e abre em nova aba ou faz download */
  const handleOpenFile = useCallback(
    (attachmentId: string) => {
      const att = task?.attachments.find((a) => a.id === attachmentId);
      void kanban
        .getAttachmentBlob(attachmentId)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const isPreviewable =
            att?.mimeType.startsWith('image/') || att?.mimeType === 'application/pdf';
          if (isPreviewable) {
            window.open(url, '_blank');
          } else {
            const link = document.createElement('a');
            link.href = url;
            link.download = att?.name || 'anexo';
            link.click();
          }
          setTimeout(() => URL.revokeObjectURL(url), 60_000);
        })
        .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao abrir arquivo.' }));
    },
    [kanban, task, feedback],
  );

  const handlePickFile = useCallback(() => fileInputRef.current?.click(), []);

  // ---- Edição / exclusão da tarefa ----
  const handleEditToggle = useCallback(() => {
    if (!task) return;
    if (!editing) {
      setEditTitle(task.title);
      setEditDescription(task.description || '');
      setEditStatus(task.status);
      setEditPriority(String(task.priority).toUpperCase());
      setEditDueDate(task.dueDate || '');
    }
    setEditing((prev) => !prev);
  }, [task, editing]);

  const handleEditField = useCallback((field: string, value: string) => {
    if (field === 'title') setEditTitle(value);
    else if (field === 'description') setEditDescription(value);
    else if (field === 'status') setEditStatus(value);
    else if (field === 'priority') setEditPriority(value);
    else if (field === 'dueDate') setEditDueDate(value);
  }, []);

  const handleSaveEdit = useCallback(() => {
    void kanban
      .updateTask({
        title: editTitle,
        description: editDescription,
        status: editStatus,
        priority: editPriority,
        dueDate: editDueDate || null,
      })
      .then(() => {
        setEditing(false);
        feedback.showFeedback({ variant: 'success', message: 'Tarefa atualizada.' });
      })
      .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao salvar tarefa.' }));
  }, [kanban, editTitle, editDescription, editStatus, editPriority, editDueDate, feedback]);

  const handleDeleteTask = useCallback(() => {
    feedback.showConfirm({
      title: 'Excluir tarefa',
      message: 'Tem certeza que deseja excluir esta tarefa? Essa ação não pode ser desfeita.',
      confirmLabel: 'Excluir',
      onConfirm: () => {
        void kanban
          .deleteTask()
          .then(() => {
            feedback.showFeedback({ variant: 'success', message: 'Tarefa excluída.' });
            handleClose();
          })
          .catch(() => feedback.showFeedback({ variant: 'error', message: 'Erro ao excluir tarefa.' }));
      },
    });
  }, [kanban, feedback, handleClose]);

  const state: DetailState = {
    activeTab,
    task,
    tabs: DEFAULT_TABS,
    loading: service.loading,
    commentText,
    checklistText,
    replyToId,
    editing,
    editTitle,
    editDescription,
    editStatus,
    editPriority,
    editDueDate,
  };

  const actions: DetailActions = {
    handleTabChange,
    handleClose,
    handleCommentChange,
    handleAddComment,
    handleDeleteComment,
    handleReply,
    handleChecklistChange,
    handleAddChecklist,
    handleToggleChecklist,
    handleDeleteChecklist,
    handleUploadFile,
    handleDeleteFile,
    handleOpenFile,
    handleEditToggle,
    handleEditField,
    handleSaveEdit,
    handleDeleteTask,
  };

  return {
    state,
    actions,
    fileInputRef,
    handlePickFile,
    PRIORITY_OPTIONS,
    STATUS_OPTIONS,
    currentUserId: ensureUserId(),
  };
}

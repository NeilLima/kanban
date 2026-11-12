'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import { Tabs, Tab, Checkbox, IconButton } from '@mui/material';
import { Close as CloseIcon, Send as SendIcon, AttachFile as AttachFileIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useDetail } from '../utils/DetailUtils';
import {
  StyledOverlay,
  StyledPanel,
  StyledPanelHeader,
  StyledPanelContent,
  StyledPanelSection,
  StyledSectionTitle,
  StyledDescription,
  StyledField,
  StyledAvatar,
  StyledMemberItem,
  StyledMemberInfo,
  StyledMemberName,
  StyledMemberEmail,
  StyledTabContent,
  StyledCommentInput,
  StyledCommentButton,
  StyledActionButton,
  StyledHeaderRow,
  StyledBadge,
  StyledTaskTitle,
  StyledBadgeRow,
  StyledTabsContainer,
  StyledTabLabel,
  StyledTagChip,
  StyledPriorityDot,
  StyledPriorityText,
  StyledChecklistItem,
  StyledChecklistText,
  StyledCommentItem,
  StyledCommentAvatar,
  StyledCommentHeader,
  StyledCommentAuthor,
  StyledCommentTime,
  StyledCommentContent,
  StyledTextField,
  StyledAddButton,
  StyledFooterActions,
  StyledDeleteButton,
  StyledProgressBar,
  StyledProgressText,
  StyledHistoryItem,
  StyledEmptyState,
  StyledIconAction,
  StyledFileRow,
  StyledEditGrid,
  StyledEditActions,
  StyledReplyBadge,
} from '../styles/DetailStyles';
import type { DetailTypes, TaskCommentData } from '../types/DetailTypes';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0b1120',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 8,
  color: '#f8fafc',
  fontSize: 13,
  padding: '9px 12px',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#94a3b8',
  fontSize: 11,
  marginBottom: 5,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 0.4,
};

function CommentNode({
  comment,
  depth,
  replyToId,
  onReply,
  onDelete,
}: {
  comment: TaskCommentData;
  depth: number;
  replyToId: string | null;
  onReply: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div style={{ marginLeft: depth * 18 }}>
      <StyledCommentItem>
        <StyledCommentAvatar>{(comment.author || '?')[0].toUpperCase()}</StyledCommentAvatar>
        <div style={{ flex: 1, minWidth: 0 }}>
          <StyledCommentHeader>
            <StyledCommentAuthor>{comment.author}</StyledCommentAuthor>
            <StyledCommentTime>{comment.time}</StyledCommentTime>
          </StyledCommentHeader>
          <StyledCommentContent>{comment.content}</StyledCommentContent>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {depth === 0 && (
              <button
                type="button"
                onClick={() => onReply(comment.id)}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 11, cursor: 'pointer', padding: 0 }}
                data-testid={`detail-comment-reply-${comment.id}`}
              >
                Responder
              </button>
            )}
            <button
              type="button"
              onClick={() => onDelete(comment.id)}
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 11, cursor: 'pointer', padding: 0 }}
              data-testid={`detail-comment-delete-${comment.id}`}
            >
              Excluir
            </button>
            {replyToId === comment.id && <StyledReplyBadge>respondendo</StyledReplyBadge>}
          </div>
        </div>
      </StyledCommentItem>
      {(comment.replies || []).map((r) => (
        <CommentNode
          key={r.id}
          comment={r}
          depth={depth + 1}
          replyToId={replyToId}
          onReply={onReply}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default function DetailComp({ taskId, onClose }: DetailTypes) {
  const {
    state,
    actions,
    fileInputRef,
    handlePickFile,
    PRIORITY_OPTIONS,
    STATUS_OPTIONS,
  } = useDetail(taskId, onClose);
  const task = state.task;

  if (!task) {
    return null;
  }

  const checklistTotal = task.checklist.length;
  const checklistDone = task.checklist.filter((i) => i.completed).length;
  const checklistPercent = checklistTotal > 0 ? Math.round((checklistDone / checklistTotal) * 100) : 0;

  // BoardComp é importado com dynamic({ ssr: false }), então este componente
  // só renderiza no cliente — document.body está sempre disponível.
  // O Portal garante que o painel fique fora de qualquer contexto de stacking
  // (ex.: StyledBoard com z-index:1), ficando sempre acima de tudo.
  return createPortal(
    <>
      <StyledOverlay onClick={onClose} />
      <StyledPanel>
        {/* Header */}
        <StyledPanelHeader>
          <StyledHeaderRow>
            <StyledBadge
              $bgColor="rgba(255,255,255,0.05)"
              $textColor="#94a3b8"
              $borderColor="transparent"
            >
              #{task.id.slice(0, 8)}
            </StyledBadge>
            <IconButton onClick={onClose} size="small" style={{ color: '#94a3b8' }} data-testid="detail-close">
              <CloseIcon fontSize="small" />
            </IconButton>
          </StyledHeaderRow>
          <StyledTaskTitle>{task.title}</StyledTaskTitle>
          <StyledBadgeRow>
            <StyledBadge
              $bgColor="rgba(59, 130, 246, 0.15)"
              $textColor="#3b82f6"
              $borderColor="rgba(59, 130, 246, 0.3)"
            >
              {STATUS_OPTIONS.find((s) => s.value === task.status)?.label || task.status}
            </StyledBadge>
            <StyledBadge
              $bgColor="rgba(239, 68, 68, 0.15)"
              $textColor="#ef4444"
              $borderColor="rgba(239, 68, 68, 0.3)"
            >
              ● {PRIORITY_OPTIONS.find((p) => p.value === String(task.priority).toUpperCase())?.label || task.priority}
            </StyledBadge>
          </StyledBadgeRow>
        </StyledPanelHeader>

        {/* Tabs */}
        <StyledTabsContainer>
          <Tabs
            value={state.activeTab}
            onChange={(_, v) => actions.handleTabChange(v)}
            variant="fullWidth"
          >
            {state.tabs.map((tab, idx) => (
              <Tab
                key={tab}
                label={<StyledTabLabel $active={state.activeTab === idx}>{tab}</StyledTabLabel>}
                style={{ minHeight: 48 }}
                data-testid={`detail-tab-${idx}`}
              />
            ))}
          </Tabs>
        </StyledTabsContainer>

        {/* Content */}
        <StyledPanelContent>
          {state.activeTab === 0 && (
            <StyledTabContent>
              {state.editing ? (
                <StyledEditGrid>
                  <div>
                    <label>Título</label>
                    <StyledTextField
                      value={state.editTitle}
                      onChange={(e) => actions.handleEditField('title', e.target.value)}
                      data-testid="detail-edit-title"
                    />
                  </div>
                  <div>
                    <label>Descrição</label>
                    <textarea
                      value={state.editDescription}
                      onChange={(e) => actions.handleEditField('description', e.target.value)}
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                      data-testid="detail-edit-description"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <label>Status</label>
                      <select
                        value={state.editStatus}
                        onChange={(e) => actions.handleEditField('status', e.target.value)}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        data-testid="detail-edit-status"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>Prioridade</label>
                      <select
                        value={state.editPriority}
                        onChange={(e) => actions.handleEditField('priority', e.target.value)}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        data-testid="detail-edit-priority"
                      >
                        {PRIORITY_OPTIONS.map((p) => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label>Prazo</label>
                    <input
                      type="date"
                      value={state.editDueDate}
                      onChange={(e) => actions.handleEditField('dueDate', e.target.value)}
                      style={inputStyle}
                      data-testid="detail-edit-duedate"
                    />
                  </div>
                  <StyledEditActions>
                    <StyledActionButton
                      variant="contained"
                      onClick={actions.handleSaveEdit}
                      data-testid="detail-edit-save"
                    >
                      Salvar alterações
                    </StyledActionButton>
                    <StyledActionButton variant="outlined" onClick={actions.handleEditToggle} data-testid="detail-edit-cancel">
                      Cancelar
                    </StyledActionButton>
                  </StyledEditActions>
                </StyledEditGrid>
              ) : (
                <>
                  <StyledPanelSection>
                    <StyledSectionTitle>Descrição</StyledSectionTitle>
                    <StyledDescription>{task.description || 'Sem descrição.'}</StyledDescription>
                  </StyledPanelSection>

                  {task.assignees.length > 0 && (
                    <StyledPanelSection>
                      <StyledSectionTitle>Responsável</StyledSectionTitle>
                      <StyledMemberItem>
                        <StyledAvatar $color={task.assignees[0].color || '#64748b'}>
                          {task.assignees[0].name[0]}
                        </StyledAvatar>
                        <StyledMemberInfo>
                          <StyledMemberName>{task.assignees[0].name}</StyledMemberName>
                          <StyledMemberEmail>{task.assignees[0].email}</StyledMemberEmail>
                        </StyledMemberInfo>
                      </StyledMemberItem>
                    </StyledPanelSection>
                  )}

                  <StyledPanelSection>
                    <StyledSectionTitle>Prazo</StyledSectionTitle>
                    <StyledField>
                      <i className="bi bi-calendar" style={{ marginRight: 8, color: '#94a3b8' }}></i>
                      {task.dueDate || 'Sem prazo'}
                    </StyledField>
                  </StyledPanelSection>

                  {task.tags.length > 0 && (
                    <StyledPanelSection>
                      <StyledSectionTitle>Etiquetas</StyledSectionTitle>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {task.tags.map((tag, idx) => (
                          <StyledTagChip key={idx} $color={tag.color}>
                            {tag.name}
                          </StyledTagChip>
                        ))}
                      </div>
                    </StyledPanelSection>
                  )}

                  <StyledPanelSection>
                    <StyledSectionTitle>Prioridade</StyledSectionTitle>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <StyledPriorityDot $color="#ef4444" />
                      <StyledPriorityText $color="#ef4444">{task.priority}</StyledPriorityText>
                    </div>
                  </StyledPanelSection>

                  {(task.estimatedTime || task.spentTime) && (
                    <>
                      {task.estimatedTime && (
                        <StyledPanelSection>
                          <StyledSectionTitle>Tempo Estimado</StyledSectionTitle>
                          <StyledField>
                            <i className="bi bi-clock" style={{ marginRight: 8, color: '#94a3b8' }}></i>
                            {task.estimatedTime}
                          </StyledField>
                        </StyledPanelSection>
                      )}
                      {task.spentTime && (
                        <StyledPanelSection>
                          <StyledSectionTitle>Tempo Gasto</StyledSectionTitle>
                          <StyledField>
                            <i className="bi bi-clock-history" style={{ marginRight: 8, color: '#94a3b8' }}></i>
                            {task.spentTime}
                          </StyledField>
                        </StyledPanelSection>
                      )}
                    </>
                  )}
                </>
              )}
            </StyledTabContent>
          )}

          {state.activeTab === 1 && (
            <StyledTabContent>
              {checklistTotal > 0 && (
                <>
                  <StyledProgressBar data-testid="detail-checklist-progress">
                    <div style={{ width: `${checklistPercent}%` }} />
                  </StyledProgressBar>
                  <StyledProgressText>{checklistDone}/{checklistTotal} concluídos ({checklistPercent}%)</StyledProgressText>
                </>
              )}
              {task.checklist.length === 0 && (
                <StyledEmptyState>Nenhum item no checklist.</StyledEmptyState>
              )}
              {task.checklist.map((item) => (
                <StyledChecklistItem key={item.id}>
                  <Checkbox
                    checked={item.completed}
                    size="small"
                    style={{ padding: 0 }}
                    onChange={(e) => actions.handleToggleChecklist(item.id, e.target.checked)}
                    data-testid={`detail-checklist-toggle-${item.id}`}
                  />
                  <StyledChecklistText $completed={item.completed} style={{ flex: 1 }}>
                    {item.title}
                  </StyledChecklistText>
                  <StyledIconAction
                    className="danger"
                    onClick={() => actions.handleDeleteChecklist(item.id)}
                    data-testid={`detail-checklist-delete-${item.id}`}
                  >
                    <DeleteIcon sx={{ fontSize: 15 }} />
                  </StyledIconAction>
                </StyledChecklistItem>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <StyledTextField
                  placeholder="Novo item..."
                  value={state.checklistText}
                  onChange={(e) => actions.handleChecklistChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && actions.handleAddChecklist()}
                  data-testid="detail-checklist-input"
                />
                <StyledAddButton
                  type="button"
                  onClick={actions.handleAddChecklist}
                  data-testid="detail-checklist-add"
                >
                  <EditIcon style={{ fontSize: 16 }} />
                </StyledAddButton>
              </div>
            </StyledTabContent>
          )}

          {state.activeTab === 2 && (
            <StyledTabContent>
              {task.comments.length === 0 && (
                <StyledEmptyState>Nenhum comentário ainda.</StyledEmptyState>
              )}
              {task.comments.map((comment) => (
                <CommentNode
                  key={comment.id}
                  comment={comment}
                  depth={0}
                  replyToId={state.replyToId}
                  onReply={actions.handleReply}
                  onDelete={actions.handleDeleteComment}
                />
              ))}
              {state.replyToId && (
                <div style={{ fontSize: 11, color: '#93c5fd', margin: '8px 0' }}>
                  Respondendo comentário — <button type="button" onClick={() => actions.handleReply(state.replyToId!)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: 11 }}>cancelar</button>
                </div>
              )}
              <StyledCommentInput>
                <StyledTextField
                  placeholder={state.replyToId ? 'Escreva uma resposta...' : 'Escreva um comentário...'}
                  value={state.commentText}
                  onChange={(e) => actions.handleCommentChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && actions.handleAddComment()}
                  data-testid="detail-comment-input"
                />
                <StyledCommentButton
                  type="button"
                  onClick={actions.handleAddComment}
                  data-testid="detail-comment-send"
                >
                  <SendIcon style={{ fontSize: 18 }} />
                </StyledCommentButton>
              </StyledCommentInput>
            </StyledTabContent>
          )}

          {state.activeTab === 3 && (
            <StyledTabContent>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) actions.handleUploadFile(file);
                  e.target.value = '';
                }}
                data-testid="detail-file-input"
              />
              {task.attachments.length === 0 && (
                <StyledEmptyState>Nenhum arquivo anexado.</StyledEmptyState>
              )}
              {task.attachments.map((file) => (
                <StyledFileRow key={file.id} data-testid={`detail-file-${file.id}`}>
                  <AttachFileIcon style={{ fontSize: 16, color: '#94a3b8' }} />
                  <span
                    className="name"
                    onClick={() => actions.handleOpenFile(file.id)}
                    title={file.name}
                    data-testid={`detail-file-open-${file.id}`}
                  >
                    {file.name}
                  </span>
                  <span className="meta">
                    {file.size}
                    {file.uploadedByName ? ` · ${file.uploadedByName}` : ''}
                  </span>
                  <StyledIconAction
                    className="danger"
                    onClick={() => actions.handleDeleteFile(file.id)}
                    data-testid={`detail-file-delete-${file.id}`}
                  >
                    <DeleteIcon sx={{ fontSize: 15 }} />
                  </StyledIconAction>
                </StyledFileRow>
              ))}
              <StyledAddButton
                type="button"
                onClick={handlePickFile}
                data-testid="detail-file-add"
              >
                <AttachFileIcon style={{ fontSize: 16 }} />
                Anexar arquivo
              </StyledAddButton>
            </StyledTabContent>
          )}

          {state.activeTab === 4 && (
            <StyledTabContent>
              {task.history.length === 0 && (
                <StyledEmptyState>Nenhuma alteração registrada.</StyledEmptyState>
              )}
              {task.history.map((h) => (
                <StyledHistoryItem key={h.id} data-testid={`detail-history-${h.id}`}>
                  <span>
                    <strong>{h.userName || 'Sistema'}</strong> alterou {h.field}
                    {h.oldValue ? (
                      <span className="change"> de <s>{h.oldValue}</s> para <strong>{h.newValue}</strong></span>
                    ) : h.newValue ? (
                      <span className="change"> para <strong>{h.newValue}</strong></span>
                    ) : null}
                  </span>
                  <span className="meta">{h.time}</span>
                </StyledHistoryItem>
              ))}
            </StyledTabContent>
          )}
        </StyledPanelContent>

        {/* Actions */}
        <StyledFooterActions>
          <StyledActionButton
            variant="contained"
            onClick={state.editing ? actions.handleSaveEdit : actions.handleEditToggle}
            style={{ flex: 1 }}
            data-testid="detail-edit-toggle"
          >
            <EditIcon style={{ fontSize: 16, marginRight: 8 }} />
            {state.editing ? 'Salvar' : 'Editar Tarefa'}
          </StyledActionButton>
          <StyledDeleteButton
            onClick={actions.handleDeleteTask}
            data-testid="detail-delete-task"
            title="Excluir tarefa"
          >
            <DeleteIcon style={{ fontSize: 16 }} />
          </StyledDeleteButton>
        </StyledFooterActions>
      </StyledPanel>
    </>,
    document.body
  );
}

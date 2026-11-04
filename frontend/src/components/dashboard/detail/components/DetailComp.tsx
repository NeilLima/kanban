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
  StyledFileItem,
  StyledFileInfo,
  StyledFileName,
  StyledFileSize,
  StyledFooterActions,
  StyledDeleteButton,
} from '../styles/DetailStyles';
import type { DetailTypes } from '../types/DetailTypes';

export default function DetailComp({ taskId, onClose }: DetailTypes) {
  const { state, actions } = useDetail(taskId);
  const task = state.task;

  if (!task) {
    return null;
  }

  // BoardComp Ã© importado com dynamic({ ssr: false }), entÃ£o este componente
  // sÃ³ renderiza no cliente â€” document.body estÃ¡ sempre disponÃ­vel.
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
              #{task.id}
            </StyledBadge>
            <IconButton onClick={onClose} size="small" style={{ color: '#94a3b8' }}>
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
              {task.status}
            </StyledBadge>
            <StyledBadge
              $bgColor="rgba(239, 68, 68, 0.15)"
              $textColor="#ef4444"
              $borderColor="rgba(239, 68, 68, 0.3)"
            >
              â— {task.priority}
            </StyledBadge>
            <StyledBadge
              $bgColor="rgba(251, 191, 36, 0.15)"
              $textColor="#fbbf24"
              $borderColor="rgba(251, 191, 36, 0.3)"
            >
              â˜… Projeto
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
              />
            ))}
          </Tabs>
        </StyledTabsContainer>

        {/* Content */}
        <StyledPanelContent>
          {state.activeTab === 0 && (
            <StyledTabContent>
              {/* Description */}
              <StyledPanelSection>
                <StyledSectionTitle>DescriÃ§Ã£o</StyledSectionTitle>
                <StyledDescription>{task.description}</StyledDescription>
              </StyledPanelSection>

              {/* Assignee */}
              {task.assignees.length > 0 && (
                <StyledPanelSection>
                  <StyledSectionTitle>ResponsÃ¡vel</StyledSectionTitle>
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

              {/* Project */}
              <StyledPanelSection>
                <StyledSectionTitle>Projeto</StyledSectionTitle>
                <StyledField>
                  <i className="bi bi-folder" style={{ marginRight: 8, color: '#3b82f6' }}></i>
                  {task.project}
                </StyledField>
              </StyledPanelSection>

              {/* Due Date */}
              <StyledPanelSection>
                <StyledSectionTitle>Prazo</StyledSectionTitle>
                <StyledField>
                  <i className="bi bi-calendar" style={{ marginRight: 8, color: '#94a3b8' }}></i>
                  {task.dueDate}
                </StyledField>
              </StyledPanelSection>

              {/* Tags */}
              <StyledPanelSection>
                <StyledSectionTitle>Etiquetas</StyledSectionTitle>
                <div style={{ display: 'flex', gap: 8 }}>
                  {task.tags.map((tag, idx) => (
                    <StyledTagChip key={idx} $color={tag.color}>
                      {tag.name}
                    </StyledTagChip>
                  ))}
                </div>
              </StyledPanelSection>

              {/* Priority */}
              <StyledPanelSection>
                <StyledSectionTitle>Prioridade</StyledSectionTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <StyledPriorityDot $color="#ef4444" />
                  <StyledPriorityText $color="#ef4444">{task.priority}</StyledPriorityText>
                </div>
              </StyledPanelSection>

              {/* Time */}
              <StyledPanelSection>
                <StyledSectionTitle>Tempo Estimado</StyledSectionTitle>
                <StyledField>
                  <i className="bi bi-clock" style={{ marginRight: 8, color: '#94a3b8' }}></i>
                  {task.estimatedTime}
                </StyledField>
              </StyledPanelSection>

              <StyledPanelSection>
                <StyledSectionTitle>Tempo Gasto</StyledSectionTitle>
                <StyledField>
                  <i className="bi bi-clock-history" style={{ marginRight: 8, color: '#94a3b8' }}></i>
                  {task.spentTime}
                </StyledField>
              </StyledPanelSection>
            </StyledTabContent>
          )}

          {state.activeTab === 1 && (
            <StyledTabContent>
              {task.checklist.map(item => (
                <StyledChecklistItem key={item.id}>
                  <Checkbox checked={item.completed} size="small" style={{ padding: 0 }} />
                  <StyledChecklistText $completed={item.completed}>
                    {item.title}
                  </StyledChecklistText>
                </StyledChecklistItem>
              ))}
              <StyledAddButton>
                <EditIcon style={{ fontSize: 16 }} />
                Adicionar item
              </StyledAddButton>
            </StyledTabContent>
          )}

          {state.activeTab === 2 && (
            <StyledTabContent>
              {task.comments.map(comment => (
                <StyledCommentItem key={comment.id}>
                  <StyledCommentAvatar>
                    {comment.author[0]}
                  </StyledCommentAvatar>
                  <div style={{ flex: 1 }}>
                    <StyledCommentHeader>
                      <StyledCommentAuthor>{comment.author}</StyledCommentAuthor>
                      <StyledCommentTime>{comment.time} atrÃ¡s</StyledCommentTime>
                    </StyledCommentHeader>
                    <StyledCommentContent>{comment.content}</StyledCommentContent>
                  </div>
                </StyledCommentItem>
              ))}
              <StyledCommentInput>
                <StyledTextField placeholder="Escreva um comentÃ¡rio..." />
                <StyledCommentButton>
                  <SendIcon style={{ fontSize: 18 }} />
                </StyledCommentButton>
              </StyledCommentInput>
            </StyledTabContent>
          )}

          {state.activeTab === 3 && (
            <StyledTabContent>
              {task.attachments.map(file => (
                <StyledFileItem key={file.id}>
                  <AttachFileIcon style={{ fontSize: 16 }} />
                  <StyledFileInfo>
                    <StyledFileName>{file.name}</StyledFileName>
                    <StyledFileSize>{file.size}</StyledFileSize>
                  </StyledFileInfo>
                </StyledFileItem>
              ))}
              <StyledAddButton>
                <AttachFileIcon style={{ fontSize: 16 }} />
                Adicionar arquivo
              </StyledAddButton>
            </StyledTabContent>
          )}
        </StyledPanelContent>

        {/* Actions */}
        <StyledFooterActions>
          <StyledActionButton variant="contained" style={{ flex: 1 }}>
            <EditIcon style={{ fontSize: 16, marginRight: 8 }} />
            Editar Tarefa
          </StyledActionButton>
          <StyledDeleteButton>
            <DeleteIcon style={{ fontSize: 16 }} />
          </StyledDeleteButton>
        </StyledFooterActions>
      </StyledPanel>
    </>,
    document.body
  );
}
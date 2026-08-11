'use client';
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, Box, Typography, TextField, Button, IconButton, List, ListItem, ListItemText, Checkbox, CircularProgress, Chip } from '@mui/material';
import { Close as CloseIcon, Add as AddIcon, Delete as DeleteIcon, Send as SendIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';
import { useTaskModal } from '../utils/TaskModalUtils';
import type { TaskModalTypes } from '../types/TaskModalTypes';

export default function TaskModalComp({ taskId, show, onHide }: TaskModalTypes) {
  const { state, actions, tabs } = useTaskModal(taskId);

  if (state.loading) {
    return (
      <Dialog open={show} onClose={onHide} maxWidth="md" fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={show} onClose={onHide} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{state.task?.title || 'Tarefa'}</Typography>
          <IconButton onClick={onHide} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Tabs value={tabs.indexOf(state.activeTab)} onChange={(_, v) => actions.handleTabChange(tabs[v])} variant="scrollable">
        {tabs.map(tab => <Tab key={tab} label={tab} />)}
      </Tabs>

      <DialogContent dividers>
        {state.activeTab === 'Informações' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Título" defaultValue={state.task?.title} fullWidth size="small" />
            <TextField label="Descrição" defaultValue={state.task?.description} multiline rows={4} fullWidth size="small" />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip label={`Prioridade: ${state.task?.priority}`} color={state.task?.priority === 'high' ? 'error' : state.task?.priority === 'medium' ? 'warning' : 'success'} />
              {state.task?.dueDate && <Chip label={`Prazo: ${new Date(state.task.dueDate).toLocaleDateString()}`} variant="outlined" />}
            </Box>
          </Box>
        )}

        {state.activeTab === 'Checklist' && (
          <List>
            {state.checklists.map(item => (
              <ListItem key={item.id} dense>
                <Checkbox checked={item.completed} size="small" />
                <ListItemText primary={item.title} sx={{ textDecoration: item.completed ? 'line-through' : 'none' }} />
                <IconButton size="small"><DeleteIcon fontSize="small" /></IconButton>
              </ListItem>
            ))}
            <Button startIcon={<AddIcon />} onClick={actions.handleAddChecklist} size="small">Adicionar item</Button>
          </List>
        )}

        {state.activeTab === 'Comentários' && (
          <Box>
            <List>
              {state.comments.map(comment => (
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemText
                    primary={comment.content}
                    secondary={new Date(comment.createdAt).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <TextField fullWidth size="small" placeholder="Escreva um comentário..." />
              <IconButton color="primary"><SendIcon /></IconButton>
            </Box>
          </Box>
        )}

        {state.activeTab === 'Arquivos' && (
          <Box>
            {state.attachments.map(file => (
              <Chip key={file.id} label={file.name} onDelete={() => {}} variant="outlined" sx={{ m: 0.5 }} />
            ))}
            <Box sx={{ mt: 2 }}>
              <Button startIcon={<AttachFileIcon />} variant="outlined" size="small">Adicionar arquivo</Button>
            </Box>
          </Box>
        )}

        {state.activeTab === 'Histórico' && (
          <Typography color="text.secondary">Histórico de alterações...</Typography>
        )}

        {state.activeTab === 'Atividade' && (
          <Typography color="text.secondary">Atividades recentes...</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={actions.handleDeleteTask} color="error" startIcon={<DeleteIcon />}>Excluir</Button>
        <Button onClick={actions.handleSaveTask} variant="contained">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
'use client';
import React from 'react';
import { Container, Typography, Box, Switch, FormControlLabel, Divider } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Configurações
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Conta</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">Nome: {user?.name || 'Usuário'}</Typography>
          <Typography variant="body2" color="text.secondary">Email: {user?.email || 'user@example.com'}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Preferências</Typography>
          <Divider sx={{ mb: 2 }} />
          <FormControlLabel control={<Switch defaultChecked />} label="Notificações por email" />
          <FormControlLabel control={<Switch />} label="Modo escuro" />
        </Box>
      </Box>
    </Container>
  );
}
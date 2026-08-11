'use client';
import React from 'react';
import { Container, Typography, Box, Avatar, Button } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Perfil
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: 40 }}>
          {user?.name?.charAt(0) || 'U'}
        </Avatar>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">{user?.name || 'Usuário'}</Typography>
          <Typography color="text.secondary">{user?.email || 'user@example.com'}</Typography>
        </Box>
        <Button variant="outlined" size="large">Editar Perfil</Button>
      </Box>
    </Container>
  );
}
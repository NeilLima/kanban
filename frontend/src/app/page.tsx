'use client';
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
        Kanban Board
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Gerencie seus projetos e tarefas de forma eficiente
      </Typography>
      {user ? (
        <Button variant="contained" size="large" onClick={() => router.push('/dashboard')}>
          Ir para Dashboard
        </Button>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" size="large" onClick={() => router.push('/login')}>
            Login
          </Button>
          <Button variant="outlined" size="large" onClick={() => router.push('/register')}>
            Cadastro
          </Button>
        </Box>
      )}
    </Container>
  );
}
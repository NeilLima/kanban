'use client';
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

export default function ProjectsPage() {

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Projetos
        </Typography>
        <Button variant="contained" size="large">
          Novo Projeto
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography color="text.secondary">Nenhum projeto encontrado.</Typography>
      </Box>
    </Container>
  );
}
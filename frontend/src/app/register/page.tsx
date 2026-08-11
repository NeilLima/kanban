'use client';
import React from 'react';
import { Container, Typography, TextField, Button, Box, Link } from '@mui/material';
import { useRegister } from './utils/RegisterUtils';

export default function RegisterPage() {
  const { name, email, password, setName, setEmail, setPassword, handleSubmit } = useRegister();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Cadastro</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
          <TextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth />
          <Button type="submit" variant="contained" size="large" fullWidth>Cadastrar</Button>
        </Box>
      </form>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2">
          Já tem conta? <Link href="/login">Faça login</Link>
        </Typography>
      </Box>
    </Container>
  );
}
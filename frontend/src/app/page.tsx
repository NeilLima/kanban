'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

/**
 * Rota inicial `/` → nunca mostra landing.
 * Logado → /dashboard · Sem sessão → /login
 */
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    /** `/` SEMPRE cai no login — o dashboard só é alcançado via login
     *  (a página de login redireciona sozinha quem já está logado). */
    router.replace('/login');
  }, [router]);

  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress size={36} />
    </Box>
  );
}

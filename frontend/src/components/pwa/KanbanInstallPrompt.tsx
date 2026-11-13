'use client';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab, Box, Typography } from '@mui/material';
import { InstallMobile } from '@mui/icons-material';

const DISMISS_KEY = 'kanban-install-dismissed';

/**
 * 📲 Prompt de instalação PWA do Kanban Pro —
 * 1ª visita (não standalone) → modal centralizado "Instalar"
 * "Continuar no browser" → mini botão flutuante persistente
 * Instalado → some; iOS → instruções manuais (Compartilhar → Tela de Início)
 */
export default function KanbanInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true);

  useEffect(() => {
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));
    setDismissed(localStorage.getItem(DISMISS_KEY) === '1');

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Modal aparece assim que o navegador libera o prompt (1ª visita)
      setOpen(true);
    };
    const onInstalled = () => {
      setInstalled(true);
      setOpen(false);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  // iOS não dispara beforeinstallprompt — mostra modal com instruções
  useEffect(() => {
    if (isIOS && !isStandalone && !dismissed && !installed) setOpen(true);
  }, [isIOS, isStandalone, dismissed, installed]);

  if (isStandalone || installed) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setInstalling(false);
    if (outcome === 'accepted') {
      setInstalled(true);
      setOpen(false);
    }
    setDeferredPrompt(null);
  };

  const handleContinueBrowser = () => {
    setDismissed(true);
    localStorage.setItem(DISMISS_KEY, '1');
    setOpen(false);
  };

  const handleClose = () => {
    // Fechar pelo X = continuar no browser (mantém o mini botão)
    handleContinueBrowser();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(160deg, #111827 0%, #0B1120 100%)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            color: '#F8FAFC',
            textAlign: 'center',
            p: 1,
          },
        }}
        data-testid="kanban-install-modal"
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, fontWeight: 800 }}>
          <InstallMobile sx={{ color: '#8B5CF6' }} />
          Instalar Kanban Pro
        </DialogTitle>
        <DialogContent>
          <Box
            component="img"
            src="/icon-192.png"
            alt="Kanban Pro"
            sx={{ width: 84, height: 84, borderRadius: 3, mb: 2, boxShadow: '0 8px 30px rgba(139,92,246,0.35)' }}
          />
          {isIOS ? (
            <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.7 }}>
              No iPhone/iPad: toque em <strong>Compartilhar</strong> (□↑) e depois em
              <strong> "Adicionar à Tela de Início"</strong>.
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.7 }}>
              Instale o Kanban Pro no seu dispositivo para acessar mais rápido,
              como um aplicativo — sem barra do navegador.
            </Typography>
          )}
          {installing && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: '#8B5CF6' }}>
              ⏳ Instalando…
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 1, pb: 2 }}>
          {!isIOS && (
            <Button
              variant="contained"
              onClick={handleInstall}
              disabled={!deferredPrompt || installing}
              data-testid="kanban-install-btn"
              sx={{
                borderRadius: 999,
                px: 3,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
                textTransform: 'none',
              }}
            >
              {installing ? 'Instalando…' : 'Instalar'}
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={handleContinueBrowser}
            data-testid="kanban-install-skip"
            sx={{
              borderRadius: 999,
              px: 3,
              fontWeight: 600,
              textTransform: 'none',
              color: '#94A3B8',
              borderColor: 'rgba(148,163,184,0.3)',
            }}
          >
            Continuar no browser
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🟣 Mini botão flutuante — sempre disponível após "continuar no browser" */}
      {dismissed && !open && (
        <Fab
          size="small"
          onClick={() => setOpen(true)}
          data-testid="kanban-install-fab"
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1300,
            background: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
            color: '#fff',
            boxShadow: '0 8px 24px rgba(139,92,246,0.5)',
            '&:hover': { transform: 'scale(1.08)' },
          }}
        >
          <InstallMobile fontSize="small" />
        </Fab>
      )}
    </>
  );
}

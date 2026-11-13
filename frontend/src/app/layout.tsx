import React from 'react';
import Providers from './providers';
import KanbanInstallPrompt from '@/components/pwa/KanbanInstallPrompt';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" />
        {/* 📱 PWA + preview de link */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#0B1120" />
        <meta name="description" content="Kanban Pro — gerencie projetos e tarefas. Next.js · NestJS · PostgreSQL · Prisma" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kanban Pro" />
        <meta property="og:description" content="Gerencie projetos e tarefas — Kanban Pro" />
        <meta property="og:image" content="https://kanban-frontend-roan.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kanban Pro" />
        <meta name="twitter:description" content="Gerencie projetos e tarefas — Kanban Pro" />
        <meta name="twitter:image" content="https://kanban-frontend-roan.vercel.app/og-image.jpg" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <Providers>
          <KanbanInstallPrompt />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0B1120', color: '#F8FAFC', overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>
            <div style={{ flex: 1, minWidth: 0, overflowX: 'hidden' }}>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
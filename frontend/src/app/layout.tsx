import React from 'react';
import Providers from './providers';
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
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <Providers>
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
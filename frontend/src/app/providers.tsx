'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { FeedbackProvider } from '@/contexts/FeedbackContext';
import FeedbackModalComp from '@/shared/feedback/components/FeedbackModalComp';
import ConfirmModalComp from '@/shared/feedback/components/ConfirmModalComp';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <FeedbackProvider>
            {children}
            <FeedbackModalComp />
            <ConfirmModalComp />
          </FeedbackProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
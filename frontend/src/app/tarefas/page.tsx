'use client';

import React, { Suspense } from 'react';
import TarefasComp from '@/components/tarefas/main/components/TarefasComp';

function TarefasPageInner() {
  return <TarefasComp projectId="default-project" />;
}

export default function TarefasPage() {
  return (
    <Suspense fallback={null}>
      <TarefasPageInner />
    </Suspense>
  );
}

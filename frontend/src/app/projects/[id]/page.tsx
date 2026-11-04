'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import ProjectDetailComp from '@/components/project/detail/components/ProjectDetailComp';

function ProjectDetailPageInner() {
  const params = useParams<{ id: string }>();
  const projectId = params?.id ?? '';

  return <ProjectDetailComp projectId={projectId} />;
}

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={null}>
      <ProjectDetailPageInner />
    </Suspense>
  );
}
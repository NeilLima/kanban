'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import UserComp from '@/components/user/main/components/UserComp';

function UserPageInner() {
  const params = useParams<{ id: string }>();
  const userId = params?.id ?? '';

  return <UserComp userId={userId} />;
}

export default function UserPage() {
  return (
    <Suspense fallback={null}>
      <UserPageInner />
    </Suspense>
  );
}

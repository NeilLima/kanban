'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const MENU_ITEMS = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Projetos', path: '/projects' },
  { label: 'Perfil', path: '/profile' },
  { label: 'Configurações', path: '/settings' },
];

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
// ============================================
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // ============================================
  // 4️⃣ FUNÇÕES
// ============================================
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setDrawerOpen(false);
  };

  return {
    drawerOpen,
    setDrawerOpen,
    user,
    pathname,
    handleLogout,
    handleNavigate,
    menuItems: MENU_ITEMS,
  };
}
'use client';

import { useState, useCallback, useEffect } from 'react';
import { followUser, unfollowUser, checkFollowing, approveFollowRequest, rejectFollowRequest } from '@/shared/follow/services/FollowServices';
import { useAuth } from '@/contexts/AuthContext';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

export type FollowState = 'idle' | 'following' | 'pending' | 'not_following';

export interface FollowStatus {
  isFollowing: boolean;
  hasPendingRequest: boolean;
}

// Eventos globais para sincronizar todos os componentes
const FOLLOW_EVENT = 'follow:status-changed';

function dispatchFollowEvent(userId: string, newStatus: FollowStatus) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(FOLLOW_EVENT, { detail: { userId, ...newStatus } })
    );
  }
}

export function isFollowing(userId: string): FollowStatus {
  if (typeof window === 'undefined') return { isFollowing: false, hasPendingRequest: false };
  const stored = localStorage.getItem(`follow:${userId}`);
  return stored ? JSON.parse(stored) : { isFollowing: false, hasPendingRequest: false };
}

function persistFollowStatus(userId: string, status: FollowStatus) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`follow:${userId}`, JSON.stringify(status));
  }
}

// ============================================
// 2️⃣ ESTADOS
// ============================================

/**
 * Hook centralizado para gerenciar o estado de follow de um usuário.
 * 
 * Características:
 * - Mantém estado local sincronizado via localStorage e eventos globais
 * - Dispara eventos globais para que outros componentes se mantenham sincronizados
 * - Reage a eventos de outros componentes que usam o mesmo hook
 * - Funciona para perfis públicos (direto) e privados (solicitação pendente)
 * 
 * @param targetUserId - ID do usuário alvo (quem será seguido/deixado de seguir)
 * @returns Estado e ações de follow
 */
export function useFollow(targetUserId: string | null | undefined) {
  const { user } = useAuth();
  const currentUserId = user?.id;
  const [status, setStatus] = useState<FollowStatus>({
    isFollowing: false,
    hasPendingRequest: false,
  });
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================

  const updateStatus = useCallback((newStatus: FollowStatus) => {
    setStatus(newStatus);
    if (targetUserId) {
      persistFollowStatus(targetUserId, newStatus);
    }
  }, [targetUserId]);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================

  /**
   * Verifica o status atual de follow (se segue ou se tem solicitação pendente)
   */
  const check = useCallback(async () => {
    if (!targetUserId || !currentUserId) return;
    try {
      const result = await checkFollowing(currentUserId, targetUserId);
      updateStatus(result);
      return result;
    } catch (error) {
      console.error('[useFollow] Erro ao verificar status:', error);
    }
  }, [targetUserId, currentUserId, updateStatus]);

  /**
   * Seguir usuário ou enviar solicitação (perfil privado)
   */
  const doFollow = useCallback(async (): Promise<void> => {
    if (!targetUserId || !currentUserId) return;
    setLoading(true);
    try {
      await followUser(currentUserId, targetUserId);
      const newStatus: FollowStatus = { isFollowing: true, hasPendingRequest: false };
      updateStatus(newStatus);
      dispatchFollowEvent(targetUserId, newStatus);
    } catch (error: unknown) {
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 409) {
        await check();
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, [targetUserId, currentUserId, updateStatus, check]);

  /**
   * Deixar de seguir usuário
   */
  const doUnfollow = useCallback(async () => {
    if (!targetUserId || !currentUserId) return;
    setLoading(true);
    try {
      await unfollowUser(currentUserId, targetUserId);
      const newStatus: FollowStatus = { isFollowing: false, hasPendingRequest: false };
      updateStatus(newStatus);
      dispatchFollowEvent(targetUserId, newStatus);
    } catch (error) {
      console.error('[useFollow] Erro ao deixar de seguir:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [targetUserId, currentUserId, updateStatus]);

  /**
   * Aprovar solicitação de follow de um usuário
   */
  const doApproveRequest = useCallback(async (requestId: string) => {
    if (!targetUserId) return;
    setLoading(true);
    try {
      await approveFollowRequest(requestId);
      const newStatus: FollowStatus = { isFollowing: true, hasPendingRequest: false };
      updateStatus(newStatus);
      dispatchFollowEvent(targetUserId, newStatus);
    } catch (error) {
      console.error('[useFollow] Erro ao aprovar solicitação:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [targetUserId, updateStatus]);

  /**
   * Rejeitar solicitação de follow de um usuário
   */
  const doRejectRequest = useCallback(async (requestId: string) => {
    if (!targetUserId) return;
    setLoading(true);
    try {
      await rejectFollowRequest(requestId);
      const newStatus: FollowStatus = { isFollowing: false, hasPendingRequest: false };
      updateStatus(newStatus);
      dispatchFollowEvent(targetUserId, newStatus);
    } catch (error) {
      console.error('[useFollow] Erro ao rejeitar solicitação:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [targetUserId, updateStatus]);

  // Inicializar: carregar status do servidor
  useEffect(() => {
    if (!targetUserId || initialized) return;
    
    let cancelled = false;
    
    const loadStatus = async () => {
      try {
        await check();
        if (!cancelled) {
          setInitialized(true);
        }
      } catch (error) {
        console.error('[useFollow] Erro ao inicializar:', error);
      }
    };
    
    loadStatus();
    
    return () => {
      cancelled = true;
    };
  }, [targetUserId, initialized, check]);

  // Escutar eventos globais de outros componentes
  useEffect(() => {
    if (!targetUserId) return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { userId: string; isFollowing: boolean; hasPendingRequest: boolean };
      if (detail.userId === targetUserId) {
        setStatus({
          isFollowing: detail.isFollowing,
          hasPendingRequest: detail.hasPendingRequest,
        });
      }
    };

    window.addEventListener(FOLLOW_EVENT, handler);
    return () => window.removeEventListener(FOLLOW_EVENT, handler);
  }, [targetUserId]);

  return {
    isFollowing: status.isFollowing,
    hasPendingRequest: status.hasPendingRequest,
    loading,
    check,
    follow: doFollow,
    unfollow: doUnfollow,
    approveRequest: doApproveRequest,
    rejectRequest: doRejectRequest,
  };
}
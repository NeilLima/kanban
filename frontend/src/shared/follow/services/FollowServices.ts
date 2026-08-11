'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';

export function useFollowRequests() {
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ['followRequests'],
    queryFn: () => list('follow-requests'),
  });

  const acceptMutation = useMutation({
    mutationFn: (id: string) => update('follow-requests', id, { status: 'accepted' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['followRequests'] }),
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => update('follow-requests', id, { status: 'rejected' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['followRequests'] }),
  });

  return {
    requests: requests ?? [],
    loading: isLoading,
    acceptRequest: (id: string) => acceptMutation.mutate(id),
    rejectRequest: (id: string) => rejectMutation.mutate(id),
  };
}

export function useFollowStats(userId: string) {
  const { data: followers } = useQuery({
    queryKey: ['followers', userId],
    queryFn: () => list('follows', { followingId: userId }),
  });

  const { data: following } = useQuery({
    queryKey: ['following', userId],
    queryFn: () => list('follows', { followerId: userId }),
  });

  return {
    followersCount: followers?.length ?? 0,
    followingCount: following?.length ?? 0,
  };
}

export async function followUser(followerId: string, followingId: string) {
  return create('follows', { followerId, followingId });
}

export async function unfollowUser(followerId: string, followingId: string) {
  const follows = await list('follows', { followerId, followingId });
  if (follows.length > 0) {
    return remove('follows', follows[0].id);
  }
}

export async function checkFollowing(followerId: string, followingId: string) {
  const follows = await list('follows', { followerId, followingId });
  return { isFollowing: follows.length > 0, hasPendingRequest: false };
}

export async function approveFollowRequest(requestId: string) {
  return update('follow-requests', requestId, { status: 'accepted' });
}

export async function rejectFollowRequest(requestId: string) {
  return update('follow-requests', requestId, { status: 'rejected' });
}

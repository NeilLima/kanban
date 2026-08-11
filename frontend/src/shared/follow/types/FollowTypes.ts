export interface FollowRequest {
  id: string;
  followerId: string;
  followingId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface FollowCheckResponse {
  isFollowing: boolean;
}

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type Order = 'asc' | 'desc';

export interface PageOption {
  pageId: number;
  pageSize: number;
  order: Order;
}

export interface EmptyResponse {}

// -------------------------------------------------------------------

export type UserRole = 'user' | 'author' | 'admin';

export interface UserInfo {
  id: number;
  username: string;
  avatar: string;
  info: string;
  starCount?: number;
  viewCount?: number;
  followerCount: number;
  followingCount: number;
  isFollowed: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  info: string;
  role: UserRole;
}

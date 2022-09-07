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
  postCount: number;
  starCount: number;
  viewCount: number;
  followerCount: number;
  followingCount: number;
}

export interface User extends UserInfo {
  email: string;
  role: UserRole;
  unreadCount: number;
  createAt: string;
}

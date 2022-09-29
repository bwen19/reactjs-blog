import { SvgIconComponent } from '@mui/icons-material';

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface FetchBase<ParamType> {
  status: FetchStatus;
  error: string;
  param: ParamType;
}

export enum Permission {
  GHOST = 0,
  USER = 1,
  AUTHOR = 2,
  ADMIN = 3,
}

export interface IMenuBase {
  id: number;
  name: string;
  path: string;
  Icon: SvgIconComponent;
}

export interface TableHeadCell<DataItem> {
  id: keyof DataItem | 'action';
  label: string;
  sortable?: boolean;
  align: 'left' | 'right' | 'center';
}

// -------------------------------------------------------------------

export interface PageOption {
  pageId: number;
  pageSize: number;
}

export type Order = 'asc' | 'desc';

export interface PageOrderOption extends PageOption {
  order: Order;
}

export interface EmptyResponse {}

// -------------------------------------------------------------------

export type UserRole = 'user' | 'author' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  intro: string;
  role: UserRole;
}

export interface UserInfo {
  id: string;
  username: string;
  avatar: string;
  intro: string;
  followerCount: string;
  followingCount: string;
  followed: boolean;
}

// -------------------------------------------------------------------

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

import axios from './axiosInstance';
import axiosPrivate from './axiosPrivate';
import { UserInfo, User, EmptyResponse, UserRole, PageOption } from './common';

// -------------------------------------------------------------------
// Create user
export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
export const createUser = (req: CreateUserRequest) => axiosPrivate.post<EmptyResponse>('/user', req);

// -------------------------------------------------------------------
// Delete users
export interface DeleteUsersRequest {
  userIds: readonly number[];
}
export const deleteUsers = (req: DeleteUsersRequest) => axiosPrivate.delete<EmptyResponse>('/user', { data: req });

// -------------------------------------------------------------------
// Update user
export interface UpdateUserRequest {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  isDeleted?: boolean;
}
export const updateUser = (req: UpdateUserRequest) => axiosPrivate.patch<EmptyResponse>(`/user/${req.id}`, req);

// -------------------------------------------------------------------
// Change profile
export interface ChangeProfileRequest {
  id: number;
  username?: string;
  email?: string;
  info?: string;
}
export interface ChangeProfileResponse {
  user: User;
}
export const changeProfile = (req: ChangeProfileRequest) =>
  axiosPrivate.patch<ChangeProfileResponse>(`/user/${req.id}/profile`, req);

// -------------------------------------------------------------------
// Change password
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export const changePassword = (userId: number, req: ChangePasswordRequest) =>
  axiosPrivate.put<EmptyResponse>(`/user/${userId}/password`, req);

// -------------------------------------------------------------------
// Get user
export interface GetUserResponse {
  user: UserInfo;
}
export const getUser = (userId: number) => axios.get<GetUserResponse>(`/user/${userId}/profile`);

// -------------------------------------------------------------------
// List users
export type UserOrderBy = 'username' | 'role' | 'isDeleted' | 'createAt';
export interface UserItem {
  id: number;
  username: string;
  email: string;
  avatar: string;
  postCount: number;
  role: UserRole;
  isDeleted: boolean;
  createAt: Date;
}
export interface ListUsersRequest extends PageOption {
  orderBy: UserOrderBy;
  keyword?: string;
}
export interface ListUsersResponse {
  total: number;
  users: UserItem[];
}
export const listUsers = (req: ListUsersRequest) => axiosPrivate.get<ListUsersResponse>('/user', { params: req });

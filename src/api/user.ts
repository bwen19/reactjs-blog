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
export interface CreateUserResponse {
  user: User;
}
export const createUser = (req: CreateUserRequest) => axiosPrivate.post<CreateUserResponse>('/user', req);

// -------------------------------------------------------------------
// Delete users
export interface DeleteUsersRequest {
  userIds: readonly number[];
}
export const deleteUsers = (req: DeleteUsersRequest) => axiosPrivate.delete<EmptyResponse>('/user', { data: req });

// -------------------------------------------------------------------
// Change password
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export const changePassword = (req: ChangePasswordRequest) => axiosPrivate.put<EmptyResponse>('/user/password', req);

// -------------------------------------------------------------------
// Update user
export interface UpdateUserRequest {
  id: number;
  username?: string;
  email?: string;
  role?: UserRole;
}
export interface UpdatedUserResponse {
  user: User;
}
export const updateUser = (req: UpdateUserRequest) => axiosPrivate.patch<UpdatedUserResponse>(`/user/${req.id}`, req);

// -------------------------------------------------------------------
// Get user
export interface GetUserResponse {
  user: UserInfo;
}
export const getUser = (userId: number) => axios.get<GetUserResponse>(`/user/${userId}`);

// -------------------------------------------------------------------
// List users
export type UserOrderBy = 'id' | 'username' | 'email' | 'createAt';

export interface ListUsersRequest extends PageOption {
  orderBy: UserOrderBy;
}
export interface ListUsersResponse {
  total: number;
  users: User[];
}
export const listUsers = (req: ListUsersRequest) => axiosPrivate.get<ListUsersResponse>('/user', { params: req });

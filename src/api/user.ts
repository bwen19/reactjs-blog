import axiosInstance from './axiosInstance';
import axiosPrivate from './axiosPrivate';
import { UserInfo, User, EmptyResponse, UserRole, PageOrderOption } from './common';

// ========================// CreateUser //======================== //

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export const createUser = (req: CreateUserRequest) => axiosPrivate.post<EmptyResponse>('/user', req);

// ========================// DeleteUsers //======================== //

export interface DeleteUsersRequest {
  userIds: readonly string[];
}

export const deleteUsers = (req: DeleteUsersRequest) => axiosPrivate.delete<EmptyResponse>('/user', { data: req });

// ========================// UpdateUser //======================== //

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  deleted?: boolean;
}

export const updateUser = (userId: string, req: UpdateUserRequest) =>
  axiosPrivate.patch<EmptyResponse>(`/user/${userId}`, req);

// ========================// ListUsers //======================== //

export type UserOrderBy = 'username' | 'role' | 'deleted' | 'createAt';

export interface ListUsersRequest extends PageOrderOption {
  orderBy: UserOrderBy;
  keyword?: string;
}

export interface ListUserItem {
  id: string;
  username: string;
  email: string;
  avatar: string;
  postCount: string;
  role: UserRole;
  deleted: boolean;
  createAt: Date;
}

export interface ListUsersResponse {
  total: string;
  users: ListUserItem[];
}

export const listUsers = (req: ListUsersRequest) => axiosPrivate.get<ListUsersResponse>('/user', { params: req });

// ========================// ChangeProfile //======================== //

export interface ChangeProfileRequest {
  username?: string;
  email?: string;
  intro?: string;
}

export interface ChangeProfileResponse {
  user: User;
}

export const changeProfile = (userId: string, req: ChangeProfileRequest) =>
  axiosPrivate.patch<ChangeProfileResponse>(`/user/${userId}/profile`, req);

// ========================// ChangePassword //======================== //

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = (userId: string, req: ChangePasswordRequest) =>
  axiosPrivate.put<EmptyResponse>(`/user/${userId}/password`, req);

// ========================// GetUserProfile //======================== //

export interface UserProfile extends UserInfo {
  starCount: string;
  viewCount: string;
}

export interface GetUserProfileResponse {
  user: UserProfile;
}

export const getUserProfile = (userId: string, isLoggedIn: boolean) => {
  if (isLoggedIn) {
    return axiosPrivate.get<GetUserProfileResponse>(`/user/${userId}/profile`);
  }
  return axiosInstance.get<GetUserProfileResponse>(`/user/${userId}/profile`);
};

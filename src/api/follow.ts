import axiosInstance from './axiosInstance';
import axiosPrivate from './axiosPrivate';
import { EmptyResponse, PageOption, UserInfo } from './common';

// ========================// FollowUser //======================== //

export interface FollowUserRequest {
  userId: string;
  like: boolean;
}

export const followUser = (req: FollowUserRequest) => axiosPrivate.post<EmptyResponse>('/follow', req);

// ========================// ListFollows //======================== //

export interface ListFollowsRequest extends PageOption {
  userId: string;
  follower: boolean;
}

export interface ListFollowsResponse {
  total: string;
  users: UserInfo[];
}

export const listFollows = (req: ListFollowsRequest, isLoggedIn: boolean) => {
  if (isLoggedIn) {
    return axiosPrivate.get<ListFollowsResponse>('/follow', { params: req });
  }
  return axiosInstance.get<ListFollowsResponse>('/follow', { params: req });
};

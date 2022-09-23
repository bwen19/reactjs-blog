import axiosInstance from './axiosInstance';
import axiosPrivate from './axiosPrivate';
import { EmptyResponse, PageOrderOption, UserInfo } from './common';

// -------------------------------------------------------------------

export interface CommentReply {
  id: string;
  replyUser: UserInfo;
  user: UserInfo;
  content: string;
  starCount: string;
  createAt: string;
}

export interface Comment {
  id: string;
  user: UserInfo;
  content: string;
  starCount: string;
  replyCount: string;
  replies: CommentReply[];
  createAt: string;
}

// -------------------------------------------------------------------
// CreateComment

export interface CreateCommentRequest {
  postId: string;
  parentId?: string;
  replyUserId?: string;
  content: string;
}

export interface CreateCommentResponse {
  id: string;
  parentId: string;
  replyUser: UserInfo;
  user: UserInfo;
  content: string;
  createAt: string;
}

export const createComment = (req: CreateCommentRequest) => axiosPrivate.post<CreateCommentResponse>('/comment', req);

// -------------------------------------------------------------------
// DeleteComment

export const delelteComment = (commentId: string) => axiosPrivate.delete<EmptyResponse>(`/comment/${commentId}`);

// -------------------------------------------------------------------
// ListComments

export type CommentOrderBy = 'createAt' | 'starCount';

export interface ListCommentsRequest extends PageOrderOption {
  orderBy: CommentOrderBy;
  postId: string;
}

export interface ListCommentsResponse {
  total: string;
  commentCount: string;
  comments: Comment[];
}

export const listComments = (req: ListCommentsRequest, isLoggedIn: boolean) => {
  if (isLoggedIn) {
    return axiosPrivate.get<ListCommentsResponse>('/comment', { params: req });
  }
  return axiosInstance.get<ListCommentsResponse>('/comment', { params: req });
};

// -------------------------------------------------------------------
// ListReplies

export interface ListRepliesRequest extends PageOrderOption {
  orderBy: CommentOrderBy;
  commentId: string;
}

export interface ListRepliesResponse {
  total: string;
  commentReplies: CommentReply[];
}

export const listReplies = (req: ListRepliesRequest, isLoggedIn: boolean) => {
  if (isLoggedIn) {
    return axiosPrivate.get<ListRepliesResponse>('/comment/reply', { params: req });
  }
  return axiosInstance.get<ListRepliesResponse>('/comment/reply', { params: req });
};

// -------------------------------------------------------------------
// StarComment

export interface StarCommentRequest {
  commentId: string;
  like: boolean;
}

export const starComment = (req: StarCommentRequest) => axiosPrivate.post<EmptyResponse>('/comment/star', req);

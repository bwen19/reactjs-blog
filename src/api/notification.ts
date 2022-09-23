import axiosPrivate from './axiosPrivate';
import { EmptyResponse, PageOption, User } from './common';

// -------------------------------------------------------------------
// MarkAllRead

export const markAllRead = () => axiosPrivate.put<EmptyResponse>('/notification/read');

// -------------------------------------------------------------------
// DeleteNotifs

export interface DeleteNotifsRequest {
  notificationIds: string[];
}

export const deleteNotifs = (req: DeleteNotifsRequest) =>
  axiosPrivate.delete<EmptyResponse>('/notification', { data: req });

// -------------------------------------------------------------------
// ListNotifs

export interface ListNotifsRequest extends PageOption {
  kind: string;
}

export interface Notification {
  id: string;
  kind: string;
  title: string;
  content: string;
  unread: boolean;
  createAt: Date;
}

export interface ListNotifsResponse {
  total: string;
  unreadCount: string;
  systemCount: string;
  replyCount: string;
  notifications: Notification[];
}

export const listNotifs = (req: ListNotifsRequest) =>
  axiosPrivate.get<ListNotifsResponse>('/notification', { params: req });

// -------------------------------------------------------------------
// LeaveMessage

export interface LeaveMessageRequest {
  title: string;
  content: string;
}

export const leaveMessage = (req: LeaveMessageRequest) => axiosPrivate.post<EmptyResponse>('/notification', req);

// -------------------------------------------------------------------
// ListMessages

export interface ListMessagesRequest extends PageOption {}

export interface MessageItem {
  id: string;
  kind: string;
  title: string;
  user: User;
  content: string;
  unread: boolean;
  createAt: Date;
}

export interface ListMessagesResponse {
  total: string;
  unreadCount: string;
  messages: MessageItem[];
}

export const listMessages = (req: ListMessagesRequest) =>
  axiosPrivate.get<ListMessagesResponse>('/notification/admin', { params: req });

// -------------------------------------------------------------------
// CheckMessages

export interface CheckMessagesRequest {
  messageIds: string[];
  check: boolean;
}

export const checkMessages = (req: CheckMessagesRequest) => axiosPrivate.put<EmptyResponse>('/notification/admin', req);

// -------------------------------------------------------------------
// DeleteMessages

export interface DeleteMessagesRequest {
  messageIds: string[];
}

export const deleteMessages = (req: DeleteMessagesRequest) =>
  axiosPrivate.delete<EmptyResponse>('/notification/admin', { data: req });

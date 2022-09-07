import axiosPrivate from './axiosPrivate';
import { EmptyResponse, PageOption, UserInfo } from './common';

export interface Session {
  id: string;
  user: UserInfo;
  userAgent: string;
  clientIp: string;
  createAt: Date;
  expiresAt: Date;
}

// -------------------------------------------------------------------
// Delete session
export interface DeleteSessionsRequest {
  sessionIds: readonly string[];
}
export const deleteSessions = (req: DeleteSessionsRequest) =>
  axiosPrivate.delete<EmptyResponse>('/session', { data: req });

// -------------------------------------------------------------------
// Delete expired sessions
export const deleteExpiredSessions = () => axiosPrivate.delete<EmptyResponse>('/session/expired');

// -------------------------------------------------------------------
// List sessions
export type SessionOrderBy = 'userId' | 'clientIp' | 'createAt' | 'expiresAt';

export interface ListSessionsRequest extends PageOption {
  orderBy: SessionOrderBy;
  userId?: number;
}
export interface ListSessionsResponse {
  total: number;
  sessions: Session[];
}

export const listSessions = (req: ListSessionsRequest) =>
  axiosPrivate.get<ListSessionsResponse>('/session', { params: req });

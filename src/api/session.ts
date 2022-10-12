import axiosPrivate from './axiosPrivate';
import { EmptyResponse, PageOrderOption, UserItem } from './common';

// -------------------------------------------------------------------

export interface Session {
  id: string;
  user: UserItem;
  userAgent: string;
  clientIp: string;
  createAt: Date;
  expiresAt: Date;
}

// ========================// DeleteSessions //======================== //

export interface DeleteSessionsRequest {
  sessionIds: readonly string[];
}

export const deleteSessions = (req: DeleteSessionsRequest) =>
  axiosPrivate.delete<EmptyResponse>('/session', { data: req });

// ========================// DeleteExpiredSessions //======================== //

export const deleteExpiredSessions = () => axiosPrivate.delete<EmptyResponse>('/session/expired');

// ========================// ListSessions //======================== //

export type SessionOrderBy = 'clientIp' | 'createAt' | 'expiresAt';

export interface ListSessionsRequest extends PageOrderOption {
  orderBy: SessionOrderBy;
}

export interface ListSessionsResponse {
  total: string;
  sessions: Session[];
}

export const listSessions = (req: ListSessionsRequest) =>
  axiosPrivate.get<ListSessionsResponse>('/session', { params: req });

import { useEffect, useReducer } from 'react';
import {
  deleteSessions as deleteSessionsApi,
  DeleteSessionsRequest,
  FetchBase,
  FetchStatus,
  listSessions,
  ListSessionsRequest,
  ListSessionsResponse,
  Session,
} from '@/api';
import useConfirm from './useConfirm';
import useAlert from './useAlert';

export interface SessionState extends FetchBase<ListSessionsRequest> {
  total: number;
  sessions: Session[];
  selected: readonly string[];
}

const initialState: SessionState = {
  status: 'idle',
  error: '',
  param: {
    pageId: 1,
    pageSize: 5,
    order: 'asc',
    orderBy: 'expiresAt',
  },
  total: 0,
  sessions: [],
  selected: [],
};

export type SessionAction =
  | { type: 'setParam'; param: Partial<ListSessionsRequest> }
  | { type: 'setStatus'; status: FetchStatus }
  | { type: 'setError'; error: string }
  | { type: 'setSelected'; selected: readonly string[] }
  | { type: 'setData'; data: ListSessionsResponse };

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'setParam':
      return { ...state, param: { ...state.param, ...action.param }, status: 'idle', selected: [] };
    case 'setStatus':
      return { ...state, status: action.status };
    case 'setError':
      return { ...state, error: action.error, status: 'failed' };
    case 'setData':
      return { ...state, sessions: action.data.sessions, total: Number(action.data.total), status: 'succeeded' };
    case 'setSelected':
      return { ...state, selected: action.selected };
    default:
      return state;
  }
}

export default function useSessions() {
  const { confirm } = useConfirm();
  const { alertMsg } = useAlert();

  const [state, dispatch] = useReducer(sessionReducer, initialState);
  const { status, param, sessions, selected } = state;

  // Fetch a list of users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch({ type: 'setStatus', status: 'loading' });
        const { data } = await listSessions(param);
        dispatch({ type: 'setData', data });
      } catch (err) {
        dispatch({ type: 'setError', error: err as string });
      }
    };

    if (status === 'idle') {
      fetchUsers();
    }
  }, [status, param]);

  // Delete Users
  const deleteSessions = async (sessionId?: string) => {
    const isConfirm = await confirm('Are you sure to delete these users?');
    if (!isConfirm) return;

    try {
      const req: DeleteSessionsRequest = {
        sessionIds: sessionId ? [sessionId] : selected,
      };
      await deleteSessionsApi(req);
      if (req.sessionIds.length === sessions.length) {
        dispatch({ type: 'setParam', param: { pageId: param.pageId - 1 || 1 } });
      } else {
        dispatch({ type: 'setStatus', status: 'idle' });
      }
    } catch (err) {
      alertMsg(err as string, 'error');
    }
  };

  return { state, dispatch, deleteSessions };
}

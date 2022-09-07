import { createContext } from 'react';
import { ListSessionsResponse, Order, Session, SessionOrderBy } from '@/api';

// -------------------------------------------------------------------
// Users reducer
export interface SessionsState {
  isLoading: boolean;
  loadCount: number;
  error: string;
  total: number;
  sessions: Session[];
  selected: readonly string[];
  pageId: number;
  pageSize: number;
  order: Order;
  orderBy: SessionOrderBy;
}

export const initialState: SessionsState = {
  isLoading: false,
  loadCount: 0,
  error: '',
  total: 0,
  sessions: [],
  selected: [],
  pageId: 0,
  pageSize: 5,
  order: 'asc',
  orderBy: 'expiresAt',
};

export type SessionsAction =
  | { type: 'setIsLoading'; value: boolean }
  | { type: 'reload' }
  | { type: 'setError'; error: string }
  | { type: 'setSessions'; data: ListSessionsResponse }
  | { type: 'setSelected'; selected: readonly string[] }
  | { type: 'setPageId'; pageId: number }
  | { type: 'setPageSize'; pageSize: number }
  | { type: 'setSort'; order: Order; orderBy: SessionOrderBy }
  | { type: 'setSort'; order: Order; orderBy: SessionOrderBy };

export function sessionsReducer(state: SessionsState, action: SessionsAction) {
  switch (action.type) {
    case 'setIsLoading':
      return { ...state, isLoading: action.value };
    case 'reload':
      return { ...state, loadCount: state.loadCount + 1, selected: [] };
    case 'setError':
      return { ...state, error: action.error, isLoading: false };
    case 'setSessions':
      return { ...state, sessions: action.data.sessions, total: action.data.total, isLoading: false };
    case 'setSelected':
      return { ...state, selected: action.selected };
    case 'setPageId':
      return { ...state, pageId: action.pageId, selected: [] };
    case 'setPageSize':
      return { ...state, pageSize: action.pageSize, pageId: 0, selected: [] };
    case 'setSort':
      return { ...state, order: action.order, orderBy: action.orderBy };
    default:
      return state;
  }
}

export const SessionsContext = createContext<{
  state: SessionsState;
  dispatch: React.Dispatch<SessionsAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

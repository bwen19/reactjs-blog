import { useContext, useEffect, useReducer } from 'react';
import { listSessions, ListSessionsRequest } from '@/api';
import { initialState, sessionsReducer, SessionsState, SessionsAction, SessionsContext } from '@/state/sessionsState';

// -------------------------------------------------------------------

interface IParams {
  userId?: number;
}

export function useListSessions({ userId }: IParams): [SessionsState, React.Dispatch<SessionsAction>] {
  const [state, dispatch] = useReducer(sessionsReducer, initialState);
  const { loadCount, pageId, pageSize, order, orderBy } = state;

  useEffect(() => {
    const getSessions = async () => {
      try {
        dispatch({ type: 'setIsLoading', value: true });
        const option: ListSessionsRequest = {
          pageId: pageId + 1,
          pageSize,
          order,
          orderBy,
          userId,
        };
        const { data } = await listSessions(option);
        dispatch({ type: 'setSessions', data });
      } catch (err) {
        dispatch({ type: 'setError', error: err as string });
      }
    };
    getSessions();
  }, [loadCount, pageId, pageSize, order, orderBy, userId]);

  return [state, dispatch];
}

export const useSessionsContext = () => useContext(SessionsContext);

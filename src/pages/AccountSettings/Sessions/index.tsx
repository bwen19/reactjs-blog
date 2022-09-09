import { useEffect, useMemo, useReducer } from 'react';
import { listSessions, ListSessionsRequest } from '@/api';
import { initialState, SessionsContext, sessionsReducer } from './sessionsState';
import SessionsTable from './SessionsTable';

// -------------------------------------------------------------------

export default function Sessions() {
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
        };
        const { data } = await listSessions(option);
        dispatch({ type: 'setSessions', data });
      } catch (err) {
        dispatch({ type: 'setError', error: err as string });
      }
    };
    getSessions();
  }, [loadCount, pageId, pageSize, order, orderBy]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <SessionsContext.Provider value={value}>
      <SessionsTable />
    </SessionsContext.Provider>
  );
}

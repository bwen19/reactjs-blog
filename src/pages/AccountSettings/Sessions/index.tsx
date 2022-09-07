import { useMemo } from 'react';
import { useAppSelector, useListSessions } from '@/hooks';
import { User } from '@/api';
import { SessionsContext } from '@/state/sessionsState';
import SessionsTable from './SessionsTable';

// -------------------------------------------------------------------

export default function Sessions() {
  const authUser = useAppSelector((state) => state.auth.authUser) as User;
  const [state, dispatch] = useListSessions({ userId: authUser.id });

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <SessionsContext.Provider value={value}>
      <SessionsTable />
    </SessionsContext.Provider>
  );
}

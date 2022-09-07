import { useMemo } from 'react';
import { useListUsers } from '@/hooks';
import { UsersContext } from '@/state/usersState';
import UsersTable from './UsersTable';

// -------------------------------------------------------------------

export default function ManageUsers() {
  const [state, dispatch] = useListUsers();

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <UsersContext.Provider value={value}>
      <UsersTable />
    </UsersContext.Provider>
  );
}

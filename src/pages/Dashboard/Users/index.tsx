import { useEffect, useMemo, useReducer } from 'react';
import { listUsers, ListUsersRequest } from '@/api';
import { initialState, UsersContext, usersReducer } from './usersState';
import UsersTable from './UsersTable';

// -------------------------------------------------------------------

export default function ManageUsers() {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { loadCount, pageId, pageSize, order, orderBy, keyword } = state;

  useEffect(() => {
    const getUsers = async () => {
      try {
        dispatch({ type: 'setIsLoading', value: true });
        const option: ListUsersRequest = {
          pageId: pageId + 1,
          pageSize,
          order,
          orderBy,
        };
        if (keyword) option.keyword = keyword;
        const { data } = await listUsers(option);
        dispatch({ type: 'setUsers', data });
      } catch (err) {
        dispatch({ type: 'setError', error: err as string });
      }
    };
    getUsers();
  }, [loadCount, pageId, pageSize, order, orderBy, keyword]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <UsersContext.Provider value={value}>
      <UsersTable />
    </UsersContext.Provider>
  );
}

import React, { useContext, useEffect, useReducer } from 'react';
import { listUsers, ListUsersRequest } from '@/api';
import { initialState, usersReducer, UsersState, UsersAction, UsersContext } from '@/state/usersState';

// -------------------------------------------------------------------

export function useListUsers(): [UsersState, React.Dispatch<UsersAction>] {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { loadCount, pageId, pageSize, order, orderBy } = state;

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
        const { data } = await listUsers(option);
        dispatch({ type: 'setUsers', data });
      } catch (err) {
        dispatch({ type: 'setError', error: err as string });
      }
    };
    getUsers();
  }, [loadCount, pageId, pageSize, order, orderBy]);

  return [state, dispatch];
}

export const useUsersContext = () => useContext(UsersContext);

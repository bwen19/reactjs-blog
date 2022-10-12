import { useEffect, useReducer } from 'react';
import {
  createUser as createUserApi,
  CreateUserRequest,
  deleteUsers as deleteUsersApi,
  DeleteUsersRequest,
  FetchBase,
  FetchStatus,
  listUsers,
  ListUsersRequest,
  ListUsersResponse,
  updateUser as updateUserApi,
  UpdateUserRequest,
  ListUserItem,
} from '@/api';
import useConfirm from './useConfirm';
import useAlert from './useAlert';

export interface UserState extends FetchBase<ListUsersRequest> {
  total: number;
  users: ListUserItem[];
  selected: readonly string[];
}

const initialState: UserState = {
  status: 'idle',
  error: '',
  param: {
    pageId: 1,
    pageSize: 5,
    order: 'asc',
    orderBy: 'createAt',
  },
  total: 0,
  users: [],
  selected: [],
};

export type UserAction =
  | { type: 'setParam'; param: Partial<ListUsersRequest> }
  | { type: 'resetParam' }
  | { type: 'setStatus'; status: FetchStatus }
  | { type: 'setError'; error: string }
  | { type: 'setSelected'; selected: readonly string[] }
  | { type: 'setData'; data: ListUsersResponse };

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'setParam':
      return { ...state, param: { ...state.param, ...action.param }, status: 'idle', selected: [] };
    case 'resetParam':
      return { ...initialState };
    case 'setStatus':
      return { ...state, status: action.status };
    case 'setError':
      return { ...state, error: action.error, status: 'failed' };
    case 'setData':
      return { ...state, users: action.data.users, total: Number(action.data.total), status: 'succeeded' };
    case 'setSelected':
      return { ...state, selected: action.selected };
    default:
      return state;
  }
}

export default function useUsers() {
  const { confirm } = useConfirm();
  const { alertMsg } = useAlert();

  const [state, dispatch] = useReducer(userReducer, initialState);
  const { status, param, users, selected } = state;

  // Fetch a list of users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch({ type: 'setStatus', status: 'loading' });
        const { data } = await listUsers(param);
        dispatch({ type: 'setData', data });
      } catch (err) {
        dispatch({ type: 'setError', error: err as string });
      }
    };

    if (status === 'idle') {
      fetchUsers();
    }
  }, [status, param]);

  // Create User
  const createUser = async (req: CreateUserRequest) => {
    try {
      await createUserApi(req);
      dispatch({ type: 'setStatus', status: 'idle' });
      alertMsg('User created successfully', 'success');
    } catch (err) {
      alertMsg(err as string, 'error');
    }
  };

  // Delete Users
  const deleteUsers = async (userId?: string) => {
    const isConfirm = await confirm('Are you sure to delete these users?');
    if (!isConfirm) return;

    try {
      const req: DeleteUsersRequest = {
        userIds: userId ? [userId] : selected,
      };
      await deleteUsersApi(req);
      if (req.userIds.length === users.length) {
        dispatch({ type: 'setParam', param: { pageId: param.pageId - 1 || 1 } });
      } else {
        dispatch({ type: 'setStatus', status: 'idle' });
      }
    } catch (err) {
      alertMsg(err as string, 'error');
    }
  };

  // Update User
  const updateUser = async (userId: string, req: UpdateUserRequest) => {
    if (Object.keys(req).length === 0) {
      alertMsg('Nothing seems to change', 'warning');
      return;
    }

    try {
      await updateUserApi(userId, req);
      dispatch({ type: 'setStatus', status: 'idle' });
      alertMsg('User updated successfully', 'success');
    } catch (err) {
      alertMsg(err as string, 'error');
    }
  };

  return { state, dispatch, createUser, deleteUsers, updateUser };
}

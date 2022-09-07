import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginResponse, autoLogin, logout } from '@/api';
import { getToken, removeToken, saveToken } from '@/utils/localStorage';

// -------------------------------------------------------------------

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  authUser: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: '',
  authUser: null,
};

export const autoLoginThunk = createAsyncThunk('auth/autoLogin', async () => {
  const refreshToken = getToken();
  const { data } = await autoLogin({ refreshToken });
  return data;
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  const refreshToken = getToken();
  logout({ refreshToken });
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<LoginResponse>) => {
      state.isLoggedIn = true;
      const { user, accessToken, refreshToken } = action.payload;
      state.authUser = user;
      state.accessToken = `Bearer ${accessToken}`;
      saveToken(refreshToken);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = `Bearer ${action.payload}`;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.authUser = action.payload;
    },
    removeAuth: (state) => {
      state.isLoggedIn = false;
      state.authUser = null;
      state.accessToken = '';
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(autoLoginThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        const { user, accessToken } = action.payload;
        state.authUser = user;
        state.accessToken = `Bearer ${accessToken}`;
      })
      .addCase(autoLoginThunk.rejected, (state) => {
        authSlice.caseReducers.removeAuth(state);
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        authSlice.caseReducers.removeAuth(state);
      })
      .addCase(logoutThunk.rejected, (state) => {
        authSlice.caseReducers.removeAuth(state);
      });
  },
});

export const { setAuth, setToken, setUser, removeAuth } = authSlice.actions;
export default authSlice.reducer;

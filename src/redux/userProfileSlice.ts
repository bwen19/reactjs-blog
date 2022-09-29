import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchBase, getUserProfile, UserProfile } from '@/api';
import { AuthState } from './authSlice';

// ========================// UserProfileSlice //======================== //

interface UserProfileState extends FetchBase<string> {
  user: UserProfile | null;
}

const initialState: UserProfileState = {
  status: 'succeeded',
  error: '',
  param: '',
  user: null,
};

export const fetchProfile = createAsyncThunk('userProfile/fetchProfile', async (arg, { getState }) => {
  const { userProfile, auth } = getState() as { userProfile: UserProfileState; auth: AuthState };
  const { data } = await getUserProfile(userProfile.param, auth.isLoggedIn);
  return data;
});

export const userProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.param = action.payload;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.error.message || 'failed to get user profile';
        state.status = 'failed';
      });
  },
});

export const { setUserId } = userProfileSlice.actions;
export default userProfileSlice.reducer;

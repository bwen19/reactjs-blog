import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStatus, getPosts, GetPostsRequest, GPostItem } from '@/api';

interface UserPostState extends FetchStatus {
  params: GetPostsRequest;
  total: number;
  posts: GPostItem[];
}

const initialState: UserPostState = {
  status: 'succeeded',
  error: '',
  params: {
    pageId: 1,
    pageSize: 15,
    order: 'desc',
    orderBy: 'publishAt',
    authorId: '',
  },
  total: 0,
  posts: [],
};

export const fetchUserPosts = createAsyncThunk('user/fetchPosts', async (arg, { getState }) => {
  const { userPost } = getState() as { userPost: UserPostState };
  const { data } = await getPosts(userPost.params);
  return data;
});

export const userPostSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<Partial<GetPostsRequest>>) => {
      state.params = { ...state.params, ...action.payload };
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.total = Number(action.payload.total);
        state.posts = action.payload.posts;
        state.status = 'succeeded';
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.error = action.error.message || 'failed to get user posts';
        state.status = 'failed';
      });
  },
});

export const { setParams } = userPostSlice.actions;
export default userPostSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStatus, getPosts, GetPostsRequest, GPostItem } from '@/api';

// ========================// PostSlice //======================== //

interface PostState extends FetchStatus {
  total: number;
  params: GetPostsRequest;
  posts: GPostItem[];
}

const initialState: PostState = {
  status: 'idle',
  error: '',
  params: {
    pageId: 1,
    pageSize: 15,
    order: 'desc',
    orderBy: 'publishAt',
  },
  total: 0,
  posts: [],
};

export const fetchPosts = createAsyncThunk('post/fetchPosts', async (arg, { getState }) => {
  const { post } = getState() as { post: PostState };
  const { data } = await getPosts(post.params);
  return data;
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<Partial<GetPostsRequest>>) => {
      state.params = { ...state.params, ...action.payload };
      state.status = 'idle';
    },
    resetParams: (state) => {
      state.params = initialState.params;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.total = Number(action.payload.total);
        state.posts = action.payload.posts;
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message || 'failed to get posts';
        state.status = 'failed';
      });
  },
});

export const { setParams, resetParams } = postSlice.actions;
export default postSlice.reducer;

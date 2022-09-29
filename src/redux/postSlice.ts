import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchBase, getPosts, GetPostsRequest, GPostItem } from '@/api';

// ========================// PostSlice //======================== //

interface PostState extends FetchBase<GetPostsRequest> {
  total: number;
  posts: GPostItem[];
}

const initialState: PostState = {
  status: 'idle',
  error: '',
  param: {
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
  const { data } = await getPosts(post.param);
  return data;
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setParam: (state, action: PayloadAction<Partial<GetPostsRequest>>) => {
      state.param = { ...state.param, ...action.payload };
      state.status = 'idle';
    },
    resetParam: (state) => {
      state.param = initialState.param;
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

export const { setParam, resetParam } = postSlice.actions;
export default postSlice.reducer;

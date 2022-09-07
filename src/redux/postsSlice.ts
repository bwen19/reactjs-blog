import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listPost, ListPostRequest, Post } from '@/api/post';
import { FetchStatus } from '@/api/common';

// -------------------------------------------------------------------

type PostsOption = Omit<ListPostRequest, 'authorId' | 'status'>;

interface PostsState {
  option: PostsOption;
  status: FetchStatus;
  error: string;
  count: number;
  posts: Post[];
}

const initialState: PostsState = {
  option: {
    pageId: 1,
    pageSize: 15,
    order: 'desc',
    orderBy: 'publishAt',
  },
  status: 'idle',
  error: '',
  count: 0,
  posts: [],
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (arg, { getState }) => {
  const { posts } = getState() as { posts: PostsState };
  const option: ListPostRequest = { ...posts.option, status: 'published' };
  const response = await listPost(option);
  return response;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setOption: (state, action: PayloadAction<Partial<PostsOption>>) => {
      state.option = { ...state.option, ...action.payload };
      state.status = 'idle';
    },
    resetOption: (state) => {
      state.option = initialState.option;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.count = Math.ceil(action.payload.total / state.option.pageSize);
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message || 'failed to fetch data';
        state.status = 'failed';
      });
  },
});

export const { setOption, resetOption } = postsSlice.actions;
export default postsSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchBase, FPostItem, getFeaturedPosts } from '@/api';

// ========================// FeaturedPostSlice //======================== //

interface FeaturedPostState extends FetchBase<number> {
  posts: FPostItem[];
}

const initialState: FeaturedPostState = {
  status: 'succeeded',
  error: '',
  param: 1,
  posts: [],
};

export const fetchFeaturedPosts = createAsyncThunk('featuredPost/fetchFeaturedPosts', async (arg, { getState }) => {
  const { featuredPost } = getState() as { featuredPost: FeaturedPostState };
  const { data } = await getFeaturedPosts({ num: featuredPost.param });
  return data;
});

export const featuredPostSlice = createSlice({
  name: 'featuredPost',
  initialState,
  reducers: {
    setNum: (state, action: PayloadAction<number>) => {
      state.param = action.payload;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeaturedPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.status = 'succeeded';
      })
      .addCase(fetchFeaturedPosts.rejected, (state, action) => {
        state.error = action.error.message || 'failed to get featured posts';
        state.status = 'failed';
      });
  },
});

export const { setNum } = featuredPostSlice.actions;
export default featuredPostSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStatus, FPostItem, getFeaturedPosts } from '@/api';

// ========================// FeaturedPostSlice //======================== //

interface FeaturedPostState extends FetchStatus {
  num: number;
  posts: FPostItem[];
}

const initialState: FeaturedPostState = {
  status: 'succeeded',
  error: '',
  num: 1,
  posts: [],
};

export const fetchFeaturedPosts = createAsyncThunk('featuredPost/fetchFeaturedPosts', async (arg, { getState }) => {
  const { featuredPost } = getState() as { featuredPost: FeaturedPostState };
  const { data } = await getFeaturedPosts({ num: featuredPost.num });
  return data;
});

export const featuredPostSlice = createSlice({
  name: 'featuredPost',
  initialState,
  reducers: {
    setNum: (state, action: PayloadAction<number>) => {
      state.num = action.payload;
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

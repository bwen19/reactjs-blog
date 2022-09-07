// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { FetchStatus, User } from '@/api/common';
// import { getUser } from '@/api/user';
// import { listPost, ListPostRequest, Post } from '@/api/post';

// interface UserInfo {
//   status: FetchStatus;
//   error: string;
//   user: User | null;
// }

// type PostsOption = Omit<ListPostRequest, 'authorId' | 'status' | 'categoryId' | 'tagId'>;

// interface UserPosts {
//   option: PostsOption;
//   status: FetchStatus;
//   error: string;
//   count: number;
//   posts: Post[];
// }

// interface UserLikePosts {
//   option: PostsOption;
//   status: FetchStatus;
//   error: string;
//   count: number;
//   posts: Post[];
// }

// interface UserFollow {
//   status: FetchStatus;
//   error: string;
//   followers: string[];
// }

// interface UserState {
//   userInfo: UserInfo;
//   userPosts: UserPosts;
// }

// const initialState: UserState = {
//   userInfo: {
//     status: 'idle',
//     error: '',
//     user: null,
//   },
//   userPosts: {
//     option: {
//       pageId: 1,
//       pageSize: 15,
//       order: 'desc',
//       orderBy: 'publishAt',
//     },
//     status: 'idle',
//     error: '',
//     count: 0,
//     posts: [],
//   },
// };

// export const fetchUser = createAsyncThunk('user/fetchUser', async (userId: number) => {
//   const response = await getUser({ userId });
//   return response;
// });

// export const fetchUserPosts = createAsyncThunk('user/fetchUserPosts', async (userId: number, { getState }) => {
//   const { user } = getState() as { user: UserState };
//   const { pageId, pageSize, order, orderBy, filterBy } = user.userPosts.option;
//   const listPostOption: ListPostRequest = {
//     pageId,
//     pageSize,
//     order,
//     orderBy,
//     authorId: userId,
//     status: 'published',
//     ...filterBy,
//   };
//   const response = await listPost(listPostOption);
//   console.log(response);
//   return response;
// });

// export const authorPostSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setOption: (state, action: PayloadAction<Partial<PostsOption>>) => {
//       state.userPosts.option = { ...state.userPosts.option, ...action.payload };
//       state.userPosts.status = 'idle';
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchUser.pending, (state) => {
//       state.status = 'loading';
//     });
//   },
// });

// export const { setOption } = authorPostSlice.actions;
// export default authorPostSlice.reducer;

import axiosInstance from './axiosInstance';
import axiosPrivate from './axiosPrivate';
import { Category, EmptyResponse, PageOrderOption, Tag, UserInfo } from './common';

export type PostStatus = 'publish' | 'review' | 'revise' | 'draft';

export interface Post {
  id: string;
  title: string;
  coverImage: string;
  content: string;
  categories: Category[];
  tags: Tag[];
  featured: boolean;
  status: PostStatus;
}

export interface AuthorItem {
  id: string;
  username: string;
  avatar: string;
}

export interface PostItem {
  id: string;
  title: string;
  author: AuthorItem;
  categories: Category[];
  tags: Tag[];
  status: PostStatus;
  featured: boolean;
  viewCount: string;
  updateAt: string;
  publishAt: string;
}

// ---------------------------------------------------------------------------
// CreatePost

export interface CreatePostResponse {
  post: Post;
}

export const createPost = () => axiosPrivate.post<CreatePostResponse>('/post');

// ---------------------------------------------------------------------------
// DeletePost

export const deletePost = (postId: string) => axiosPrivate.delete<EmptyResponse>(`/post/${postId}`);

// ---------------------------------------------------------------------------
// UpdatePost

export interface UpdatePostRequest {
  title?: string;
  coverImage?: string;
  content?: string;
  categoryIds: string[];
  tagIds: string[];
}

export interface UpdatePostResponse {
  post: Post;
}

export const updatePost = (postId: string, req: UpdatePostRequest) =>
  axiosPrivate.patch<UpdatePostResponse>(`/post/${postId}`, req);

// ---------------------------------------------------------------------------
// SubmitPost

export interface SubmitPostRequest {
  postIds: string[];
}

export const submitPost = (req: SubmitPostRequest) => axiosPrivate.post<EmptyResponse>('/post/submit', req);

// ---------------------------------------------------------------------------
// PublishPost

export interface PublishPostRequest {
  postIds: string[];
}

export const publishPost = (req: PublishPostRequest) => axiosPrivate.post<EmptyResponse>('/post/publish', req);

// ---------------------------------------------------------------------------
// WithdrawPost

export interface WithdrawPostRequest {
  postIds: string[];
}

export const withdrawPost = (req: WithdrawPostRequest) => axiosPrivate.post<EmptyResponse>('/post/withdraw', req);

// ---------------------------------------------------------------------------
// UpdatePostLabel

export interface UpdatePostLabelRequest {
  categoryIds: string[];
  tagIds: string[];
  featured?: boolean;
}

export const updatePostLabel = (postId: string, req: UpdatePostLabelRequest) =>
  axiosPrivate.patch<EmptyResponse>(`/post/admin/${postId}`, req);

// ---------------------------------------------------------------------------
// ListPosts

export type LPostOrderBy = 'publishAt' | 'updateAt' | 'viewCount';

export interface ListPostsRequest extends PageOrderOption {
  orderBy: LPostOrderBy;
}

export interface ListPostsResponse {
  total: string;
  posts: PostItem[];
}

export const listPosts = (req: ListPostsRequest) => axiosPrivate.get<ListPostsResponse>('/posts', { params: req });

// ---------------------------------------------------------------------------
// GetPost

export interface GetPostResponse {
  post: Post;
}

export const getPost = (postId: string) => axiosPrivate.get<GetPostResponse>(`/post/${postId}`);

// ---------------------------------------------------------------------------
// GetFeaturedPosts

export interface GetFeaturedPostsRequest {
  num: number;
}

export interface FPostItem {
  id: string;
  title: string;
  author: AuthorItem;
  coverImage: string;
  viewCount: string;
  starCount: string;
  commentCount: string;
  publishAt: string;
}

export interface GetFeaturedPostsResponse {
  posts: FPostItem[];
}

export const getFeaturedPosts = (req: GetFeaturedPostsRequest) =>
  axiosInstance.get<GetFeaturedPostsResponse>('/postft', { params: req });

// ---------------------------------------------------------------------------
// GetPosts

export type GPostsOrderBy = 'publishAt' | 'viewCount';

export interface GetPostsRequest extends PageOrderOption {
  orderBy: GPostsOrderBy;
  featured?: boolean;
  authorId?: string;
  categoryId?: string;
  tagId?: string;
  keyword?: string;
}

export interface GPostItem {
  id: string;
  title: string;
  author: AuthorItem;
  coverImage: string;
  tags: Tag[];
  viewCount: string;
  starCount: string;
  commentCount: string;
  publishAt: string;
}

export interface GetPostsResponse {
  total: string;
  posts: GPostItem[];
}

export const getPosts = (req: GetPostsRequest) => axiosInstance.get<GetPostsResponse>('/post', { params: req });

// ---------------------------------------------------------------------------
// ReadPost

export interface RPost {
  id: string;
  title: string;
  author: UserInfo;
  content: string;
  categories: Category[];
  tags: Tag[];
  viewCount: string;
  starCount: string;
  publishAt: string;
}

export interface ReadPostResponse {
  post: RPost;
}

export const readPost = (postId: string, isLoggedIn: boolean) => {
  if (isLoggedIn) {
    return axiosPrivate.get<ReadPostResponse>(`/post/${postId}/read`);
  }
  return axiosInstance.get<ReadPostResponse>(`/post/${postId}/read`);
};

// ---------------------------------------------------------------------------
// StarPost

export interface StarPostRequest {
  postId: string;
  like: boolean;
}

export const starPost = (req: StarPostRequest) => axiosPrivate.post<EmptyResponse>('/post/star', req);

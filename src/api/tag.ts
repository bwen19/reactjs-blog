import axiosPrivate from './axiosPrivate';
import { PageOrderOption, Tag } from './common';

// -------------------------------------------------------------------
// CreateTag

export interface CreateTagRequest {
  name: string;
}

export interface CreateTagResponse {
  tag: Tag;
}

export const createTag = (req: CreateTagRequest) => axiosPrivate.post<CreateTagResponse>('/tag', req);

// -------------------------------------------------------------------
// DeleteTags

export interface DeleteTagsRequest {
  tagIds: string[];
}

export const deleteTags = (req: DeleteTagsRequest) => axiosPrivate.delete('/tag', { data: req });

// -------------------------------------------------------------------
// UpdateTag

export interface UpdateTagRequest {
  name: string;
}

export interface UpdateTagResponse {
  tag: Tag;
}

export const updateTag = (tagId: string, req: UpdateTagRequest) =>
  axiosPrivate.put<UpdateTagResponse>(`/tag/${tagId}`, req);

// -------------------------------------------------------------------
// ListTags

export type TagOrderBy = 'name' | 'postCount' | '';

export interface ListTagsRequest extends PageOrderOption {
  orderBy: TagOrderBy;
  keyword?: string;
}

export interface TagItem {
  id: string;
  name: string;
  postCount: string;
}

export interface ListTagsResponse {
  total: string;
  tags: TagItem[];
}

export const listTags = (req: ListTagsRequest) => axiosPrivate.get<ListTagsResponse>('/tag', { params: req });

// -------------------------------------------------------------------
// GetTag

export interface GetTagResponse {
  tag: Tag;
}

export const getTag = (tagName: string) => axiosPrivate.get<GetTagResponse>(`/tag/${tagName}`);

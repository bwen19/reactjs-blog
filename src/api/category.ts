import axiosInstance from './axiosInstance';
import axiosPrivate from './axiosPrivate';
import { Category, Order } from './common';

// ========================// CreateCategory //======================== //

export interface CreateCategoryRequest {
  name: string;
}

export interface CreateCategoryResponse {
  category: Category;
}

export const createCategory = (req: CreateCategoryRequest) =>
  axiosPrivate.post<CreateCategoryResponse>('/category', req);

// ========================// DeleteCategories //======================== //

export interface DeleteCategoriesRequest {
  categoryIds: string[];
}

export const deleteCategories = (req: DeleteCategoriesRequest) => axiosPrivate.delete('/category', { data: req });

// ========================// UpdateCategory //======================== //

export interface UpdateCategoryRequest {
  name: string;
}

export interface UpdateCategoryResponse {
  category: Category;
}

export const updateCategory = (categoryId: string, req: UpdateCategoryRequest) =>
  axiosPrivate.put<UpdateCategoryResponse>(`/category/${categoryId}`, req);

// ========================// ListCategories //======================== //

export type CategoryOrderBy = 'name' | '';

export interface ListCategoriesRequest {
  order: Order;
  orderBy: CategoryOrderBy;
}

export interface CategoryItem {
  id: string;
  name: string;
  postCount: string;
}

export interface ListCategoriesResponse {
  categories: CategoryItem[];
}

export const listCategories = (req: ListCategoriesRequest) =>
  axiosPrivate.get<ListCategoriesResponse>('/category', { params: req });

// ========================// GetCategories //======================== //

export interface GetCategoriesResponse {
  categories: Category[];
}

export const getCategories = () => axiosInstance.get<GetCategoriesResponse>('/category/all');

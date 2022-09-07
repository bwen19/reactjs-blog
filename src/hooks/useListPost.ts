import { useEffect, useState } from 'react';
import { listPost, Post, Order, ListPostRequest, PostStatus } from '@/api';

// -------------------------------------------------------------------

interface IParams {
  status?: PostStatus;
  authorId?: number;
}

export default function useListPost(params?: IParams) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // common params
  const [pageId, setPageId] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Post>('createAt');
  // optinal params
  const [status, setStatus] = useState<PostStatus | undefined>(params?.status);
  const [authorId, setAuthorId] = useState<number | undefined>(params?.authorId);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [tagId, setTagId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true);
        const option: ListPostRequest = {
          pageId,
          pageSize,
          order,
          orderBy,
          status,
          authorId,
          categoryId,
          tagId,
        };
        const { posts: newPosts } = await listPost(option);
        setPosts(newPosts);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getPost();
  }, [pageId, pageSize, order, orderBy, status, authorId, categoryId, tagId]);

  return {
    posts,
    isLoading,
    pageId,
    setPageId,
    pageSize,
    setPageSize,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    status,
    setStatus,
    authorId,
    setAuthorId,
    categoryId,
    setCategoryId,
    tagId,
    setTagId,
  };
}

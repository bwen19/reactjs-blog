import { Order, PageOption, UserInfo } from './common';

export type PostStatus = 'published' | 'in review' | 'revision' | 'draft';

export interface Post {
  id: number;
  author: UserInfo;
  title: string;
  description: string;
  coverImage: string;
  status: PostStatus;
  readCount: number;
  createAt: string;
  publishAt: string;
  categories: string[];
  tags: string[];
}

// mock data
const posts: Post[] = [
  {
    id: 1,
    author: {
      id: 1,
      username: 'bwen',
      avatar: '/tmp/0.png',
      postCount: 10,
      starCount: 3,
      viewCount: 1,
      followerCount: 3,
      followingCount: 9,
    },
    title: 'Featured post This is a wider card with supporting text below',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    coverImage: '/tmp/photo-1651986701627-339637b6f8a8.jpg',
    status: 'published',
    readCount: 10,
    createAt: 'Nov 12 2021',
    publishAt: 'Nov 12 2021',
    categories: ['life'],
    tags: ['aa', 'bb'],
  },
  {
    id: 2,
    author: {
      id: 1,
      username: 'zhangsan',
      avatar: '/tmp/0.png',
      postCount: 10,
      starCount: 3,
      viewCount: 1,
      followerCount: 3,
      followingCount: 9,
    },
    title: 'short title',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. bla bla bla bla bbbbbb bbb bbbb bbbb bbbb bbbb bla',
    coverImage: '/tmp/photo-1652253162463-4515c30cb867.jpg',
    status: 'draft',
    readCount: 14,
    createAt: 'Sep 12 2019',
    publishAt: 'Sep 12 2019',
    categories: ['other'],
    tags: ['golang', 'java'],
  },
  {
    id: 3,
    author: {
      id: 3,
      username: '小刘',
      avatar: '/tmp/0.png',
      postCount: 10,
      starCount: 3,
      viewCount: 1,
      followerCount: 3,
      followingCount: 9,
    },
    title: 'Python3 爬虫教程 - JavaScript 逆向调试常用技巧',
    description:
      '前面一节我们了解了 JavaScript 的压缩、混淆等技术，现在越来越多的网站也已经应用了这些技术对其数据接口进行了保护，在做爬虫时如果我们遇到了这种情况，我们可能就不得不硬着头皮来去想方设法找出其中隐含的关键逻辑了',
    coverImage: '/tmp/photo-1652668160976-06d35ddcf4ad.jpg',
    status: 'in review',
    readCount: 9,
    createAt: 'Mar 01 2019',
    publishAt: 'Mar 11 2019',
    categories: ['life'],
    tags: ['rust', 'c++'],
  },
  {
    id: 4,
    author: {
      id: 2,
      username: 'eruhini',
      avatar: '/tmp/0.png',
      postCount: 10,
      starCount: 3,
      viewCount: 1,
      followerCount: 3,
      followingCount: 9,
    },
    title: 'This is a wider card with supporting text below3',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    coverImage: '/tmp/photo-1652950618856-2f19ae98297c.jpg',
    status: 'published',
    readCount: 20,
    createAt: 'Nov 11 2021',
    publishAt: 'Nov 11 2021',
    categories: ['work'],
    tags: ['python', 'c', 'cpp'],
  },
  {
    id: 5,
    author: {
      id: 4,
      username: 'polo',
      avatar: '/tmp/0.png',
      postCount: 10,
      starCount: 3,
      viewCount: 1,
      followerCount: 3,
      followingCount: 9,
    },
    title: 'This is a wider card with supporting text3 djfsfjsdf fiesjfs fsdfs fsdfsd fsdfef fdsfj',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    coverImage: '/tmp/photo-1653248307168-951eea06a9ca.jpg',
    status: 'published',
    readCount: 120,
    createAt: 'Dec 14 2001',
    publishAt: 'Dec 15 2011',
    categories: ['other'],
    tags: ['javascript', 'react'],
  },
  {
    id: 6,
    author: {
      id: 3,
      username: 'polo',
      avatar: '/tmp/0.png',
      postCount: 10,
      starCount: 3,
      viewCount: 1,
      followerCount: 3,
      followingCount: 9,
    },
    title: 'This is a wider card with supporting text8 djfsfjsdf fiesjfs fsdfs fsdfsd fsdfef fdsfj',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    coverImage: '/tmp/photo-1653248307168-951eea06a9ca.jpg',
    status: 'published',
    readCount: 120,
    createAt: 'Dec 14 2001',
    publishAt: 'Dec 15 2011',
    categories: ['work'],
    tags: ['angular', 'vue'],
  },
];
// ---------------------------------------------------------------------------

export interface ListPostRequest extends PageOption {
  order: Order;
  orderBy: keyof Post;
  status?: PostStatus;
  authorId?: number;
  categoryId?: number;
  tagId?: number;
}

export interface ListPostResponse {
  total: number;
  posts: Post[];
}

export const listPost = (arg?: ListPostRequest): Promise<ListPostResponse> => {
  console.log(arg);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ posts, total: 100 }), 500);
  });
};

// ---------------------------------------------------------------------------

export interface ReadPostRequest {
  postId: number;
}

export interface ReadPostResponse {
  id: number;
  author: UserInfo;
  title: string;
  description: string;
  coverImage: string;
  content: string;
  status: string;
  readCount: number;
  starCount: number;
  createAt: string;
  publishAt: string;
  categories: string[];
  tags: string[];
}

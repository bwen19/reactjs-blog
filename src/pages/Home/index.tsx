import React, { useEffect } from 'react';
import { Box, Container, Fab, Pagination, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { AccessTimeFilled, KeyboardArrowUp, LocalFireDepartment } from '@mui/icons-material';

import { Post } from '@/api/post';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setOption, fetchPosts } from '@/redux/postsSlice';
import ScrollTop from '@/components/ScrollTop';
import PostCard from '@/components/PostCard';
import FeaturedPosts from './FeaturedPosts';
import SideBar from './SideBar';

// ---------------------------------------------------------------------------

export default function Home() {
  const dispatch = useAppDispatch();
  const { option, status, error, count, posts } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleChangeOrderBy = (event: React.MouseEvent<HTMLElement>, orderBy: keyof Post | null) => {
    if (orderBy) {
      dispatch(setOption({ orderBy }));
    }
  };

  const handleChangePageId = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setOption({ pageId: value }));
    window.scrollTo(0, 0);
  };

  const title = 'All posts';
  // const [title, setTitle] = useState('All posts');

  let renderContent: React.ReactNode;
  if (status === 'succeeded') {
    renderContent = posts.map((post) => <PostCard key={post.title} post={post} />);
  } else if (status === 'loading') {
    renderContent = <p>Loading...</p>;
  } else {
    console.log(error || '');
    renderContent = <p>error</p>;
  }

  return (
    <>
      <Container maxWidth="md" sx={{ pt: 1 }}>
        <FeaturedPosts posts={posts} />
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            <Paper
              elevation={0}
              sx={{ mb: 1, py: 1, px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="h6">{title}</Typography>
              <ToggleButtonGroup
                sx={{ border: 0 }}
                color="primary"
                size="small"
                value={option.orderBy}
                exclusive
                onChange={handleChangeOrderBy}
              >
                <ToggleButton value="publishAt">
                  <AccessTimeFilled fontSize="small" />
                </ToggleButton>
                <ToggleButton value="count">
                  <LocalFireDepartment fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Paper>
            {renderContent}
            <Paper elevation={0} sx={{ mb: 4, p: 1.5, display: 'flex', justifyContent: 'center' }}>
              <Pagination page={option.pageId} onChange={handleChangePageId} count={count} color="primary" />
            </Paper>
          </Box>
          <Box sx={{ width: 240, ml: 2, display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <SideBar />
          </Box>
        </Box>
      </Container>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </>
  );
}

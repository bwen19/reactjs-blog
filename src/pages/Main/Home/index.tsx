import { useEffect } from 'react';
import { Box, Container, Fab, Grid } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { setNum } from '@/redux/featuredPostSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ImageBackDrop, FeaturedPostCard, PostCard, ScrollTop } from '@/components';
import Image from '@/assets/images/home.jpg';

// ========================// Home //======================== //

export default function Home() {
  const dispatch = useAppDispatch();
  const { status, error, posts } = useAppSelector((state) => state.post);
  const { status: fstatus, error: ferror, posts: featuredPosts } = useAppSelector((state) => state.featuredPost);

  useEffect(() => {
    dispatch(setNum(3));
  }, [dispatch]);

  return (
    <>
      <ImageBackDrop sx={{ height: '100vh', backgroundImage: `url(${Image})` }} />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {fstatus === 'succeeded' && (
          <Grid container spacing={2}>
            {featuredPosts.map((post, index) => {
              const major = index === 0;
              return (
                <Grid key={post.id} item xs={12} sm={major ? 12 : 6} md={major ? 6 : 3}>
                  <FeaturedPostCard post={post} major={major} />
                </Grid>
              );
            })}
          </Grid>
        )}
        {fstatus === 'failed' && ferror}
        <Box sx={{ mt: 3 }}>
          {status === 'succeeded' && (
            <Grid container spacing={2}>
              {posts.map((post) => (
                <Grid key={post.id} item xs={12} sm={6} md={3}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          )}
          {status === 'failed' && error}
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

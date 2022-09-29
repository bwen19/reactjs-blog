import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Box, Container, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { showAuthDialog } from '@/redux/authSlice';
import { fetchPosts } from '@/redux/postSlice';
import { fetchUserPosts } from '@/redux/userPostSlice';
import { fetchProfile } from '@/redux/userProfileSlice';
import { fetchFeaturedPosts } from '@/redux/featuredPostSlice';
import { AccountSection, AppBarOnScroll, AppToolbar, CustomIconButton } from '@/components';

// ========================// Main Page //======================== //

export default function MainPage() {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const handleLogin = () => dispatch(showAuthDialog());

  const { status: postStatus } = useAppSelector((state) => state.post);
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const { status: featuredPostStatus } = useAppSelector((state) => state.featuredPost);
  useEffect(() => {
    if (featuredPostStatus === 'idle') {
      dispatch(fetchFeaturedPosts());
    }
  }, [featuredPostStatus, dispatch]);

  const { status: userProfileStatus } = useAppSelector((state) => state.userProfile);
  useEffect(() => {
    if (userProfileStatus === 'idle') {
      dispatch(fetchProfile());
    }
  }, [userProfileStatus, dispatch]);

  const { status: userPostStatus } = useAppSelector((state) => state.userPost);
  useEffect(() => {
    if (userPostStatus === 'idle') {
      dispatch(fetchUserPosts());
    }
  }, [userPostStatus, dispatch]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box id="back-to-top-anchor" sx={{ minHeight: 0 }} />
      <AppBarOnScroll>
        <AppBar>
          <AppToolbar>
            {isLoggedIn ? (
              <AccountSection />
            ) : (
              <CustomIconButton onClick={handleLogin}>
                <AccountCircle sx={{ fontSize: '1.6rem' }} />
              </CustomIconButton>
            )}
          </AppToolbar>
        </AppBar>
      </AppBarOnScroll>
      <Outlet />
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', bgcolor: '#282c34', color: 'background.paper' }}>
        <Container maxWidth="sm">
          <Typography variant="body2" align="center">
            {'Copyright © Eruhini '}
            {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

import { useEffect } from 'react';
import { Outlet, useNavigate, useParams, Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
} from '@mui/material';
import { blue, deepOrange } from '@mui/material/colors';
import {
  Favorite,
  Visibility,
  ThumbUp,
  Grade,
  ArticleOutlined,
  CameraOutlined,
  FavoriteBorderOutlined,
  StarOutlineOutlined,
} from '@mui/icons-material';

import Image from '@/assets/images/user.png';

import { useAppDispatch, useAppSelector, useRouteMatch } from '@/hooks';
import { setParams } from '@/redux/userPostSlice';
import { setUserId } from '@/redux/userProfileSlice';
import { CustomTabs, ImageBackDrop } from '@/components';
import { IMenuConfig } from '@/api';

// ---------------------------------------------------------------------------

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
      dispatch(setParams({ authorId: userId }));
    }
  }, [dispatch, userId]);

  const navigate = useNavigate();
  const editProfile = () => navigate('/dashboard/profile');

  const { user } = useAppSelector((state) => state.userProfile);

  const authUser = useAppSelector((state) => state.auth.authUser);

  const handleClick = () => {
    console.log('click');
  };

  const menuConfig: IMenuConfig[] = [
    { id: 1, name: 'Posts', value: '/user/:userId', path: `/user/${userId}`, Icon: ArticleOutlined },
    { id: 2, name: 'News', value: '/user/:userId/news', path: `/user/${userId}/news`, Icon: CameraOutlined },
    {
      id: 3,
      name: 'Followers',
      value: '/user/:userId/followers',
      path: `/user/${userId}/followers`,
      Icon: FavoriteBorderOutlined,
    },
    {
      id: 4,
      name: 'Followings',
      value: '/user/:userId/followings',
      path: `/user/${userId}/followings`,
      Icon: StarOutlineOutlined,
    },
  ];

  const routeMatch = useRouteMatch([
    '/user/:userId',
    '/user/:userId/news',
    '/user/:userId/followers',
    '/user/:userId/followings',
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <>
      <ImageBackDrop sx={{ height: '300px', backgroundImage: `url(${Image})`, display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={user?.username}
          src={user?.avatar}
          sx={{ width: 84, height: 84, mt: 8, mb: 1, bgcolor: deepOrange[300] }}
        />
        <Typography variant="h6" color="grey.100">
          {user?.username}
        </Typography>
        <Typography variant="body1" align="center" color="grey.300">
          {user?.intro || 'No introduction'}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {authUser?.id === user?.id ? (
            <Button variant="contained" color="primary" onClick={editProfile}>
              Edit
            </Button>
          ) : user?.followed ? (
            <Button variant="contained" color="info" onClick={editProfile}>
              Unfollow
            </Button>
          ) : (
            <Button variant="contained" color="warning" onClick={editProfile}>
              Follow
            </Button>
          )}
        </Box>
      </ImageBackDrop>

      <Container maxWidth="md" disableGutters>
        <Box sx={{ display: 'flex', mt: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Paper elevation={0} sx={{ mb: 1 }}>
              <CustomTabs value={currentTab}>
                {menuConfig.map((item) => (
                  <Tab
                    disableRipple
                    component={Link}
                    key={item.id}
                    label={item.name}
                    value={item.value}
                    to={item.path}
                  />
                ))}
              </CustomTabs>
            </Paper>
            <Outlet />
          </Box>
          <Box sx={{ width: 240, ml: 2, display: { xs: 'none', md: 'block' } }}>
            <Paper elevation={0} sx={{ position: 'sticky', top: 20, py: 2 }}>
              <Typography variant="h6" sx={{ pl: 2 }}>
                Statistics
              </Typography>
              <Divider sx={{ my: 1 }} />
              <List dense sx={{ width: '100%' }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], width: 20, height: 20 }}>
                      <Visibility color="info" sx={{ fontSize: '16px' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={<Typography variant="body1">Reads 12.9k</Typography>} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], width: 20, height: 20 }}>
                      <ThumbUp color="info" sx={{ fontSize: '14px' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={<Typography variant="body1">Stars 2k</Typography>} />
                </ListItem>
                <ListItem onClick={handleClick}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], width: 20, height: 20 }}>
                      <Favorite color="info" sx={{ fontSize: '16px' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={<Typography variant="body1">Followers 102</Typography>} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], width: 20, height: 20 }}>
                      <Grade color="info" sx={{ fontSize: '16px' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={<Typography variant="body1">Followings 80</Typography>} />
                </ListItem>
              </List>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
}

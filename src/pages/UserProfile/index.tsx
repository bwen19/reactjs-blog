import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Container,
  Divider,
  Paper,
  IconButton,
  Pagination,
  Typography,
} from '@mui/material';
import { Whatshot, Schedule } from '@mui/icons-material';

import { listPost, Post } from '@/api/post';
import PostCard from '@/components/PostCard';
import SideBar from './SideBar';

// ---------------------------------------------------------------------------

export default function UserProfile() {
  const [sortByTime, setSortByTime] = useState(true);

  const switchSort = () => setSortByTime(!sortByTime);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { posts: newPosts } = await listPost();
        setPosts(newPosts);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  const navigate = useNavigate();
  const editProfile = () => navigate('/dashboard/profile');
  const isSelf = true;
  return (
    <Container maxWidth="md" sx={{ pt: 1, display: 'flex' }}>
      <Box sx={{ flex: 1 }}>
        <Card elevation={0} sx={{ mb: 1 }}>
          <CardMedia component="img" height="256" image="/tmp/bg.jpg" alt="background" />
          <CardContent sx={{ height: 80, pt: 1, pb: 2, display: 'flex', alignItems: 'flex-end' }}>
            <Avatar alt="User" src="/tmp/0.png" sx={{ width: 96, height: 96, mr: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Bwen</Typography>
            </Box>
            {isSelf && (
              <Button variant="outlined" onClick={editProfile}>
                Edit
              </Button>
            )}
          </CardContent>
          <Divider />
          <CardActions sx={{ px: 2, justifyContent: 'space-between' }}>
            <Typography variant="body1" color="text.secondary">
              Published articles
            </Typography>
            <Box>
              <IconButton aria-label="sort by time" onClick={switchSort}>
                <Schedule color={sortByTime ? 'primary' : 'inherit'} />
              </IconButton>
              <IconButton aria-label="sort by hot" onClick={switchSort}>
                <Whatshot color={sortByTime ? 'inherit' : 'warning'} />
              </IconButton>
            </Box>
          </CardActions>
        </Card>
        {posts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
        <Paper elevation={0} sx={{ mb: 4, p: 1.5, display: 'flex', justifyContent: 'center' }}>
          <Pagination count={10} color="primary" />
        </Paper>
      </Box>
      <Box sx={{ width: 240, ml: 2, display: { xs: 'none', md: 'block' } }}>
        <SideBar />
      </Box>
    </Container>
  );
}

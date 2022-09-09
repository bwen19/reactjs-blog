import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Card, CardContent, CardMedia, Chip, Divider, Stack, Typography } from '@mui/material';
import { CalendarMonthOutlined, VisibilityOutlined } from '@mui/icons-material';

import { Post } from '@/api';

// ---------------------------------------------------------------------------

interface IProps {
  post: Post;
}

export default function PostCard({ post }: IProps) {
  const navigate = useNavigate();

  const handleReadPost = () => {
    navigate(`/post/${post.id}`);
  };

  const handleViewAuthor = () => {
    navigate(`/user/${post.author.id}`);
  };

  const handleViewCategory = (category: string) => {
    console.log(category);
  };

  const handleViewTag = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <Card elevation={0} sx={{ mb: 1 }}>
      <CardContent sx={{ minWidth: 0 }}>
        <Stack direction="row" alignItems="flex-start">
          <Chip
            color="secondary"
            label={post.categories[0]}
            onClick={() => handleViewCategory(post.categories[0])}
            size="small"
            sx={{ mr: 1, mt: 0.5 }}
          />
          <Typography
            variant="h6"
            onClick={handleReadPost}
            sx={{ cursor: 'pointer', '&:hover': { color: 'primary.dark' } }}
          >
            {post.title}
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', mt: 0.5 }}>
          <Box sx={{ flex: 1 }}>
            <Box color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt="Author avatar" src={post.author.avatar} sx={{ width: 20, height: 20, mr: 0.5 }} />
              <Typography
                component="span"
                variant="subtitle1"
                onClick={handleViewAuthor}
                sx={{ cursor: 'pointer', '&:hover': { color: 'primary.dark' } }}
              >
                {post.author.username}
              </Typography>
              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1.5 }} />
              <CalendarMonthOutlined color="warning" sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography component="span" variant="subtitle1">
                {post.publishAt}
              </Typography>
              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1.5 }} />
              <VisibilityOutlined color="success" sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography component="span" variant="subtitle1">
                {post.readCount}
              </Typography>
            </Box>

            <Typography
              variant="subtitle1"
              gutterBottom
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {post.description}
            </Typography>
            <Stack direction="row" spacing={1}>
              {post.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" color="success" size="small" onClick={handleViewTag} />
              ))}
            </Stack>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 150, height: 100, ml: 2, display: { xs: 'none', sm: 'block' } }}
            image={post.coverImage}
            alt="Post cover image"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

import { useNavigate } from 'react-router-dom';

import { Avatar, Card, CardMedia, Stack, Typography } from '@mui/material';

import { Post } from '@/api/post';

// ---------------------------------------------------------------------------

interface IProps {
  post: Post;
}

export default function FeaturedPostCard({ post }: IProps) {
  const navigate = useNavigate();

  const handleReadPost = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <Card
      component="div"
      elevation={0}
      onClick={handleReadPost}
      sx={{ mx: 1, position: 'relative', height: 178, cursor: 'pointer', '&:hover': { filter: `brightness(130%)` } }}
    >
      <CardMedia
        image={post.coverImage}
        sx={{
          height: '100%',
          filter: `brightness(70%)`,
        }}
      />
      <Typography
        sx={{
          color: 'white',
          fontWeight: 400,
          px: 1.5,
          position: 'absolute',
          bottom: 32,
          width: '100%',
          maxHeight: 50,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {post.title}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{ px: 1.5, position: 'absolute', bottom: 7, display: 'flex' }}
      >
        <Avatar alt="Author avatar" src={post.author.avatar} sx={{ width: 18, height: 18 }} />
        <Typography variant="body2" color="white">
          bwen
        </Typography>
      </Stack>
    </Card>
  );
}

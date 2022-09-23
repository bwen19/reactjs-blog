import { Box, Container, Paper } from '@mui/material';
import Image from '@/assets/images/blog.png';
import { ImageBackDrop, ListPostCard } from '@/components';
import { useAppSelector } from '@/hooks';
import { Tag } from '@/api';

export default function Blog() {
  const { status, error, posts } = useAppSelector((state) => state.post);
  const handleSelectTag = (tag: Tag) => {
    console.log(tag);
  };
  return (
    <>
      <ImageBackDrop sx={{ height: '100px', backgroundImage: `url(${Image})` }} />
      <Container maxWidth="md" disableGutters>
        <Box sx={{ display: 'flex', mt: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Paper elevation={0}>menu bar</Paper>
            <Box sx={{ mt: 2 }}>
              {status === 'succeeded' &&
                posts.map((post) => <ListPostCard key={post.id} post={post} onSelectTag={handleSelectTag} />)}
              {status === 'failed' && error}
            </Box>
          </Box>
          <Box sx={{ width: 240, ml: 2, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
            <Paper elevation={0} sx={{ position: 'sticky', top: 20, py: 2 }}>
              some fdsfsdfd
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
}

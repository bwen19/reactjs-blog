import { Pagination, Paper } from '@mui/material';
import { useAppSelector } from '@/hooks';
import { Tag } from '@/api';
import { ListPostCard } from '@/components';

export default function Posts() {
  const { posts, total } = useAppSelector((state) => state.userPost);
  const handleSelectTag = (tag: Tag) => {
    console.log(tag);
  };

  return (
    <>
      {posts.map((post) => (
        <ListPostCard key={post.id} post={post} onSelectTag={handleSelectTag} />
      ))}

      <Paper elevation={0} sx={{ mt: 1, mb: 4, p: 1.5, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={total} color="primary" />
      </Paper>
    </>
  );
}

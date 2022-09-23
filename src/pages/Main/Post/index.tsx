import { useParams } from 'react-router-dom';

import { Box, Paper, Fab } from '@mui/material';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';

import Markdown from '@/components/Markdown';
import ScrollTop from '@/components/ScrollTop';
import ScrollTopOnMount from '@/components/ScrollTopOnMount';
import SideBar from './SideBar';
import Comments from './Comments';
import { ImageBackDrop } from '@/components';
import Image from '@/assets/images/post.png';

// ---------------------------------------------------------------------------

export default function Post() {
  const article = '# First article\n ## sub title\n some content';
  const params = useParams();

  return (
    <>
      <ScrollTopOnMount />
      <ImageBackDrop sx={{ height: '200px', backgroundImage: `url(${Image})` }} />
      <Box sx={{ pt: 3, pb: 4, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: 820, flex: 1, px: 2 }}>
          <Paper elevation={0} sx={{ p: 3 }}>
            <Markdown>{article}</Markdown>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
            <div>{params.postId}</div>
          </Paper>
          <Comments />
        </Box>
        <Box sx={{ width: 270, mr: 2, display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <SideBar />
        </Box>
      </Box>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </>
  );
}

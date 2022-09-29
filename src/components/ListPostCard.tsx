import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Divider, Link, Stack, Typography } from '@mui/material';
import { SmsOutlined, SvgIconComponent, ThumbUpOutlined, VisibilityOutlined } from '@mui/icons-material';
import { GPostItem, Tag } from '@/api';
import { fDate } from '@/utils';

// -------------------------------------------------------------------

const AuthorInfo = styled(Stack)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
})) as typeof Stack;

const PostTitle = styled(Link)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  overflowWrap: 'break-word',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  color: theme.palette.text.primary,
})) as typeof Link;

interface IPostInfo {
  key: number;
  num: string;
  Icon: SvgIconComponent;
}

const PostCountInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alighItems: 'center',
  marginTop: theme.spacing(0.5),
  color: theme.palette.grey[500],
}));

// ========================// ListPostCard //======================== //

interface IProps {
  post: GPostItem;
  onSelectTag: (tag: Tag) => void;
}

export default function ListPostCard({ post, onSelectTag }: IProps) {
  const postInfo: IPostInfo[] = [
    { key: 0, num: post.commentCount, Icon: SmsOutlined },
    { key: 1, num: post.viewCount, Icon: VisibilityOutlined },
    { key: 2, num: post.starCount, Icon: ThumbUpOutlined },
  ];

  return (
    <Card elevation={0} sx={{ mb: 1, display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: '160px', display: { xs: 'none', sm: 'block' } }}
        image={post.coverImage}
        alt="Post cover image"
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AuthorInfo component={RouterLink} to={`/user/${post.author.id}`} direction="row" alignItems="center">
            <Avatar alt="Author avatar" src={post.author.avatar} sx={{ width: 28, height: 28, mr: 1 }} />
            <Typography component="span" variant="body1">
              {post.author.username}
            </Typography>
          </AuthorInfo>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />
          <Typography component="span" variant="body1" color="grey.500">
            {fDate(post.publishAt)}
          </Typography>
        </Box>
        <Box>
          <PostTitle component={RouterLink} to={`/post/${post.id}`} variant="h6">
            {post.title}
          </PostTitle>
        </Box>

        <PostCountInfo>
          <Stack direction="row">
            {post.tags.map((tag) => (
              <Button color="neutral" key={tag.id} onClick={() => onSelectTag(tag)}>
                #{tag.name}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            {postInfo.map(({ key, num, Icon }) => (
              <Box
                key={key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: key === 0 ? 0 : 1.5,
                }}
              >
                <Icon sx={{ width: 18, height: 18, mr: 0.75 }} />
                <Typography variant="body1">{num}</Typography>
              </Box>
            ))}
          </Stack>
        </PostCountInfo>
      </CardContent>
    </Card>
  );
}

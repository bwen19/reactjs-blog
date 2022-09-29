import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Card, CardContent, Link, Typography } from '@mui/material';
import { SmsRounded, SvgIconComponent, ThumbUpRounded, VisibilityRounded } from '@mui/icons-material';
import { FPostItem } from '@/api';
import { fDate } from '@/utils';

// -------------------------------------------------------------------

const MainCard = styled(Card)({
  position: 'relative',
  '&:hover': {
    '& .MuiCoverImageBackDrop-root': {
      opacity: 0.1,
    },
  },
});

const AuthorAvatar = styled(Avatar)(({ theme }) => ({
  position: 'absolute',
  top: 24,
  left: 24,
  width: 40,
  height: 40,
  backgroundColor: theme.palette.warning.main,
  textDecoration: 'none',
})) as typeof Avatar;

const CoverImage = styled('img')({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const CoverImageBackDrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const PostTitle = styled(Link)(({ theme }) => ({
  overflow: 'hidden',
  overflowWrap: 'break-word',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  color: theme.palette.grey.A100,
})) as typeof Link;

interface IPostInfo {
  key: number;
  num: string;
  Icon: SvgIconComponent;
}

const PostCountInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  color: theme.palette.grey[500],
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1),
  },
}));

// ========================// FeaturedPostCard //======================== //

interface IProps {
  post: FPostItem;
  major?: boolean;
}

export default function FeaturedPostCard({ post, major }: IProps) {
  const postInfo: IPostInfo[] = [
    { key: 0, num: post.commentCount, Icon: SmsRounded },
    { key: 1, num: post.viewCount, Icon: VisibilityRounded },
    { key: 2, num: post.starCount, Icon: ThumbUpRounded },
  ];

  return (
    <MainCard elevation={0}>
      <Box
        sx={{
          position: 'relative',
          ...(major
            ? { pt: { xs: 'calc(100% * 1 / 1.1)', sm: 'calc(100% * 3 / 4.66)' } }
            : { pt: { xs: 'calc(100% * 1 / 1.3)', sm: 'calc(100% * 1)', md: 'calc(100% * 4 / 3)' } }),
        }}
      >
        <CoverImage alt={post.title} src={post.coverImage} />
        <CoverImageBackDrop className="MuiCoverImageBackDrop-root" />
      </Box>
      <AuthorAvatar
        component={RouterLink}
        to={`/user/${post.author.id}`}
        alt={post.author.username}
        src={post.author.avatar}
      />
      <CardContent sx={{ width: '100%', pt: 4, position: 'absolute', bottom: 0 }}>
        <Typography gutterBottom variant="body2" color="grey.500">
          {fDate(post.publishAt)}
        </Typography>
        <PostTitle
          component={RouterLink}
          to={`/post/${post.id}`}
          variant="subtitle1"
          sx={{ ...(major && { typography: 'h5' }) }}
        >
          {post.title}
        </PostTitle>
        <PostCountInfo>
          {postInfo.map(({ key, num, Icon }) => (
            <Box
              key={key}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: key === 0 ? 0 : 1.5,
              }}
            >
              <Icon sx={{ width: 16, height: 16, mr: 0.5 }} />
              <Typography variant="body2">{num}</Typography>
            </Box>
          ))}
        </PostCountInfo>
      </CardContent>
    </MainCard>
  );
}

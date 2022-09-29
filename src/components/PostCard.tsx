import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Card, CardContent, Link, Typography } from '@mui/material';
import { SmsRounded, SvgIconComponent, ThumbUpRounded, VisibilityRounded } from '@mui/icons-material';
import { GPostItem } from '@/api';
import { fDate } from '@/utils';
import avatarShapeSrc from '@/assets/images/avatar-shape.svg';

// -------------------------------------------------------------------

const MainCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  transition: theme.transitions.create(['boxShadow', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    boxShadow: theme.shadows[16],
    transform: 'scale(1.02)',
  },
}));

const AuthorAvatar = styled(Avatar)(({ theme }) => ({
  position: 'absolute',
  left: 30,
  bottom: -18,
  width: 36,
  height: 36,
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

const PostTitle = styled(Link)(({ theme }) => ({
  overflow: 'hidden',
  overflowWrap: 'break-word',
  textOverflow: 'ellipsis',
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
  justifyContent: 'flex-end',
  marginTop: theme.spacing(1),
  color: theme.palette.grey[500],
}));

// ========================// PostCard //======================== //

interface IProps {
  post: GPostItem;
}

export default function PostCard({ post }: IProps) {
  const postInfo: IPostInfo[] = [
    { key: 0, num: post.commentCount, Icon: SmsRounded },
    { key: 1, num: post.viewCount, Icon: VisibilityRounded },
    { key: 2, num: post.starCount, Icon: ThumbUpRounded },
  ];

  return (
    <MainCard>
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 'calc(100% * 1 / 2)', sm: 'calc(100% * 1 / 2)', md: 'calc(100% * 3 / 5)' },
        }}
      >
        <RouterLink to={`/post/${post.id}`}>
          <CoverImage alt={post.title} src={post.coverImage} />
        </RouterLink>
        <Box
          sx={{
            width: 96,
            height: 38,
            position: 'absolute',
            bottom: -16,
            color: 'background.paper',
            bgcolor: 'currentcolor',
            mask: `url(${avatarShapeSrc}) no-repeat center / contain`,
            WebkitMask: `url(${avatarShapeSrc}) no-repeat center / contain`,
          }}
        />
        <AuthorAvatar
          component={RouterLink}
          to={`/user/${post.author.id}`}
          alt={post.author.username}
          src={post.author.avatar}
        />
      </Box>
      <CardContent sx={{ pt: 4 }}>
        <Typography gutterBottom variant="body2" color="grey.500">
          {fDate(post.publishAt)}
        </Typography>
        <PostTitle component={RouterLink} to={`/post/${post.id}`} variant="subtitle1">
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

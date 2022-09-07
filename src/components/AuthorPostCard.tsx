import { Box, Chip, Divider, Link, Stack, IconButton, Typography, Grid } from '@mui/material';
import { Category, LocalOffer, MoreHoriz } from '@mui/icons-material';
import { Post } from '../api';

// -------------------------------------------------------------------

interface ArticleItemProps {
  article: Post;
  handleReviewArticle: (articleID: number) => void;
}

export default function ArticleItem(props: ArticleItemProps) {
  const { article, handleReviewArticle } = props;

  const statusChip = (status: string): JSX.Element => {
    switch (status) {
      case 'Published':
        return <Chip label="Published" color="primary" size="small" />;
      case 'In review':
        return <Chip label="In review" color="warning" size="small" />;
      case 'Draft':
        return <Chip label="Draft" color="secondary" size="small" />;
      default:
        return <Chip label="Error" color="error" />;
    }
  };

  return (
    <Box key={article.id} sx={{ px: 3 }}>
      <Grid container spacing={1} sx={{ py: 1 }}>
        <Grid item xs>
          <Link
            variant="subtitle1"
            color="inherit"
            component="button"
            underline="none"
            align="left"
            sx={{ mb: 1, fontWeight: 500 }}
            onClick={() => handleReviewArticle(article.id)}
          >
            {article.title}
          </Link>
          <Grid container spacing={1}>
            <Grid item xs={4} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Category sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
              <Chip label={article.categories[0]} size="small" />
            </Grid>
            <Grid item xs={8} lg={6}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ display: 'flex', justifyContent: { xs: 'flex-end', lg: 'flex-start' } }}
              >
                <LocalOffer sx={{ fontSize: 16, color: 'text.secondary' }} />
                {article.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={6} lg={2}>
              <Typography color="text.secondary" variant="body2">
                {article.publishAt}
              </Typography>
            </Grid>
            <Grid item xs={6} lg={2}>
              <Typography color="text.secondary" textAlign="right" variant="body2">
                {article.readCount} views
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: 100, mt: 0.5, textAlign: 'right' }}>
          <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={0.5}>
            {statusChip(article.status)}
            <IconButton size="small" aria-label="more menu">
              <MoreHoriz />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
}

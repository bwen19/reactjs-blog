import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, SvgIcon } from '@mui/material';

import { ReactComponent as Page404 } from '@/assets/images/illustration_404.svg';

const ContentStyle = styled('div')(() => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ========================// PageNotFound //======================== //

export default function PageNotFound() {
  return (
    <Box>
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h4" paragraph>
            Oops, page not found!
          </Typography>

          <Typography paragraph sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
            spelling.
          </Typography>

          <SvgIcon
            component={Page404}
            viewBox="0 0 480 360"
            sx={{ width: 'auto', height: 240, mx: 'auto', mt: 2, mb: 8 }}
          />
          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </ContentStyle>
      </Container>
    </Box>
  );
}

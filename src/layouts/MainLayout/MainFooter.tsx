import { Box, Container, Typography } from '@mui/material';

// -------------------------------------------------------------------

export default function MainFooter() {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', bgcolor: '#282c34', color: 'background.paper' }}>
      <Container maxWidth="sm">
        <Typography variant="body2" align="center">
          {'Copyright © Eruhini '}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}

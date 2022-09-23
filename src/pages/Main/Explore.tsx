import { Container, Typography } from '@mui/material';
import Image from '@/assets/images/explore.png';
import { ImageBackDrop } from '@/components';

export default function Explore() {
  return (
    <>
      <ImageBackDrop sx={{ height: '30vh', backgroundImage: `url(${Image})` }} />
      <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h2" gutterBottom>
          Explore
        </Typography>
        <Typography variant="body1" />
      </Container>
    </>
  );
}

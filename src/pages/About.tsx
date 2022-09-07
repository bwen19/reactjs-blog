import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function About() {
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 2 }}>
      <Typography variant="h2" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" />
    </Container>
  );
}

export default About;

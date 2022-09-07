import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const title = 'About';
const description = 'Some long text';

export default function SideBar() {
  return (
    <>
      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Paper elevation={0} sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Category
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
    </>
  );
}

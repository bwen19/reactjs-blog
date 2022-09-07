import { Paper } from '@mui/material';

export default function SideBar() {
  return (
    <>
      <Paper elevation={0} sx={{ p: 3 }}>
        author
      </Paper>
      <Paper elevation={0} sx={{ position: 'sticky', top: 20, p: 3, mt: 2 }}>
        menu
      </Paper>
    </>
  );
}
